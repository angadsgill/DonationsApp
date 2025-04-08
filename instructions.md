# Food Donation App prototype Core Features - Instructions for LLM Coding Assistant

  

## 1. User Authentication & Role Management

  

Please create a user authentication system(prototype) with:

  

- Registration and login functionality for two distinct user types: Restaurants and Charities

- Role-based access control to separate restaurant and charity interfaces

- User profile management with organization details including name, contact information, and location

  

## 2. Restaurant Dashboard

  

Develop a dashboard for restaurant users that includes:

  

- Summary view showing current donations, pending pickups, and donation history

- Profile management section for updating restaurant details and operating hours

- Settings page for notification preferences and account management

  

## 3. Food Inventory Management

  

Create a system that allows restaurants to:

  

- Add new food items with details:

    - Food name and description

    - Quantity available (by weight or portion count)

    - Category (e.g., prepared meals, produce, bakery, etc.)

    - Dietary information (vegetarian, vegan, contains allergens)

    - Preparation date

    - Expiration date/time

    - Pickup window (time range when food is available)

    - Photos of food items (optional)

- Update food item availability in real-time

- Remove items that are no longer available

- Set expiry times for automatic removal of listings

- View history of donated items with charity pickup information

  

## 4. Charity Dashboard

  

Develop a dashboard for charity users that includes:

  

- Summary view showing available donations nearby, pending pickups, and donation history

- Profile management for updating charity details, service area, and needs

- Settings page for notification preferences and account management

  

## 5. Food Search & Filter Functionality

  

Create a search interface for charities that:

  

- Displays available food items sorted by proximity to the charity's location

- Provides filtering options by:

    - Distance/location

    - Food type/category

    - Quantity

    - Dietary restrictions

    - Pickup window

- Shows each food item with essential details and the donating restaurant's information

- Updates in real-time as new donations become available

  

## 6. Donation Request System

  

Implement a donation request system that allows:

  

- Charities to select and request specific food items

- Confirmation process for restaurants to approve requests

- Status tracking for all pending, approved, and completed donations

- Ability for either party to cancel with reason if necessary

- Pickup instructions with location details and contact information

- Optional pickup confirmation process (QR code or PIN)

  

## 7. Location-Based Services(only prototype)

  

Develop location functionality that:

  

- Uses geolocation to determine the user's current location (with permission)

- Allows manual entry of address information

- Calculates distances between restaurants and charities

- Displays results on an interactive map

- Provides navigation assistance for pickup routes

  

- **progress.md** file to track development progress, including:  

  - Features completed  

  - features left

  - Status

    --Current phase:**

    --Next milestone:**

    --Overall progress:** Initial phase, backend to follow after frontend refactor

  
  
create a architecture.md to track architecture in the following format

  

Overview
---
Tech Stack

System Design
-Frontend
-Backend

---
Architecture Diagram
Project Structure