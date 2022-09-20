const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./node_modules/swagger-autogen/swagger_output.json";
const endpointsFiles = ["./src/routes/weather.router.js"];

const doc = {
  info: {
    title: "OpenWeather REST API",
    description:
      "Microservice that consumes the OpenWeather API and returns status from a city name or latitude and longitude",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
