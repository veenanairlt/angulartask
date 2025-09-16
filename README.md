Angular Task App (Angular 20 + Material)
This is a simple Angular 20 demo application showcasing:

- Authentication with login/logout and cookie storage (ngx-cookie-service)
- Angular Material UI for modern responsive design
- Signal Store (signals) for state management
- Route protection with AuthGuard
- Mock API using angular-in-memory-web-api
- Lazy loading routes
- Loading states with spinners
- Unit tests for services and components
- Features

1.Login page

- Validates email + password
- Stores token in cookies on success
- Navigates to dashboard
- Auth handling

    Auth guard prevents access to dashboard & list without login
    Logout clears cookies + redirects to login


2.Dashboard

- Shows logged‑in user’s email
- Welcome card
- Navigation to List Page
- Items list

  Fetches items from mock API (/api/items)
  Displays with Angular Material mat-table
  Signal store manages state (items, loading, error)
  Spinner during API call, error handling if call fails


**Project Structure**


src/app/
  core/
    services/
      auth.service.ts
    guards/
      auth.guard.ts
    interceptors/
      auth.interceptor.ts
    mock-api.service.ts
  auth/
    login/login.component.ts
  dashboard/dashboard.component.ts
  items/
    list/list.component.ts
    state/items.store.ts
  app.routes.ts
  app.component.ts


 **Setup Instructions**
 
1. Clone the Repository

git clone https://github.com/veenanairlt/angulartask.git

cd angulartask

2. Install Dependencies

npm install

3. Run the Development Server

npm run start

App runs at:  http://localhost:4200

4. Default Credentials (for Mock API)


Email: test@example.com

Password: password


Visit /login → log in using mock credentials.

Redirects to /dashboard.

Navigate to /items to view API‑backed list.

Logout returns you to login page.
