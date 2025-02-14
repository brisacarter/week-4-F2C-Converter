/*
Name: Brisa Carter
Assignment: Week 4 - F2C Converter 
Description: This calculator converts temperatures from Farenheit to Celsius
It extends from Calculator from Debasis
Date: 02/07/25
*/

//to test the server.js file type npm test on shell/terminal
//test suit created by AI - Brisa added comments

// const supertest = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("supertest");

//create an express object from the express package
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

//this code is only invoked on the path /f2c
app.get("/f2c", function (req, res) {
  res.sendFile(path.join(__dirname, "f2cCalc.html"));
});

// invoked on the submit button
app.post("/f2c", function (req, res) {
  var fTemp = parseFloat(req.body.fTemp);
  var convertedTemp = (fTemp - 32) * 5 / 9;
  res.send("The temperature in Celsius is " + Math.round(convertedTemp));
});

//required to check if server is already running
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Ensure app is exported for tests


// Unit tests
describe("Express App Unit Tests", () => {
  // Test GET /f2c route
  test("should return the HTML file for GET /f2c", async () => {
    const res = await request(app).get("/f2c");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
  });

  // Test POST /f2c route with valid input
  test("should convert Fahrenheit to Celsius and return the result", async () => {
    const res = await request(app).post("/f2c").send("fTemp=100");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("The temperature in Celsius is 38");
  });

  // Test POST /f2c route with invalid input
  test("should handle invalid input gracefully", async () => {
    const res = await request(app).post("/f2c").send("fTemp=invalid");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("The temperature in Celsius is NaN");
  });
});

// Export the app for testing
module.exports = app;
