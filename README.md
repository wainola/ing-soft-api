# Agencia On Tour.

## TODOS.

* formulario de reserva que colegio hace establecido previamente el contrato.
* Meta de dinero que se define en el contrato.
* Formulario de deposito como curso => esto implica que hay un usuario con privilegios y ROL encargado del curso, al cual se le deposita.
* Los montos depositados por el encargado del curso, incrementan el ahorro de cada alumno.

## Especificidades.

* ficha de contrato, con modalidad de pago. El contrato señala fechas del evento como el tope de la fecha para pagar el monto anticipado.
* **representante del curso** realiza depositos de las actividades en la cuenta corriente de la agencia.

## Vistas.

* visualizacion del aporte hasta lograr la meta definida => formulario de transferencia de dinero y actualizacion del estado del monto.
* la visualizacion del home del apoderado, le permite ver el contrato, asi como servicios adicionales.
* es necesario visibilizar informacion tanto de los montos depositados por el curso, como los apoderados, para verificar los aportes en su cuenta corriente y contratar los servicios.
* la agencia tienen que publicar informacion efectiva => collection list para mostrar fechas por venir con message component.
* ejecutivo de ventas debe registrar y mantener la informacion del contato, efectuado por el cursro. Registra informacion necesaria, como *cliente, destino, fecha de viaje, numero de alumnos, servicios contratatos (seguros, beneficios, etc), tipo de actividades a efectuar y cualquier otro dato relevante*.
* el sistema **debe entregar un reporte del estado de la cuenta del alumno, indicando los aportes efectuados y el saldo por completar de acuerdo a los servicios contradados.
* sistema debe permitir consultar el contrato con sus servicios adicionales contratados tales como servicios de hoteleria especial, visitas a museos, y otras actividades. Se debe generar un documento en formato pdf.
* ejecutivos de agencia:
  - consulta de montos depositados para un determinado curso.
* dueño de la agencia el sistema debe permitor un reporte del estado de avance de los clientes, en donde se señale el porcentaje que lleva logrado cada colegio y las actividades que han concretado indicando el aporte del curso de cada actividad.
* sistema debe permitir a los ejecutivos de cuenta agregar seguros a un contrato, segun la negociacion que se logre.