const mysql = require("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}
///connection to mysql
function getTasks() {
    const connection = getDatabaseConnection();
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM tasks", function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }///connection to mysql returns. asyncrenous code
            else {
                connection.end();
                return resolve(results);
            }
        });
    });
}

function updateTask(deleteTaskFromTable) {
    const connection = getDatabaseConnection();

    return new Promise(function (resolve, reject) {


        connection.query('UPDATE Tasks SET Completed = True WHERE TaskId = ?', deleteTaskFromTable, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });

    });

}




function saveTask(taskDescription) {
    const connection = getDatabaseConnection();

    return new Promise(function (resolve, reject) {

        const postData =
        {
            taskDescription: taskDescription,
            taskCompleted: false,
            userId: 1
        };
        connection.query('INSERT INTO tasks SET ?', postData, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);

            }

        });

    });

}



function deleteTask(deleteTaskFromTable) {
    const connection = getDatabaseConnection();

    return new Promise(function (resolve, reject) {

        
        connection.query('DELETE FROM tasks WHERE taskId = ?', deleteTaskFromTable, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end( function () {
                    return resolve(results);
                });
               

            }

        });

    });

}
module.exports = {
    getTasks,
    saveTask,
    deleteTask,
    updateTask
    
}




