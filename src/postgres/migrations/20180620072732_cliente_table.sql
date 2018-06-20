-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE CLIENTE(
  cod_cliente text not null primary key,
  nombre_cliente text not null,
  descripcion_cliente text not null
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE CLIENTE;