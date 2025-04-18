# Generated by Django 5.1.7 on 2025-04-08 15:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('quantity', models.CharField(help_text="e.g., '5 kg', '10 loaves', '2 boxes'", max_length=100)),
                ('category', models.CharField(choices=[('Prepared Meals', 'Prepared Meals'), ('Produce', 'Produce'), ('Bakery', 'Bakery'), ('Dairy', 'Dairy'), ('Canned Goods', 'Canned Goods'), ('Other', 'Other')], default='Other', max_length=50)),
                ('dietary_info', models.TextField(blank=True, help_text="e.g., 'vegetarian', 'contains nuts'")),
                ('prep_date', models.DateField(blank=True, null=True)),
                ('exp_date', models.DateTimeField(help_text='Date and time when the food item expires.')),
                ('pickup_window_start', models.TimeField(help_text='Start time for the pickup window.')),
                ('pickup_window_end', models.TimeField(help_text='End time for the pickup window.')),
                ('photo_url', models.URLField(blank=True, max_length=500, null=True)),
                ('status', models.CharField(choices=[('Available', 'Available'), ('Requested', 'Requested'), ('Approved', 'Approved'), ('Completed', 'Completed'), ('Expired', 'Expired'), ('Cancelled', 'Cancelled')], default='Available', max_length=20)),
                ('cancellation_reason', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('charity', models.ForeignKey(blank=True, limit_choices_to={'role': 'charity'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='donations_received', to=settings.AUTH_USER_MODEL)),
                ('restaurant', models.ForeignKey(limit_choices_to={'role': 'restaurant'}, on_delete=django.db.models.deletion.CASCADE, related_name='donations_made', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
