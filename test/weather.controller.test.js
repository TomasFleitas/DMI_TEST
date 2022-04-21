let CONTROLLER;
let DTO;
let API;
const mock_GET = jest.fn();
require("dotenv").config({ path: `.env` });

beforeAll(() => {
  jest.mock("axios", () => ({
    get: mock_GET,
  }));
});

describe("Check temp test", () => {
  beforeAll(() => {
    CONTROLLER = require("../controllers/weather/weather.controller");
    DTO = require("../controllers/weather/weather.dto");
    API = require("../api/weatherApi");
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw a error if checkFor is empty", async () => {
    await expect(CONTROLLER.weatherController({ query: {} })).rejects.toThrow(
      new Error("checkFor must be either 'greater' or 'less'")
    );
  });

  it("Should throw a error if checkFor isn't equal to 'greater' or 'less' value", async () => {
    await expect(CONTROLLER.weatherController({ query: {} })).rejects.toThrow(
      new Error("checkFor must be either 'greater' or 'less'")
    );
  });

  it("Should throw a error if checkFor is setted but toCheck is not a number", async () => {
    await expect(CONTROLLER.weatherController({ query: { checkFor: "greater", toCheck: "wda" } })).rejects.toThrow(
      new Error("toCheck must be a number")
    );
  });

  it("Should return true value", async () => {
    mock_GET.mockImplementation(() => ({ data: { current: { temp: 15 } } }));
    expect(
      await DTO.getAndCheckWeather({
        checkFor: "greater",
        innerToCheck: 13,
        lat: process.env.DEFAULT_LAT,
        lon: process.env.DEFAULT_LON,
      })
    ).toBe(true);
    expect(mock_GET).toHaveBeenCalledTimes(1);
  });

  it("Should return false becouse the temperature is less than 16", async () => {
    mock_GET.mockImplementation(() => ({ data: { current: { temp: 15 } } }));
    expect(
      await DTO.getAndCheckWeather({
        checkFor: "greater",
        innerToCheck: 16,
        lat: process.env.DEFAULT_LAT,
        lon: process.env.DEFAULT_LON,
      })
    ).toBe(false);
  });

  it("Should throw error when weather api return error", async () => {
    mock_GET.mockImplementation(() => {
      throw new Error();
    });
    await expect(CONTROLLER.weatherController({ query: { checkFor: "greater" } })).rejects.toThrow(
      new Error("Error getting the temperature")
    );
  });
});
