const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./database/db").mongoConnect;

const tasksRoutes = require("./routes/tasks");

const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const app = express();

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use("/api/v1/tasks", tasksRoutes);
app.use(notFound);

app.use(errorHandler);

mongoConnect(() => {
  app.listen(process.env.PORT || 3000);
});
