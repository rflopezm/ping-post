const express = require("express");
const app = express();
const chokidar = require("chokidar");
const port = 3000;

const watcher = chokidar.watch("/Users/lopez/plates", { persistent: true });

const INFO_SEPARATOR = "_";
const INFO_PLATE_CAMERA_ADDRESS_INDEX = 0;
const INFO_PLATE_INDEX = 1;

watcher
  .on("add", (path) => {
    console.log(`${path} has been addedd`);
    const parts = path.split("/");
    const infoSection = parts[parts.length - 1];
    const infoParts = infoSection.split(INFO_SEPARATOR);
    const cameraAddress = infoParts[INFO_PLATE_CAMERA_ADDRESS_INDEX];
    const plate = infoParts[INFO_PLATE_INDEX];
    console.log(
      `Received data: The plate is: ${plate}, the camera is ${cameraAddress}`
    );
  })
  .on("error", (error) => {
    console.error("Error on plate detection");
    console.error(error);
  });

app.post("/", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
