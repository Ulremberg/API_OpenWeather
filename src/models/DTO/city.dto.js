module.exports = class CityDTO {
  temp;
  humidity;
  status;

  constructor(data) {
    this.temp = data.temp;
    this.humidity = data.humidity;
    this.status = data.status;
  }
};
