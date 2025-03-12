
# Business Details Registration Portal

This project is a business registration portal built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**. It allows users to register their business details, including business information, operating hours, and services offered. The project is designed to be modular, scalable, and easy to extend.

---

## Features

- **Multi-step Form**: A dynamic form with tabs for business details, business hours, and services.
- **Validation**: Form validation using **Zod** and **React Hook Form**.
- **API Integration**: Submit business data to a mock API endpoint.
- **UI Components**: Built with **shadcn/ui** for a consistent and modern design.
- **Responsive Design**: Fully responsive layout for all screen sizes.
- **Toast Notifications**: Feedback for form submission success or errors using **Sonner**.

---

## Project Structure

```
rahul5403-business-details-ceus-capital/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── api/                  # API routes
│       └── business/
│           └── route.ts      # Business data submission endpoint
├── components/               # Reusable components
│   ├── business-form.tsx     # Main business form
│   ├── business-hours.tsx    # Business hours component
│   ├── services.tsx          # Services component
│   └── ui/                   # shadcn/ui components
├── hooks/                    # Custom hooks
│   └── use-toast.ts          # Toast notification hook
├── lib/                      # Utility functions
│   └── utils.ts              # Utility functions (e.g., `cn` for class merging)
├── public/                   # Static assets
├── styles/                   # Global styles
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rahul5403/business-details-ceus-capital.git
   cd business-details-ceus-capital
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## Usage

### Form Submission

1. Fill out the **Business Details** tab with the required information.
2. Navigate to the **Business Hours** tab to set operating hours.
3. Add services in the **Services** tab.
4. Submit the form to send the data to the mock API endpoint.

### API Endpoint

The form data is submitted to the `/api/business` endpoint, which logs the data to the console.

---

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
- **React Hook Form**: Form management library with validation support.
- **Zod**: Schema validation for form inputs.
- **Sonner**: Toast notifications for user feedback.


## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the UI components.
- [React Hook Form](https://react-hook-form.com/) for form management.
- [Zod](https://zod.dev/) for schema validation.
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications.

