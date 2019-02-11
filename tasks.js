const serverless = require('serverless-http');
const express = require('express');
const app = express();

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

app.delete('/tasks', function (request, response){
  const someMessage= {
    message: "you issued a delete rquest"
  };

  response.json(someMessage);
});

module.exports.handler = serverless(app);

