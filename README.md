Architecture of the core Module in the agroyar Project
The core module is a central component of the agroyar project, designed to house shared resources and utilities that are utilized across various features and components. This document provides an overview of the core module's structure, its subfolders, and their respective purposes within the project's architecture.
Overview
The core module serves as a repository for modules that are common to multiple features of the project. It is structured to support the project's adherence to Feature-Based Architecture and Atomic Design principles, ensuring that shared code is easily accessible, maintainable, and reusable.
Structure of the core Module
The core module is organized into several subfolders, each dedicated to a specific type of shared resource:

assets/: Contains static resources used throughout the project.

schema/: Defines schemas for data validation.
themes/: Manages theme configurations for consistent styling.
types/: Centralizes TypeScript type definitions (e.g., UserRoles, SidebarConfig).
data/: Stores static data used across the application.

components/: Houses reusable UI components, structured according to Atomic Design principles.

shadcn/: Contains components from the shadcn library, organized into:
ui/: Atoms (small, independent components like buttons and icons).
blocks/: Blocks (combinations of atoms, e.g., Skeleton, BreadcrumbCustom).
templates/: Templates (larger structures combining blocks, e.g., DashboardLayout).

custom/: Contains custom-built components following the same Atomic Design structure:
ui/: Custom atoms.
blocks/: Custom blocks.
templates/: Custom templates.

services/: Manages shared services and logic.

api/: Contains API functions for data fetching and manipulation.
providers/: Includes React Context providers (e.g., DashboardContext).
state/: Manages global state, potentially using tools like Redux or Zustand.

utils/: Provides helper functions used across the project.

index.ts: Centralized export of utility functions (e.g., findMainAndCurrentConfigItem).

hooks/: Contains custom React hooks for shared logic.

custom.ts: Exports hooks like useMetaTitle.

Role in Feature-Based Architecture
The core module plays a crucial role in the project's Feature-Based Architecture by:

Centralizing shared resources: Reducing code duplication across features.
Promoting reusability: Allowing features to leverage common components, services, and utilities.
Simplifying maintenance: Changes to shared modules can be made in one place, benefiting all features.

Guidelines for Developers
When adding new modules to the core folder, developers should:

Determine if the module is truly shared: Only add modules that are used by multiple features.
Follow Atomic Design for components: Ensure new components fit into the atoms, blocks, or templates structure.
Use TSDoc for documentation: All new utils, hooks, and complex components must include TSDoc comments for clarity and automated documentation generation.

Example of TSDoc Documentation
Below are examples of how to document utils, hooks, and components using TSDoc:
Utility Function
/\*\*

- A utility function to calculate the sum of two numbers.
-
- @param a - The first number
- @param b - The second number
- @returns The sum of a and b
  \*/
  export function sum(a: number, b: number): number {
  return a + b;
  }

Custom Hook
/\*\*

- A custom hook for managing form state.
-
- @template T - The type of the form data
- @param initialValues - The initial values of the form
- @returns An object containing the form values and a function to update them
  \*/
  export function useForm<T>(initialValues: T) {
  // Hook logic
  }

Reusable Component
/\*\*

- A reusable button component.
-
- @param props - The button's properties
- @param props.label - The text to display on the button
- @param props.onClick - The function to call when the button is clicked
- @returns A button element with the specified label and click handler
  \*/
  export function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick}>{label}</button>;
  }

Restrictions on core Usage

Single core folder: Only one core folder exists at the root level (src/core/), and developers are restricted to using this shared core for all features.
No feature-specific core folders: Developers should not create additional core folders inside route groups (e.g., app/(dashboard)/core). All shared modules must reside in the central core folder.

This structure ensures that the core module remains organized, efficient, and aligned with the project's architectural goals, while enforcing consistency and reusability across the application.
