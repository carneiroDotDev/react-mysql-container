import 'dotenv/config'
import express from "express";
import mysql from "mysql";
import { DeviceRequest } from "./index.types.js";

const app = express();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

app.use(express.json());

app.get("/devices", (req, res) => {
  const query = "SELECT * FROM devices";
  db.query(query, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

const devicePostRequest: DeviceRequest = (req, res) => {
  const { deviceName, deviceType, ownerName, batteryStatus } = req.body;

  const query =
    "INSERT INTO `koerber`.`devices` (`deviceName`, `deviceType`, `ownerName`, `batteryStatus`) VALUES (?)";
  const values = [deviceName, deviceType, ownerName, batteryStatus];

  db.query(query, [values], (error, data) => {
    if (error) return res.json(error);
    return res.json(`${deviceName} device created successfully!`);
  });
}
app.post("/devices", devicePostRequest);

const devicePatchRequest: DeviceRequest<{id: string}> = (req, res) => {
  const deviceId = req.params.id;
  const { deviceName, deviceType, ownerName, batteryStatus } = req.body;

  const query =
    "UPDATE `koerber`.`devices` SET `deviceName` = ?, `deviceType` = ?, `ownerName` = ?, `batteryStatus` = ? WHERE (`id` = ?)";
  const values = [deviceName, deviceType, ownerName, batteryStatus];

  db.query(query, [...values, deviceId], (error, data) => {
    if (error) return res.json(error);
    return res.json(`${deviceName} has been patched successfully!`);
  });
};
app.put("/devices/:id", devicePatchRequest);

const deleteDeviceRequest: DeviceRequest<{id: string}> = (req, res) => {
  const deviceId = req.params.id;
  const query = "DELETE FROM `koerber`.`devices` WHERE (`id` = ?)";

  db.query(query, [deviceId], (error, data) => {
    if (error) return res.json(error);
    return res.json(`Device deleted successfully!`);
  });
}
app.delete("/devices/:id", deleteDeviceRequest);

app.listen(8800, () => {
  console.log("Server started successfully!");
});
