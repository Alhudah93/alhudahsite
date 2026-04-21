# MySQL Setup Guide for Hostinger Deployment

This project has been converted from lowdb (JSON file database) to MySQL for production deployment on Hostinger.

## Setup Instructions

### 1. Create the Database

On Hostinger, you can use the Hostinger control panel to create a MySQL database:

1. Go to **Databases** → **MySQL Databases**
2. Create a new database named `alhudah` (or your preferred name)
3. Create a MySQL user with privileges on this database
4. Note the hostname (usually `localhost` or a specific host), username, and password

### 2. Import the Schema

Execute the SQL schema to create the required tables:

```bash
# On Hostinger, use phpMyAdmin or SSH:
mysql -h YOUR_HOST -u YOUR_USER -p YOUR_DATABASE < schema.sql
```

Or paste the contents of `schema.sql` into phpMyAdmin SQL tab.

### 3. Configure Environment Variables

Update your `.env.local` file (create if it doesn't exist) with your MySQL credentials:

```env
# MySQL Database Configuration
DB_HOST=your-hostname
DB_USER=your-username
DB_PASS=your-password
DB_NAME=alhudah

# Other required settings
PAYSTACK_SECRET=your_paystack_test_key
ADMIN_PASSWORD=your_secure_password
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_email_password
EMAIL_FROM="Alhudah <noreply@alhudah.org>"
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 4. Migrate Existing Data (if any)

If you have existing data in `data.json`, you'll need to manually insert it or use a migration script:

```javascript
// Quick migration script (run once then delete)
const members = require('./data.json').members;
members.forEach(m => {
  // INSERT INTO members VALUES...
});
```

### 5. Build and Deploy

```bash
npm run build
npm start
```

Or on Hostinger, use their deployment tools to deploy the built Next.js app.

### 6. Running the Worker

The worker.js script sends monthly reminders:

```bash
node worker.js
```

Set this up as a cron job on Hostinger for periodic execution (e.g., every month).

## Database Schema

The project uses two tables:

- **members**: Stores membership pledges (email, amount, dates)
- **donations**: Stores donation transactions from Paystack

See `schema.sql` for the complete schema.

## Troubleshooting

### Connection Errors
- Verify MySQL credentials are correct
- Check if the database exists and was initialized with schema.sql
- Ensure the DB_HOST is reachable

### Table Not Found
- Run the schema.sql file to create tables
- Check that you're using the correct database name

### SMTP Issues for Email
- Test SMTP credentials in phpMyAdmin or another tool
- Some providers require app-specific passwords

## Notes

- The project now uses connection pooling for better performance
- Queries use parameterized statements to prevent SQL injection
- Error messages are logged to help with debugging
