const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
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

  let someMessage = {
    message: "you issued a delete rquest for ID:" + taskIdToBeCompleted
  };

  if (deleteTaskFromTable > 3) {
    response.status(404);
    someMessage = {
      message: "Task" + deleteTaskFromTable + "Does not exist"
    };
  }


  response.json(someMessage);
});

module.exports.handler = serverless(app);

