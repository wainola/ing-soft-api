-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE APODERADO(
  rut_apoderado text not null primary key,
  nombre_apoderado text not null,
  apellidos_apoderado text not null
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE APODERADO;