const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const databaseService = require('./databaseservice');

app.get('/tasks', function (request, response) {

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


app.post('/tasks', function (request, response) {

  console.log("you sent a task saying:" + request.body.taskDescription );

  response.json({ message: "you did a post" });

})




app.delete('/tasks/:taskId', function (request, response) {
  const taskIdToBeCompleted = request.params.taskId;

  let someMessage = {
    message: "you issued a delete rquest for ID:" + taskIdToBeCompleted
  };

  if (taskIdToBeCompleted > 3) {
    response.status(404);
    someMessage = {
      message: "Task" + taskIdToBeCompleted + "Does not exist"
    };
  }


  response.json(someMessage);
});

module.exports.handler = serverless(app);

