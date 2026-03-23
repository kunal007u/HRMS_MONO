# HRMS (Human Resource Management System)

HRMS is a comprehensive web application designed to streamline and automate various human resource management processes. It provides a centralized platform for managing employee information, recruitment, performance evaluations, leave management, and more.

## Features

- **Employee Management**: Add, update, and maintain employee records, including personal information, employment details, and job roles.
- **Recruitment**: Post job openings, track applicants, schedule interviews, and manage the hiring process.
- **Leave Management**: Allow employees to request and manage various types of leave, with approval workflows and tracking.
- **Performance Evaluations**: Conduct periodic performance reviews, set goals, and track employee progress and achievements.
- **Payroll Management**: Manage employee salaries, calculate payroll, and generate payslips.
- **Reports and Analytics**: Generate reports and visualizations for employee data, leave statistics, recruitment metrics, and more.
- **User Authentication and Authorization**: Secure user authentication and role-based access control for different user types (admins, managers, employees).

## Technologies Used

- **Frontend**: React.js, React Router, Redux
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Neon (Serverless)
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS/SCSS, Material-UI 

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (Node Package Manager)
- PostgreSQL (or Neon account for production)

### Installation

1. Clone the repository: git clone https://github.com/nayaka707/hrms_backend.git
2. Navigate to the project directory: cd hrms_backend
3. Install the dependencies: npm install
4. Configure the environment variables in `.env` file (see Neon Setup below)
5. Start the development server: npm start
6. The application should now be running at `http://localhost:9000`.

## Neon Database Setup (Production with Netlify)

### Step 1: Create a Neon Project
1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Create a new project
3. Select PostgreSQL as the database
4. Copy your **connection string** (looks like: `postgresql://user:password@ep-xxxxx.us-east-1.neon.tech/dbname`)

### Step 2: Add Neon Connection to Environment Variables
Add to your Netlify environment variables:
```
NETLIFY_DATABASE_URL=postgresql://user:password@ep-xxxxx.us-east-1.neon.tech/dbname
```

Or in your local `.env` file for testing:
```
# Local Development (PostgreSQL)
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=hrms_db
DB_HOST=localhost
DB_PORT=5432

# Netlify Production (Neon)
NETLIFY_DATABASE_URL=postgresql://user:password@ep-xxxxx.us-east-1.neon.tech/dbname
```

### Step 3: Database Configuration is Already Updated
Your `config/database.js` has been updated to automatically detect and use Neon when `NETLIFY_DATABASE_URL` is present.

### Step 4: Deploy to Netlify
1. In your Netlify dashboard, go to **Site settings** → **Build & deploy** → **Environment**
2. Add the `NETLIFY_DATABASE_URL` variable with your Neon connection string
3. Deploy your backend (or redeploy for changes to take effect)

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with descriptive messages
4. Push your changes to your forked repository
5. Create a pull request, and we'll review and merge your changes

## License

This project is licensed under the [MIT License](LICENSE).

