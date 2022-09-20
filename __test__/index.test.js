import City from "../src/models/city.model";
import Status from "../src/models/status.model";
import CityDTO from "../src/models/DTO/city.dto";
import request from "supertest";
import router from "../src/routes/weather.router";
import express from "express";

const app = express();

app.use(express.json());
app.use(router);

describe("should construct the class City", () => {
  const status = new Status(25, 69).getClassification().getStatus();
  const city = new City(-8.0539, -34.8811, "Recife", 25, 69, status, 200);
  it("create the class City", () => {
    expect(city.coords.lat).toEqual(-8.0539);
    expect(city.coords.lon).toEqual(-34.8811);
    expect(city.name).toEqual("Recife");
    expect(city.temp).toEqual(25);
    expect(city.humidity).toEqual(69);
    expect(city.status).toEqual("Nenhum risco iminente");
    expect(city.cod).toEqual(200);
  });
});

describe("should construct the class Status", () => {
  const status = new Status(25, 79);

  it("should return the class Status", () => {
    expect(status.temp).toEqual(25);
    expect(status.humidity).toEqual(79);
    expect(status.getClassification()).toEqual(expect.anything());
  });
});

describe("should construct the class CityDTO", () => {
  const status = new Status(25, 69).getClassification().getStatus();
  const city = new City(-8.0539, -34.8811, "Recife", 25, 69, status, 200);
  const cityDto = new CityDTO(city);
  it("create the class CityDTO", () => {
    expect(cityDto.humidity).toEqual(69);
    expect(cityDto.status).toEqual("Nenhum risco iminente");
  });
});

describe("should GET root router", () => {
  const defaultRequest = {
    "/name/:name": "endpoint for name city",
    "/coords/:lat/:lon": "endpoint for lat and lon",
    "/documentation": "endpoint acess documentation",
  };
  test("root router work", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(defaultRequest);
  });
});

describe("should run method of StatusHumidityLow", () => {
  const statusHumidityLow = new Status(20, 12);

  it("should return 'Umidade baixa'", () => {
    expect(statusHumidityLow.getClassification().getStatus()).toEqual(
      "Umidade baixa"
    );
  });

  it("should dont return 'Nenhum risco iminente'", () => {
    expect(statusHumidityLow.getClassification().getStatus()).not.toEqual(
      "Nenhum risco iminente"
    );
  });
});
describe("should run method of StatusTempHigh", () => {
  const statusTempHigh = new Status(35, 39);

  it("should return 'Risco de Ensolação'", () => {
    expect(statusTempHigh.getClassification().getStatus()).toEqual(
      "Risco de ensolação"
    );
  });

  it("should dont return 'Nenhum risco iminente'", () => {
    expect(statusTempHigh.getClassification().getStatus()).not.toEqual(
      "Nenhum risco iminente"
    );
  });
});

describe("should run method of StatusNoRisk", () => {
  const statusNoRisk = new Status(27, 32);

  it("should return 'Nenhum risco iminente'", () => {
    expect(statusNoRisk.getClassification().getStatus()).toEqual(
      "Nenhum risco iminente"
    );
  });

  it("should dont return 'Risco de Ensolação'", () => {
    expect(statusNoRisk.getClassification().getStatus()).not.toEqual(
      "Risco de ensolação"
    );
  });
});

describe("should run method of StatusIntenseCold", () => {
  const statusIntenseCold = new Status(9, 31);

  it("should return 'Frio intenso'", () => {
    expect(statusIntenseCold.getClassification().getStatus()).toEqual(
      "Frio intenso"
    );
  });

  it("should dont return 'Nenhum risco iminente'", () => {
    expect(statusIntenseCold.getClassification().getStatus()).not.toEqual(
      "Nenhum risco iminente"
    );
  });
});

describe("should run method of StatusUnknow", () => {
  const statusUnknow = new Status(28, 30);

  it("should return 'Status desconhecido'", () => {
    expect(statusUnknow.getClassification().getStatus()).toEqual(
      "Status desconhecido"
    );
  });

  it("should dont return 'Nenhum risco iminente'", () => {
    expect(statusUnknow.getClassification().getStatus()).not.toEqual(
      "Nenhum risco iminente"
    );
  });
});
