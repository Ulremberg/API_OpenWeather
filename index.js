require("dotenv").config();
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./node_modules/swagger-autogen/swagger_output.json");
const routes = require("./src/routes/weather.router.js");

app.use(express.json());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running in port : ${port}`);
});
