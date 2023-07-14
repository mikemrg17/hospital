require("dotenv").config(); //Used for reading variables from .env
const express = require("express");
const cors = require("cors");
const connection = require("./db_connection");
const json_web_token = require("jsonwebtoken");

const app = express();
const secret_key = "secret_key";

app.use(cors());

const authenticate_jwt = (req, res, next) => {
  console.log("Middleware entering...");
  console.log(req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    json_web_token.verify(token, secret_key, (error, user) => {
      if (error) return res.sendStatus(403); //403 = forbidden (the resources is not available)

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); //401 = Unauthorized
  }
};

app.post("/api/login", (req, res) => {
  const { email, password } = req.query;
  console.log("Email: ", email, " password: ", password);
  connection.connect((error) => {
    if (error) throw error;

    console.log("Connected to MySQL!");
    connection.query(
      `SELECT * FROM Users WHERE email=${email} AND password=${password};`,
      (error, result) => {
        if (error) res.status(404).json({ message: "Invalid credentials :(" });

        console.log("Result: " + JSON.stringify(result[0]));
        const token = json_web_token.sign(result[0], secret_key, {
          expiresIn: "1h",
        });

        res.status(200).json({ token });
      }
    );
  });
});

app.get("api/private", (req, res) => {
  res.send("Privada"); // Hacer funcionar la clave privada
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
