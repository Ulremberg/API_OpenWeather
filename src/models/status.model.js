const StatusHumidityLow = require("./status-classification/status.classification.humidityLow.model");
const StatusTempHigh = require("./status-classification/status.classification.tempHigh.model");
const StatusNoRisk = require("./status-classification/status.classification.noRisk.model");
const StatusIntenseCold = require("./status-classification/status.classification.intenseCold.model");
const StatusUnknow = require("./status-classification/status.classification.unknow.model");
const LIMIT_LOW_HUMIDITY = 30;
const LIMIT_HIGH_TEMP = 30;
const LIMIT_LOW_TEMP = 10;

module.exports = class Status {
  constructor(temp, humidity) {
    this.temp = temp;
    this.humidity = humidity;
  }

  getClassification() {
    switch (true) {
      case this.humidity < LIMIT_LOW_HUMIDITY:
        return new StatusHumidityLow();
      case this.temp > LIMIT_HIGH_TEMP:
        return new StatusTempHigh();
      case this.temp < LIMIT_LOW_TEMP:
        return new StatusIntenseCold();
      case ((this.temp > LIMIT_LOW_TEMP) &&
        (this.temp < LIMIT_HIGH_TEMP) &&
        (this.humidity > LIMIT_LOW_HUMIDITY)):
        return new StatusNoRisk();
      default:
        return new StatusUnknow();
    }
  }
};
