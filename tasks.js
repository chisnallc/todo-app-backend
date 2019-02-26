const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const databaseService = require("./databaseservice");

app.get("/tasks", function (request, response) {

  databaseService.getTasks()
    .then(function (results) {
      //we got tasks ok

      response.json(results);
    })
    .catch(function (error) {
      // something went wrong when getting task
      response.status(500);
      response.json(error);
    });
});


app.post("/tasks", function (request, response) {

  const taskDescription = request.body.taskDescription;
  databaseService.saveTask(taskDescription).then(function (results) {
    response.json(results);
  })
    .catch(function (error) {
      response.status(500);
      response.json(error);
    });


})




app.delete("/tasks/:taskId", function (request, response) {
  const deleteTaskFromTable = request.params.taskId;

   databaseService.deleteTask(deleteTaskFromTable).then(function (results) {
    response.json(results);
  })
    .catch(function (error) {
      response.status(500);
      response.json(error);
    });
});
module.exports.handler = serverless(app);

