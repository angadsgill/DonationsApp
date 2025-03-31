Create the **frontend** for a **Food Donation Web App** using **vanilla HTML, CSS, and JavaScript**. The UI should be clean, user-friendly, and responsive. The app should support **two user types**: **Restaurants** (who donate food) and **Charities** (who receive food). Do **not** include backend logic—focus purely on the UI.

since there will be no cackend logic, the login button should allow us to access both the restaurant or the charity dashboards,based on which one is selected, even if no info is filled

### **Pages & Components:**  

#### **1. User Authentication (Login & Registration)**  
- Create a **login & registration** page supporting **two roles**: Restaurants and Charities.  
- Implement **email verification UI** (e.g., input field for verification code).  
- Provide a **password reset** UI.  
- Role selection should be **clear** (dropdown or buttons).  

#### **2. Restaurant Dashboard**  
- Summary view displaying:  
  - Current donations  
  - Pending pickups  
  - Donation history  
- Profile management UI (name, contact info, operating hours).  
- Settings page for account management.  

#### **3. Food Inventory Management (Restaurant View)**  
- UI for adding **new food items**, including:  
  - Food name, description, quantity, category  
  - Preparation & expiration date  
  - Pickup time window  
  - Image upload button (frontend only)  
- Display all donated items in a table/list.  
- Ability to update or remove items.  
- Automatic removal indicator for expired items.  

#### **4. Charity Dashboard**  
- Summary view showing:  
  - Available food donations nearby  
  - Pending pickups  

- Profile management UI (charity details, needs).  
- Settings page for account management.  

#### **5. Food Search & Filter (Charity View)**  
- UI to browse food donations with sorting by **proximity**.  
- Filtering options:  
  - Food type/category  
  - Quantity  
  - Pickup window  
- Each food listing should show essential details + restaurant info.  
- Live updates when new donations appear.  

#### **6. Donation Request System**  
- UI for charities to **request specific food items**.  
- Restaurants can **approve or deny** requests.  
- Status tracking (pending, approved, completed).  

### **Design Guidelines:**  
- Build a **modern, minimalist, and highly intuitive** UI.  
- Use **CSS Grid/Flexbox** for responsive layouts.  
- Implement **light animations & transitions** for smooth interactions.  
- Ensure clear **visual hierarchy** (buttons, cards, tables).  
- Use **icons and color-coded statuses** for clarity.  

### **Deliverables:**  
- A folder with **HTML, CSS, and JS files** implementing all required UI elements.  
- **No backend logic**—only the frontend structure and interactivity.  
- **README.md** file with:  
  - Project overview  
  - Features  
  - Folder structure explanation  
  - How to set up and run the frontend (e.g., open `index.html` in a browser or use a local server)  

- **progress.md** file to track development progress, including:  
  - Features completed  
  - features left