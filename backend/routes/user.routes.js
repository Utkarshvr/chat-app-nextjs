const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");
const { verifyAccessToken } = require("../middleware/verification/verifyToken");

router
  .route("/:id")
  .all(verifyAccessToken)
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
