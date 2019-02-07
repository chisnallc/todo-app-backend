const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (request, response) {



  const someTasks = [
    {
      id: 1,
      description: 'Go Shopping',
      completed: false
    },
    {
      id: 2,
      description: 'Cook the Food',
      Completed: false
    },
    {
      id: 3,
      description: 'Eat The Dinner',
      completed: false
    }
  ];

  response.json(someTasks);

})

module.exports.handler = serverless(app);

