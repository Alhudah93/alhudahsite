# Alhudah Website (Next.js skeleton)

This repository provides a minimal Next.js-based skeleton for the Alhudah site (hero, donation via Paystack, membership pledges, admin dashboard).

Getting started

1. Install dependencies

```bash
cd /home/ibrahim/Desktop/Alhudah
npm install
```

2. Copy environment variables

```bash
cp .env.example .env
# Edit .env with real values for PAYSTACK_SECRET, ADMIN_PASSWORD and SMTP credentials
```

3. Run development server

```bash
npm run dev
```

Donations

- The donate page (`/donate`) calls `/api/paystack/init` which initializes a Paystack transaction and redirects the donor to Paystack.
- Set `PAYSTACK_SECRET` in env (Paystack secret key).

Admin

- Admin login uses `ADMIN_PASSWORD` in .env. Login at `/admin/login`.
- Admin dashboard at `/admin` shows members and Paystack balance (requires correct `PAYSTACK_SECRET`).

Memberships & notifications

- Members are stored in `data.json` via `lowdb`.
- A `worker.js` script sends monthly email reminders to members. Run periodically (cron, PM2, or systemd):

```bash
# Run once
npm run worker

# Example cron for daily run (crontab -e)
# 0 6 * * * cd /home/ibrahim/Desktop/Alhudah && /usr/bin/node worker.js >> /home/ibrahim/Desktop/Alhudah/worker.log 2>&1
```

Notes & next steps

- This is a starting skeleton. For production:
  - Use a persistent database (Postgres) and migrations.
  - Use Paystack Subscriptions API for automated recurring billing.
  - Harden admin authentication (NextAuth, sessions, RBAC) and add CSRF protections.
  - Host worker as a persistent scheduled service to send reminders.

If you want, I can:
- Add Paystack subscription flow (create plans + subscribe programmatically).
- Replace `lowdb` with Prisma + SQLite or Postgres and add migrations.
- Implement email templates and transactional notification events via webhooks.
