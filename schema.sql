-- Alhudah Database Schema

-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id VARCHAR(20) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created DATETIME NOT NULL,
  lastNotified DATETIME,
  INDEX idx_email (email),
  INDEX idx_created (created)
);

-- Create donations table (for future use)
CREATE TABLE IF NOT EXISTS donations (
  id VARCHAR(20) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  reference VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  created DATETIME NOT NULL,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created (created)
);
