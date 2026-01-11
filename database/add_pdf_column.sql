USE todo_db;

ALTER TABLE todos ADD COLUMN pdf LONGTEXT NULL;

SELECT 'PDF column added successfully' as status;