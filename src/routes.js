const express = require("express");
const routes = express.Router();
const validate = require("express-validation");
const handle = require("express-async-handler");

const authMiddleware = require("./app/middllewares/auth");

const controllers = require("./app/controllers");
const validators = require("./app/validators");

/*
 * Users
 */
routes.post(
  "/users",
  validate(validators.User),
  handle(controllers.UserController.strore)
);

/**
 * Sessions
 */
routes.post(
  "/sessions",
  validate(validators.Session),
  handle(controllers.SessionController.store)
);

routes.use(authMiddleware);

/*
 * Ads
 */
routes.get("/ads", handle(controllers.AdController.index));
routes.get("/ads/:id", handle(controllers.AdController.show));
routes.post(
  "/ads",
  validate(validators.Ad),
  handle(controllers.AdController.store)
);
routes.put(
  "/ads/:id",
  validate(validators.Ad),
  handle(controllers.AdController.update)
);

routes.delete("/ads/:id", handle(controllers.AdController.destroy));

/**
 * Purchase
 */
routes.get("/purchases", handle(controllers.PurchaseController.index));

routes.post(
  "/purchases",
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
);

module.exports = routes;
