from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile, Donation # Import Donation

# Define an inline admin descriptor for UserProfile which acts a bit like a singleton
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'role') # Add role to list display
    list_filter = BaseUserAdmin.list_filter + ('role',) # Add role to filters
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('role',)}), # Add role field to the admin form
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}), # Add role field to the add user form
    )


# Register your models here.
admin.site.register(User, UserAdmin)
# We don't need to register UserProfile separately as it's handled by the inline in UserAdmin
# admin.site.register(UserProfile)
# Register the Donation model
@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant', 'charity', 'category', 'status', 'exp_date', 'created_at')
    list_filter = ('status', 'category', 'restaurant', 'charity')
    search_fields = ('name', 'description', 'restaurant__username', 'charity__username')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')
