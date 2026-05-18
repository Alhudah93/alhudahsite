-- Remove duplicate members keeping the latest id per email, then add unique index on email
DELETE FROM members
WHERE id NOT IN (
  SELECT id_to_keep FROM (
    SELECT MAX(id) AS id_to_keep FROM members GROUP BY email
  ) AS keep
);

ALTER TABLE members ADD UNIQUE INDEX uq_members_email (email);

-- Verify
SELECT COUNT(*) AS members FROM members;
SELECT email, COUNT(*) AS c FROM members GROUP BY email HAVING c > 1;
