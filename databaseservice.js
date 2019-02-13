const mysql = require("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}

function getTasks() {
    const connection = getDatabaseConnection();
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM tasks", function (error, results, fields) {
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

        const post = { id: 1, title: 'Hello MySQL' };
        connection.query('INSERT INTO tasks SET ?', post, function (error, results, fields) {
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

module.exports = {
    getTasks,
    saveTask
}




