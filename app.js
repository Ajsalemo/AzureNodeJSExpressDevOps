const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cluster = require("cluster");
// Check the number of CPUs
const numCPUs = require("os").cpus().length;

const indexRouter = require("./routes/index");
const productsAllRouter = require("./routes/products_all");

const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/products_all", productsAllRouter);

// If the cluster module is available and the isMaster property exists, run the block
if (cluster && cluster.isMaster) {
  try {
    console.log(`Master process ${process.pid} is running`);
    // Fork a node process for each CPU available
    for (let i = 0; i < numCPUs; i++) {
      console.log(
        `Creating a worker process for each CPU available - CPU ${i + 1}`
      );
      cluster.fork();
    }
    // On exit, log the worker PID that died
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker process with PID ${worker.process.pid} died`);
    });
    // On disconnect, log the worker PID that died
    cluster.on("disconnect", (worker, code, signal) => {
      console.log(`Worker process with PID ${worker.process.pid} disconnected`);
    });
  } catch (error) {
    console.log(
      `An error has occurred during worker process creation - error: ${error}`
    );
    process.on("SIGTERM", () => {
      console.info("SIGTERM signal received.");
      console.log("Closing express server.");
      process.exit(143);
    });

    process.on("SIGKILL", () => {
      console.info("SIGKILL signal received.");
      console.log("Closing express server.");
      process.exit(128);
    });
  }
} else {
  // Log the node process PID's and start express
  console.log(`Worker process with PID ${process.pid} started`);
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}

module.exports = app;
