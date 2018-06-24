-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE PAGO(
  id_pago numeric primary key,
  monto_pagado numeric,
  rut_alumno text not null references ALUMNO(rut_alumno),
  cod_contrato text not null references CONTRATO(cod_contrato)
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE PAGO;