const { Router } = require("express");

const {
  getReservesHandler,
  postReserveHandler,
  getReserveByIdHandler,
  putReserveHandler,
  deleteReserveHandler,
} = require("../../handlers/Reserve/reserveHandler");


const ReserveRouter = Router();

/* ReserveRouters.get("/", jwtCheck, getReservesHandler); */
ReserveRouter.get('/',  getReservesHandler);
ReserveRouter.post('/', postReserveHandler);
ReserveRouter.get('/:id', getReserveByIdHandler);
ReserveRouter.put('/', putReserveHandler);
ReserveRouter.delete('/', deleteReserveHandler);

module.exports = ReserveRouter;