-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE ALUMNO(
  rut_alumno text not null primary key,
  nombre_alumno text not null,
  apellido_alumno text not null,
  correo_alumno text not null,
  rut_apoderado text references apoderado(rut_apoderado),
  cod_cliente text references cliente(cod_cliente)
)

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE ALUMNO;

