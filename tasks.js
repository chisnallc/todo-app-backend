const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (request, response) {

  const username = request.query.username;
  const dinner = request.query.tasks;

  const someJson = {
    message: "Hello" + username + dinner,
    dinnerList: [{
      id: 1,
      description: 'Go Shopping',
      completed: true
    },
    {
      id: 2,
      description: 'Cook the Food',
      Completed: false,
    },
    {
      id: 3,
      description: 'Eat The Dinner',
      completed: false
    },
    ]
  };

  response.json(someJson);

});

module.exports.handler = serverless(app);

