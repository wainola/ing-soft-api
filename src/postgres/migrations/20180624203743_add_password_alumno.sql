-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE ALUMNO ADD COLUMN hashed_password text not null;


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE ALUMNO DROP COLUMN hashed_password;