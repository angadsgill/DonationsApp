from django.urls import path, include # Add include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'api' # Optional: Define an app namespace

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'restaurant/donations', views.DonationViewSet, basename='donation')
# The basename is important if the queryset is dynamically determined (like in get_queryset)

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('restaurant/dashboard/', views.RestaurantDashboardView.as_view(), name='restaurant-dashboard'),
    # Charity specific endpoints
    path('charity/donations/', views.AvailableDonationsListView.as_view(), name='charity-available-donations'),
    path('charity/donations/<int:donation_id>/request/', views.RequestDonationView.as_view(), name='charity-request-donation'),
    path('charity/dashboard/', views.CharityDashboardView.as_view(), name='charity-dashboard'),
    path('charity/history/', views.CharityHistoryView.as_view(), name='charity-history'),

    # The API URLs are now determined automatically by the router.
    path('', include(router.urls)),
]