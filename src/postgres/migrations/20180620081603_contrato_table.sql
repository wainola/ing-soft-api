-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE CONTRATO(
  cod_contrato text not null primary key,
  descripcion_contrato text not null,
  monto_pagar numeric,
  cod_cliente text references cliente(cod_cliente),
  rut_empleado text references empleado(rut_empleado)
)

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE CONTRATO;

