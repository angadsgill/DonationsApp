from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Adds a role field to distinguish between Restaurants and Charities.
    """
    ROLE_CHOICES = (
        ('restaurant', 'Restaurant'),
        ('charity', 'Charity'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, blank=False, null=False)

    # Add any other fields common to both roles if needed
    # email field is already inherited from AbstractUser

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class UserProfile(models.Model):
    """
    Stores additional profile information for both Restaurants and Charities.
    Linked one-to-one with the custom User model.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    organization_name = models.CharField(max_length=255, blank=True) # Can be restaurant name or charity name
    contact_phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    # latitude = models.FloatField(null=True, blank=True) # Removed
    # longitude = models.FloatField(null=True, blank=True) # Removed

    # Charity-specific fields (optional, could be separate model if complexity grows)
    service_area = models.TextField(blank=True, help_text="Description of the area the charity serves.")
    needs = models.TextField(blank=True, help_text="Specific needs or types of donations the charity focuses on.")

    # Restaurant-specific fields (optional)
    # operating_hours = models.CharField(max_length=255, blank=True) # Example

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile for {self.user.username}"

# Optional: Add post_save signal to create UserProfile automatically when User is created
# from django.db.models.signals import post_save
# from django.dispatch import receiver

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def save_user_profile(sender, instance, **kwargs):
#     # Ensure profile exists before trying to save
#     if hasattr(instance, 'profile'):
#         instance.profile.save()
#     else:
#         # Handle case where profile might not exist yet (e.g., during createsuperuser)
#         UserProfile.objects.get_or_create(user=instance)
class Donation(models.Model):
    """
    Represents a food donation item offered by a Restaurant.
    """
    STATUS_CHOICES = (
        ('Available', 'Available'),
        ('Requested', 'Requested'), # Requested by a charity
        ('Approved', 'Approved'),   # Approved by the restaurant for pickup
        ('Completed', 'Completed'), # Picked up by the charity
        ('Expired', 'Expired'),     # Past expiration date or pickup window
        ('Cancelled', 'Cancelled'), # Cancelled by either party
    )
    CATEGORY_CHOICES = (
        ('Prepared Meals', 'Prepared Meals'),
        ('Produce', 'Produce'),
        ('Bakery', 'Bakery'),
        ('Dairy', 'Dairy'),
        ('Canned Goods', 'Canned Goods'),
        ('Other', 'Other'),
    )

    restaurant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='donations_made',
        limit_choices_to={'role': 'restaurant'} # Ensure only restaurants can donate
    )
    charity = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL, # Keep donation record even if charity is deleted
        related_name='donations_received',
        limit_choices_to={'role': 'charity'},
        null=True,
        blank=True # Charity is null until requested/approved
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    quantity = models.CharField(max_length=100, help_text="e.g., '5 kg', '10 loaves', '2 boxes'")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')
    dietary_info = models.TextField(blank=True, help_text="e.g., 'vegetarian', 'contains nuts'")
    prep_date = models.DateField(null=True, blank=True)
    exp_date = models.DateTimeField(help_text="Date and time when the food item expires.")
    pickup_window_start = models.TimeField(help_text="Start time for the pickup window.")
    pickup_window_end = models.TimeField(help_text="End time for the pickup window.")
    photo_url = models.URLField(max_length=500, blank=True, null=True) # Increased length for potentially long URLs
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    cancellation_reason = models.TextField(blank=True, null=True) # Reason if status is 'Cancelled'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} from {self.restaurant.username} ({self.status})"

    class Meta:
        ordering = ['-created_at'] # Show newest donations first by default
