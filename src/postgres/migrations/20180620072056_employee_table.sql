-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE EXTENSION pgcrypto;
CREATE EXTENSION citext;

CREATE TABLE EMPLEADO(
  rut_empleado text not null primary key,
  nombre_empleado text not null,
  apellido_empleado text not null,
  cargo_empleado text not null
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP EXTENSION pgcrypto;
DROP EXTENSION citext;
DROP TABLE EMPLEADO