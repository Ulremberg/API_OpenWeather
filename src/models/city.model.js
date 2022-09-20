module.exports = class City {
  constructor(lat, lon, name, temp, humidity, status, cod) {
    this.coords = {
      lat: lat,
      lon: lon,
    };
    this.name = name;
    this.temp = temp;
    this.humidity = humidity;
    this.status = status;
    this.cod = cod;
  }
};
