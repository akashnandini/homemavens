const router = require("express").Router();
const homesController = require("../../controllers/homesController");

// Matches with "/api/homes"
router.route("/")
  .get(homesController.findAll)
  .post(homesController.create);

// Matches with "/api/homes/:id"
router
  .route("/:id")
  .get(homesController.find)
  .put(homesController.update)
  .delete(homesController.remove);

// /api/homes/about
/*router
  .route("/about")
  .get(homesController.findAll)
  .post(homesController.create);
*/
module.exports = router;
