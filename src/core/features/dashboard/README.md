# Dashboard Integration Guide

This document describes how to integrate and configure the Dashboard module in your Next.js application.

---

## 1. Installation

1. Ensure your project is set up with Next.js (v15+).
2. Install required dependencies:

   ```bash
   npm install lucide-react @shadcn/ui react react-dom next
   ```

3. Copy `core/assets/config/ADMIN_CONFIG.ts` (or your custom config) into your project under `core/assets/config/`.

---

## 2. Project Structure

```
project-root/
├── core/
│   ├── assets/
│   │   ├── config/         # Dashboard configurations (required)
│   │   │   └── ADMIN_CONFIG.ts
│   │   └── types/          # Shared TypeScript types
│   ├── components/         # UI components (Sidebar, Breadcrumb, etc.)
│   ├── features/
│   │   └── dashboard/      # Dashboard layout and hooks
│   └── utils/              # Helper functions (`createPathBuilder`, validation)
├── app/
│   └── dashboard/          # Dashboard entry points and routes (App Router)
└── README.md               # This guide
```

> **Note:** All dashboard configurations _must_ reside in `core/assets/config/`. This ensures the `useNavData` hook and `DashboardContextProvider` can correctly locate and consume them.

---

## 3. Configuration

1. **SidebarConfig**
   - Define `navMain`, `teams`, `projects`, and `user` in `core/assets/config/ADMIN_CONFIG.ts` (or similar).
   - Each entry in `navMain` should include:
     - `title` (string)
     - `url` (string)
     - `secondaryUrl` (string)
     - `icon` (Lucide icon component)
     - Optional `items` (for sub-navigation)

2. **Path Builder**
   - Use `createPathBuilder(basePath)` from `@/core/utils` to generate consistent URLs:

     ```ts
     import { createPathBuilder } from '@/core/utils';
     const path = createPathBuilder('/dashboard/admin');
     ```

---

## 4. Usage

1. **Wrap your application**

   ```tsx
   // app/layout.tsx
   import DashboardLayoutWrapper from '@/core/features/dashboard/DashboardLayoutWrapper';
   import { ADMIN_CONFIG } from '@/core/assets/config/ADMIN_CONFIG';

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <DashboardLayoutWrapper role={/* your role logic */} sidebarConfig={ADMIN_CONFIG}>
         {children}
       </DashboardLayoutWrapper>
     );
   }
   ```

2. **DashboardLayoutWrapper**
   - Loads navigation data via `useNavData` hook.
   - Provides `DashboardContext` to all children.

3. **Breadcrumb and Sidebar**
   - Inside `DashboardLayout`, the `BreadcrumbCustom` component reads `navPath` from context and renders the trail.
   - The `AppSidebar` component dynamically renders different sidebar UIs based on the user's role.

---

## 5. Role-Based Sidebar UI

You can fully customize the sidebar UI/UX for each role individually.

- The `AppSidebar` component maps roles (`admin`, `user`, `teacher`) to their respective sidebar components (`SidebarAdmin`, `SidebarUser`, etc.).
- This provides flexibility for per-role sidebar structures and logic.

```tsx
const sidebarMap: Record<UserRoles, React.ReactNode> = {
  user: <SidebarUser {...props} />, // custom sidebar for user
  admin: <SidebarAdmin {...props} />, // custom sidebar for admin
  teacher: '', // placeholder for teacher
};
```

> **Note:** Even though each role can have its own sidebar, `AppSidebar` ensures a shared baseline of behavior across all roles, such as layout structure and responsiveness.

---

## 6. Customization

- **Styling:** All UI components use Tailwind CSS; you can override classes or extend themes.
- **Hooks:** Adjust `useNavData` logic (in `hooks/useNavData.ts`) if you need custom breadcrumb behavior.
- **Assets:** Icons and images can be updated in the `core/assets/config` files.

---

## 7. Contributing

1. Fork the repository and create a feature branch.
2. Ensure TypeScript types stay in sync (`core/assets/types.ts`).
3. Run tests and lint before submitting a PR.

---

_For more details, refer to code comments and type definitions in `core/assets/types`._
