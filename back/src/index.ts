import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "koerber",
});

app.use(express.json());

app.get("/devices", (req, res) => {
  const query = "SELECT * FROM devices";
  db.query(query, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.post("/devices", (req, res) => {
  const deviceName = req.body.deviceName;
  const deviceType = req.body.deviceType;
  const ownerName = req.body.ownerName;
  const batteryStatus = req.body.batteryStatus;

  const query =
    "INSERT INTO `koerber`.`devices` (`deviceName`, `deviceType`, `ownerName`, `batteryStatus`) VALUES (?)";
  const values = [deviceName, deviceType, ownerName, batteryStatus];
  console.log(values);

  db.query(query, [values], (error, data) => {
    if (error) return res.json(error);
    return res.json(`${deviceName} device created successfully!`);
  });
});

app.put("/devices/:id", (req, res) => {
  const deviceId = req.params.id;

  const deviceName = req.body.deviceName;
  const deviceType = req.body.deviceType;
  const ownerName = req.body.ownerName;
  const batteryStatus = req.body.batteryStatus;

  const query =
    "UPDATE `koerber`.`devices` SET `deviceName` = ?, `deviceType` = ?, `ownerName` = ?, `batteryStatus` = ? WHERE (`id` = ?)";
  const values = [deviceName, deviceType, ownerName, batteryStatus];

  db.query(query, [...values, deviceId], (error, data) => {
    if (error) return res.json(error);
    return res.json(`${deviceName} has been patched successfully!`);
  });
});

app.delete("/devices/:id", (req, res) => {
  const deviceId = req.params.id;
  const query = "DELETE FROM `koerber`.`devices` WHERE (`id` = ?)";

  db.query(query, [deviceId], (error, data) => {
    if (error) return res.json(error);
    return res.json(`Device deleted successfully!`);
  });
});

app.listen(8800, () => {
  console.log("Server started successfully!");
});
