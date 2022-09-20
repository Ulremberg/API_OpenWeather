const City = require("../models/city.model");
const Status = require("../models/status.model");
const apiKey = process.env.APIKEY;
const URL = process.env.URL;
const unit = process.env.UNIT;
const lang = process.env.LANG;
const CityDTO = require("../models/DTO/city.dto");

const axios = require("axios");

const root = (req, res, next) => {
  const defaultRequest = {
    "/name/:name": "endpoint for name city",
    "/coords/:lat/:lon": "endpoint for lat and lon",
    "/documentation" : "endpoint acess documentation",
  };
  res.send(defaultRequest);
};

const cityName = (req, res, next) => {
  const name = req.params.name;
  axios
    .get(`${URL}q=${name}&appid=${apiKey}&units=${unit}&lang=${lang}`)
    .then(function (response) {
      const status = new Status(
        response.data.main.temp,
        response.data.main.humidity
      )
        .getClassification()
        .getStatus();
      const city = new City(
        response.data.coord.lat,
        response.data.coord.lon,
        response.data.name,
        response.data.main.temp,
        response.data.main.humidity,
        status,
        response.data.cod
      );
      const cityDTO = new CityDTO(city);
      res.send(cityDTO);
    })
    .catch(function (error) {
      if (error.response) {       
        res.status(error.response.status).send(error.response.data.message);
      }
      next();
    });
};

const cityCoords = (req, res, next) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  axios
    .get(
      `${URL}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}&lang=${lang}`
    )
    .then(function (response) {
      const status = new Status(
        response.data.main.temp,
        response.data.main.humidity
      )
        .getClassification()
        .getStatus();
      const city = new City(
        response.data.coord.lat,
        response.data.coord.lon,
        response.data.name,
        response.data.main.temp,
        response.data.main.humidity,
        status,
        response.data.cod
      );
      const cityDTO = new CityDTO(city);
      res.send(cityDTO);
    })
    .catch(function (error) {
      if (error.response) {        
        res.status(error.response.status).send(error.response.data.message);
      }
      next();
    });
};

const notFound = (req, res,next) =>{
  const notFound = {
    "ERROR": "URL not found",
  }
  try {
    res.status(404).send(notFound);
    
  } catch (error) {    
    if (error.response) {        
      
    }
    next();
  }
  
};

module.exports = { root, cityName, cityCoords, notFound };
