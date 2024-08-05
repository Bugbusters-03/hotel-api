"use strict";
/* -------------------------------------------------------------------------- */
/*                           Hotel API - Token Router                          */
/* -------------------------------------------------------------------------- */

const router = require("express").Router();
const { reservation } = require("../controllers/reservationController");
const permissions = require("../middlewares/permission");
router
  .route("/")
  .get( reservation.list)
  .post( reservation.create);

router
  .route("/:reservationId")
  .get( reservation.read)
  .put( reservation.update)
  .patch( reservation.update)
  .delete( reservation.delete);

module.exports = router;
