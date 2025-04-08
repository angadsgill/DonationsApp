from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from .models import UserProfile, Donation # Import Donation

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for the UserProfile model."""
    class Meta:
        model = UserProfile
        # Explicitly list fields excluding lat/lon
        fields = ('organization_name', 'contact_phone', 'address', 'service_area', 'needs', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model, including nested profile."""
    profile = UserProfileSerializer()

    class Meta:
        model = User
        # Include fields relevant for displaying user info
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'profile')
        read_only_fields = ('id', 'role') # Role might be set during registration only

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    profile = UserProfileSerializer(required=False) # Profile data can be optional at registration
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, write_only=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm', 'role', 'profile', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'email': {'required': True} # Ensure email is provided
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        # Basic email validation (DRF handles format, check uniqueness)
        if User.objects.filter(email=attrs['email']).exists():
             raise serializers.ValidationError({"email": "Email already exists."})
        # Basic username validation
        if User.objects.filter(username=attrs['username']).exists():
             raise serializers.ValidationError({"username": "Username already exists."})
        return attrs

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        password = validated_data.pop('password')
        validated_data.pop('password_confirm') # Remove confirm password

        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()

        # Create or update profile
        if profile_data:
            UserProfile.objects.update_or_create(user=user, defaults=profile_data)
        else:
            # Ensure profile exists even if no data provided at registration
            UserProfile.objects.get_or_create(user=user)

        return user

# Optional: Login Serializer for input validation if needed by the login view
# class LoginSerializer(serializers.Serializer):
#     """Serializer for login input validation."""
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})


class DonationSerializer(serializers.ModelSerializer):
    """Serializer for the Donation model."""
    # Optionally make restaurant/charity read-only or display nested info
    restaurant_username = serializers.CharField(source='restaurant.username', read_only=True)
    charity_username = serializers.CharField(source='charity.username', read_only=True, allow_null=True)
    # distance_km = serializers.SerializerMethodField() # Removed distance field

    class Meta:
        model = Donation
        # Explicitly list fields to include distance_km
        fields = '__all__' # Revert to all fields, distance_km is removed from model/serializer
        read_only_fields = ('id', 'restaurant', 'charity', 'status', 'created_at', 'updated_at', 'cancellation_reason')
        # Restaurant is set automatically based on authenticated user
        # Charity is set when a request is made/approved
        # Status is managed by specific actions (request, approve, complete, cancel)

    def create(self, validated_data):
        # Automatically set the restaurant to the currently authenticated user
        # This assumes the view passes the request context to the serializer
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            # Ensure the user is a restaurant
            if request.user.role != 'restaurant':
                 raise serializers.ValidationError("Only users with the 'restaurant' role can create donations.")
            validated_data['restaurant'] = request.user
        else:
            # Handle cases where user is not available (e.g., testing without request context)
            # Or raise an error if user must always be present
             raise serializers.ValidationError("User context not found. Cannot determine the donating restaurant.")

        # Set initial status
        validated_data['status'] = 'Available'
        return super().create(validated_data)

    # Removed get_distance_km method