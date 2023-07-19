require("dotenv").config(); //Used for reading variables from .env
const express = require("express");
const cors = require("cors");
const connection = require("./db_connection");
const json_web_token = require("jsonwebtoken");

const app = express();
const secret_key = "secret_key";

app.use(cors());
app.use(express.json());

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

app.post("/api/register", (req, res) => { //Register
    const { email, password, name, lastname , curp, age , id_sex ,phone_number, id_user_type} = req.body;
    console.log(`Register request by: ${email} identified by: ${password} name: ${name} lastn ${lastname}, curp ${curp} age ${age} sex ${id_sex} phone ${phone_number} type ${id_user_type}`);
    connection.connect((error) => {
        connection.query(
            `select * from Users where email = '${email}'`,
            (error, result) => {
                if (result.length>0) {
                    console.log("email already exists");
                    res.status(500).json({message: 'email already exists'});
                }
                else{
                    var sql = `INSERT INTO USERS (email, password, name, lastname , curp, age , id_sex ,phone_number, id_user_type) VALUES ('${email}', '${password}', '${name}', '${lastname}' , '${curp}', ${age} , ${id_sex} ,${phone_number}, ${id_user_type})` ;
                        connection.query(sql, function (error, result) {
                            if (error) throw error;
                            //console.log(result)
                            console.log("user record inserted");
                        }

                    );
                }
            });
    });
        });


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`LogIn request by: ${email} identified by: ${password}`);
  connection.connect((error) => {
    if (error) throw error;

    //console.log("Connected to MySQL!");
    connection.query(
      `SELECT * FROM Users WHERE email='${email}' AND password='${password}';`,
      (error, result) => {
        if (error) {
          console.log("Invalid credentials :(");
          res.status(401).json({ message: "Invalid credentials :(" });
          return;
        }

        //console.log("Result: " + JSON.stringify(result[0]));
        const token = json_web_token.sign(result[0], secret_key, {
          expiresIn: "1h",
        });

        res.status(200).json({ token, user: result[0] });
        return;
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
