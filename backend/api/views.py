from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model, authenticate

from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action # For custom actions

from .serializers import UserSerializer, RegisterSerializer, UserProfileSerializer, DonationSerializer # Import DonationSerializer
from .models import UserProfile, Donation # Import Donation
# from .utils import haversine # Removed haversine import

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration.
    Accepts POST requests with user details (username, email, password, role, optional profile info).
    Returns user data and auth token upon successful registration.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny] # Anyone can register

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        user_data = UserSerializer(user, context=self.get_serializer_context()).data
        return Response({
            "user": user_data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)


class LoginView(views.APIView):
    """
    API endpoint for user login.
    Accepts POST requests with username and password.
    Returns user data and auth token upon successful login.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Please provide both username and password"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            user_data = UserSerializer(user).data
            return Response({
                "user": user_data,
                "token": token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    """
    API endpoint for user logout.
    Requires Token Authentication. Deletes the user's auth token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            # Delete the token associated with the user
            request.user.auth_token.delete()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    API endpoint for retrieving and updating the logged-in user's profile.
    Requires Token Authentication.
    GET: Returns user and profile data.
    PUT/PATCH: Updates user and profile data.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        # Returns the currently authenticated user
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        profile_instance = instance.profile

        # Separate profile data from user data
        profile_data = request.data.get('profile', {})
        user_data = {k: v for k, v in request.data.items() if k != 'profile'}

        # Update User instance
        user_serializer = self.get_serializer(instance, data=user_data, partial=partial)
        user_serializer.is_valid(raise_exception=True)
        self.perform_update(user_serializer)

        # Update UserProfile instance
        profile_serializer = UserProfileSerializer(profile_instance, data=profile_data, partial=partial)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save() # UserProfileSerializer doesn't need perform_update

        # Return combined updated user data
        return Response(UserSerializer(instance, context=self.get_serializer_context()).data)
from django.core.exceptions import PermissionDenied # Import PermissionDenied
# --- Custom Permissions ---

class IsRestaurantUser(permissions.BasePermission):
    """
    Allows access only to authenticated users with the 'restaurant' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'restaurant')

class IsOwnerOrReadOnlyRestaurant(permissions.BasePermission):
    """
    Object-level permission to only allow owners of a donation (restaurant) to edit it.
    Assumes the model instance has a `restaurant` attribute.
    Allows read-only access for any authenticated restaurant user (e.g., for listing).
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any authenticated restaurant user
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated and request.user.role == 'restaurant')

        # Write permissions are only allowed to the restaurant that owns the donation.
        return obj.restaurant == request.user
class IsCharityUser(permissions.BasePermission):
    """
    Allows access only to authenticated users with the 'charity' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'charity')


# --- Donation Views (Restaurant Perspective) ---

class DonationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows restaurants to view, create, update, and delete their donations.
    """
    serializer_class = DonationSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsRestaurantUser, IsOwnerOrReadOnlyRestaurant] # Apply role and ownership permissions

    def get_queryset(self):
        """
        This view should return a list of all the donations
        for the currently authenticated restaurant user.
        """
        user = self.request.user
        if user.is_authenticated and user.role == 'restaurant':
            return Donation.objects.filter(restaurant=user)
        return Donation.objects.none() # Return empty queryset if not a restaurant

    def perform_create(self, serializer):
        """
        Automatically set the restaurant to the logged-in user upon creation.
        The serializer also has logic for this, providing redundancy.
        """
        if self.request.user.role != 'restaurant':
             raise PermissionDenied("Only users with the 'restaurant' role can create donations.")
        serializer.save(restaurant=self.request.user, status='Available') # Ensure status is set correctly

    @action(detail=True, methods=['post'], permission_classes=[IsRestaurantUser, IsOwnerOrReadOnlyRestaurant])
    def approve(self, request, pk=None):
        """
        Custom action for a restaurant to approve a donation request.
        Changes status from 'Requested' to 'Approved'.
        """
        donation = self.get_object() # Gets the donation instance, checks permissions

        if donation.status != 'Requested':
            return Response({'error': 'Donation must be in Requested status to approve.'}, status=status.HTTP_400_BAD_REQUEST)

        if not donation.charity:
             return Response({'error': 'Cannot approve a donation that has not been requested by a charity.'}, status=status.HTTP_400_BAD_REQUEST)

        donation.status = 'Approved'
        donation.save()
        serializer = self.get_serializer(donation)
        return Response(serializer.data)

    # Optional: Add a cancel action if needed
    # @action(detail=True, methods=['post'], permission_classes=[IsRestaurantUser, IsOwnerOrReadOnlyRestaurant])
    # def cancel(self, request, pk=None):
    #     donation = self.get_object()
    #     reason = request.data.get('reason', 'Cancelled by restaurant.')
    #     if donation.status in ['Available', 'Requested', 'Approved']:
    #         donation.status = 'Cancelled'
    #         donation.cancellation_reason = reason
    #         donation.save()
    #         return Response({'status': 'Donation cancelled'}, status=status.HTTP_200_OK)
    #     else:
    #         return Response({'error': f'Cannot cancel donation in {donation.status} status.'}, status=status.HTTP_400_BAD_REQUEST)


# --- Restaurant Dashboard View (Example) ---

class RestaurantDashboardView(views.APIView):
    """
    API endpoint for restaurant dashboard summary data.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsRestaurantUser]

    def get(self, request, *args, **kwargs):
        user = request.user
        donations = Donation.objects.filter(restaurant=user)

        summary = {
            'active_donations': donations.filter(status='Available').count(),
            'pending_pickups': donations.filter(status__in=['Requested', 'Approved']).count(), # Consider both as pending from restaurant view
            'completed_donations': donations.filter(status='Completed').count(),
            # Add more stats as needed
        }
        return Response(summary)
# --- Charity Views ---

class AvailableDonationsListView(generics.ListAPIView):
    """
    API endpoint for charities to view available donations.
    Filters donations by status='Available'.
    Supports filtering by category.
    """
    serializer_class = DonationSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsCharityUser] # Only charities can view available donations

    def get_queryset(self):
        """
        Return only donations with status 'Available', optionally filtered by category.
        Default sort by creation date (newest first).
        """
        queryset = Donation.objects.filter(status='Available') # No need to select_related profile now
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)

        # Default sort by creation date
        return queryset.order_by('-created_at')

    # The default list method from ListAPIView is now sufficient
class RequestDonationView(views.APIView):
    """
    API endpoint for a charity to request a specific available donation.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsCharityUser]

    def post(self, request, donation_id, *args, **kwargs):
        donation = get_object_or_404(Donation, pk=donation_id)
        user = request.user

        # Check if the donation is available
        if donation.status != 'Available':
            return Response({'error': 'This donation is not available for request.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the donation is already requested by someone else
        if donation.charity is not None:
             return Response({'error': 'This donation has already been requested.'}, status=status.HTTP_400_BAD_REQUEST)

        # Assign the charity and update status
        donation.charity = user
        donation.status = 'Requested'
        donation.save()

        serializer = DonationSerializer(donation)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CharityDashboardView(views.APIView):
    """
    API endpoint for charity dashboard summary data.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsCharityUser]

    def get(self, request, *args, **kwargs):
        user = request.user
        # Count available donations (potentially filter by proximity later)
        available_count = Donation.objects.filter(status='Available').count()
        # Count donations requested or approved for this charity
        pending_pickups = Donation.objects.filter(charity=user, status__in=['Requested', 'Approved']).count()
        # Count completed donations for this charity
        total_received = Donation.objects.filter(charity=user, status='Completed').count()

        summary = {
            'available_donations': available_count, # Renamed - no longer location specific
            'pending_pickups': pending_pickups,
            'total_donations_received': total_received,
        }
        return Response(summary)


class CharityHistoryView(generics.ListAPIView):
    """
    API endpoint for charities to view their donation history (requested, approved, completed).
    """
    serializer_class = DonationSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsCharityUser]

    def get_queryset(self):
        """
        Return donations associated with the currently authenticated charity user.
        """
        user = self.request.user
        if user.is_authenticated and user.role == 'charity':
            # Filter donations where the charity field matches the current user
            return Donation.objects.filter(charity=user).order_by('-updated_at')
        return Donation.objects.none()
