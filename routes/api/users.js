const router = require("express").Router();
const registerController = require("../../controllers/registerController");

// Matches with "/api/homes"
router.route("/")
  .get(registerController.findAll)
  .post(registerController.create);

// Matches with "/api/homes/:id"
/*router
  .route("/:id")
  .get(homesController.findById)
  .put(homesController.update)
  .delete(homesController.remove);

// /api/homes/about
/*router
  .route("/about")
  .get(homesController.findAll)
  .post(homesController.create);

router.route("/login")
  .get(registerController.findOne)*/
  
module.exports = router;
