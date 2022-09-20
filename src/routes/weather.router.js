const router = require("express").Router();
const weatherController = require("../controllers/weather.controller");

router.get("/", weatherController.root);

router.get("/name/:name", weatherController.cityName);

router.get("/coords/:lat/:lon", weatherController.cityCoords);

router.get("*", weatherController.notFound);

module.exports = router;
