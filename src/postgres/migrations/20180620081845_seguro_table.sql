-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE SEGURO(
  id_seguro text not null primary key,
  descripcion_seguro text not null,
  monto_seguro numeric,
  cod_contrato text references CONTRATO(cod_contrato)
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE SEGURO;