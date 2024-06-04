# UP Madayaw Cooperative

Welcome to the UP Madayaw Cooperative project! This repository houses the development of a cooperative management system for the UP Madayaw Cooperative in UP Mindanao. Our goal is to streamline and enhance the management of cooperative activities, providing efficient and user-friendly tools for members and administrators.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Entity-Relationship Diagram (ERD) Design](#entity-relationship-diagram-erd-design)
- [Mockups](#mockups)
- [Setting Up Development](#setting-up-development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The UP Madayaw Cooperative system aims to digitize and automate the cooperative's operations, including membership management, financial transactions, inventory control, and reporting. This system will provide a centralized platform for all cooperative activities, making it easier for members to engage and for administrators to manage the cooperative effectively.

## Features

- **Membership Management**: Track and manage member information and statuses.
- **Financial Transactions**: Record and monitor all financial transactions within the cooperative.
- **Inventory Control**: Manage the cooperative's inventory, including stock levels and item details.
- **Reporting**: Generate detailed reports on various aspects of the cooperative's operations.
- **User Roles and Permissions**: Define and manage different user roles and access levels within the system.

## Entity-Relationship Diagram (ERD) Design

The ERD provides a visual representation of the database structure, illustrating how data is interconnected within the system.

![ERD Diagram](path_to_erd_image)

## Mockups

The mockups give a visual preview of the user interface, showcasing the design and layout of different pages within the system.

### Dashboard
![Dashboard Mockup](path_to_dashboard_mockup_image)

### Member Management
![Member Management Mockup](path_to_member_management_mockup_image)



## Setting Up Development

Follow these steps to set up the development environment for the UP Madayaw Cooperative system:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/)
- [Supabase](https://supabase.com/) account and project
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/username/up-madayaw-cooperative.git
    cd up-madayaw-cooperative
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3. **Set up Supabase:**

    - Create a new project in Supabase.
    - Copy the `supabaseUrl` and `supabaseKey` from your Supabase project settings.
    - Create a `.env.local` file in the root of the project and add the following:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4. **Configure TypeScript and Tailwind CSS:**

    - Ensure `tsconfig.json` is properly configured for TypeScript.
    - Ensure `tailwind.config.js` and `postcss.config.js` are set up for Tailwind CSS.

5. **Run database migrations (if any):**

    Configure and run any required database migrations in Supabase.

6. **Start the development server:**

    ```sh
    npm run dev
    ```

    or

    ```sh
    yarn dev
    ```

7. **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

## Deployment

The UP Madayaw Cooperative system is deployed on Vercel for seamless and scalable hosting.

### Steps for Deployment:

1. **Connect your repository to Vercel:**

    - Log in to [Vercel](https://vercel.com/).
    - Create a new project and import your repository.
    - Configure the environment variables in Vercel using the same keys from your `.env.local` file.

2. **Deploy the project:**

    - Once connected, Vercel will automatically deploy the main branch of your repository.
    - Any subsequent commits to the main branch will trigger automatic redeployments.

3. **Access your deployed application:**

    - Your application will be available at the URL provided by Vercel.

## Contributing

We welcome contributions to improve the UP Madayaw Cooperative system! Please check our [contribution guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Feel free to reach out to the project maintainers if you have any questions or need further assistance. Happy coding!
