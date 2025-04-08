# Food Donation App - Architecture

## Overview

This document outlines the architecture for the Food Donation App prototype. The application connects restaurants with surplus food to charities in need. It features role-based access (Restaurant, Charity), donation management, search/filtering, and a donation request system. This prototype uses a vanilla HTML/CSS/JS frontend and a Django/SQLite backend API.

---

## Tech Stack

*   **Frontend:** Vanilla HTML, CSS, JavaScript (provided in `DonationsApp/`)
*   **Backend Framework:** Django
*   **API:** Django REST Framework (DRF)
*   **Database:** SQLite (default for Django development)
*   **Authentication:** DRF Token Authentication (or SimpleJWT)
*   **Deployment:** (Not specified for prototype, typically PythonAnywhere, Heroku, Docker, etc.)

---

## System Design

### Frontend

*   Handles user interface rendering and interaction.
*   Makes asynchronous API calls to the backend for data and actions.
*   Manages basic state (e.g., logged-in user, current view).
*   Uses separate JS modules (`auth.js`, `restaurant.js`, `charity.js`) for different functionalities.

### Backend (Django API)

*   **Models (`api/models.py`):**
    *   `User`: Custom user model extending `AbstractUser` with a `role` field ('restaurant' or 'charity').
    *   `UserProfile`: One-to-one link to `User`, storing organization details (name, contact, address, service\_area, needs).
    *   `Donation`: Represents a food donation item with details (name, quantity, category, expiry, status, etc.) linked to the donating `restaurant` and potentially the receiving `charity`.
*   **Serializers (`api/serializers.py`):** Define how model instances are converted to JSON for the API responses and how incoming JSON data is validated and converted back to model instances.
*   **Views (`api/views.py`):** Handle incoming API requests, interact with models (via serializers), perform business logic (like status changes), and return responses. Uses DRF's `APIView` or `ViewSet`.
*   **URLs (`api/urls.py`, `backend/urls.py`):** Map API endpoint URLs to specific views.
*   **Authentication & Permissions:** Uses DRF's token authentication to identify users and role-based permissions to restrict access to certain endpoints (e.g., only restaurants can create donations).
*   **Utilities (`api/utils.py`):** (Removed - No longer needed for distance calculation).

---

## Architecture Diagram

```mermaid
graph TD
    subgraph Frontend (Vanilla JS @ DonationsApp/)
        F_AuthUI[auth.js - Login/Register UI]
        F_RestUI[restaurant.js - Dashboard, Inventory, Add/Edit Form]
        F_CharUI[charity.js - Dashboard, Search/Filter UI, Request Button]
    end

    subgraph Backend (Django REST Framework @ backend/api/)
        B_Router[urls.py - API Router]
        B_AuthViews[Auth Views (Register, Login, Logout, Profile)]
        B_RestViews[Restaurant Views (CRUD Donations, Approve, Dashboard)]
        B_CharViews[Charity Views (List/Filter Donations, Request, Dashboard, History)]
        B_Serializers[DRF Serializers (User, Profile, Donation)]
        B_Models[models.py (User, UserProfile, Donation)]
        B_DB[(SQLite Database)]
        B_Utils[utils.py (Removed)]
    end

    F_AuthUI -- API Calls --> B_Router --> B_AuthViews
    F_RestUI -- API Calls --> B_Router --> B_RestViews
    F_CharUI -- API Calls --> B_Router --> B_CharViews

    B_AuthViews --> B_Serializers & B_Models
    B_RestViews --> B_Serializers & B_Models
    B_CharViews --> B_Serializers & B_Models

    B_Models --> B_DB
    # B_Utils removed
```

---

## Project Structure (Planned Backend)

```
d:/Codees/
├── DonationsApp/             # Existing Frontend
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── instructions.md
│   ├── architecture.md  # This file
│   └── progress.md      # Progress tracking file
│
└── backend/             # Django Project Root
    ├── backend/         # Django Configuration Root
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    ├── api/             # Django App for API
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── models.py
    │   ├── serializers.py
    │   ├── tests.py
    │   ├── urls.py
    │   ├── views.py
    │   # └── utils.py     # Removed
    ├── manage.py
    └── db.sqlite3       # SQLite Database file