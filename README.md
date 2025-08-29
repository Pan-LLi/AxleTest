# Parts Inventory Management Take-Home Assignment

A React-based web application for managing parts inventory with TypeScript, featuring a clean interface for adding, viewing, and persisting parts data.

## Project Overview

This application provides a comprehensive parts inventory management system built with modern web technologies. Users can add new parts with validation, view the current inventory in a table format, delete unwanted parts, and save their inventory to localStorage for persistence.

The application features:
- **React with TypeScript** for type-safe component development
- **Mock API layer** simulating real backend interactions
- **Form validation** ensuring data integrity
- **Toast notifications** for user feedback
- **Responsive design** with clean, modern styling
- **localStorage persistence** for data retention

## Your Tasks

### 1. Fix the Bug
**Issue:** The save functionality shows "Save successful!" but data doesn't actually persist when you refresh the page.

**Expected outcome:** Users should be able to save their inventory and have it reload when they refresh the page or return to the application.

### 2. Implement the following features:
**Choose and implement from the following options:**

- **Deletion functionality**: Add the ability to delete parts from the inventory
- **Pagination controls**: Add controls for navigating large inventories  
- **Dynamic sorting**: Implement sorting capabilities by name, quantity, or price
- **Audit trail**: Add tracking of when parts were added to the inventory

### 3. Update README
Document your implementation:
- Describe the bug you fixed and your solution approach
- Detail each new feature you implemented with usage instructions
- Update the "How to Run" section if needed
- Add any new dependencies or setup requirements

### 4. Summary
Write a brief summary including:
- Overview of the bug fix and your debugging process
- Description of implemented features and technical decisions
- Challenges encountered and how you overcame them
- Next steps you would take to further improve the application
- Any assumptions made during development

## How to Run

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation & Setup
1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### Building for Production
Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── PartForm.tsx      # Form component for adding new parts
│   └── PartList.tsx      # Table component for displaying parts
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
├── types.ts              # TypeScript type definitions
├── api.ts                # Mock API functions (contains the bug)
└── index.css             # Application styles
```

## Technical Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Custom CSS with responsive design
- **Notifications:** react-toastify
- **State Management:** React useState hooks
- **Data Persistence:** localStorage (mock backend)

---

**Good luck with the implementation! We're excited to see your approach to debugging, feature development, and code organization.**
