const express = require("express");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const bodyParser = require("body-parser");
const apicache = require('apicache');
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const port = process.env.PORT || 5000;
const cache = apicache.middleware;

app.use(bodyParser.json());
app.use(cache("2 minutes"));
app.use('/api/v1/workouts', v1WorkoutRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
  V1SwaggerDocs(app, port);
})