// "use strict";
// const mysql = require('mysql');

// module.exports = async (req) => {
//   let queryResult = {};

//   if (process.env.MYSQL_HOST) {

//     let config = {
//       host: process.env.MYSQL_HOST,
//       user: process.env.MYSQL_USER,
//       password: process.env.MYSQL_PASS,
//       database: process.env.MYSQL_DB,
//       port: 3306,
//       ssl: true
//     };

//     const conn = new mysql.createConnection(config);

//     conn.connect(
//       (err) => {
//         if (err) {
//           console.log("!!! Cannot connect !!! Error:");
//           throw err;
//         }
//         else {
//           console.log("Connection established.");
//           conn.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) {
//             if (err) throw err;
//             console.log('Dropped inventory table if existed.');
//           })
//           conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);',
//             function (err, results, fields) {
//               if (err) throw err;
//               console.log('Created inventory table.');
//             })
//           conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['banana', 150],
//             function (err, results, fields) {
//               if (err) throw err;
//               else console.log('Inserted ' + results.affectedRows + ' row(s).');
//             })
//           conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['orange', 154],
//             function (err, results, fields) {
//               if (err) throw err;
//               console.log('Inserted ' + results.affectedRows + ' row(s).');
//             })
//           conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['apple', 100],
//             function (err, results, fields) {
//               if (err) throw err;
//               console.log('Inserted ' + results.affectedRows + ' row(s).');
//             })

//           conn.query('SELECT * FROM inventory',
//             (err, results, fields) => {
//               if (err) throw err;
//               else console.log('Selected ' + results.length + ' row(s).');
//               queryResult = results;
//               for (let i = 0; i < results.length; i++) {
//                 console.log('Row: ' + JSON.stringify(results[i]));
//               }
//               console.log('Done.');
//             })

//           conn.end(function (err) {
//             if (err) throw err;
//             else console.log('Done.')
//           });
//         }
//       });
//   } else {
//     queryResult = `Missing EnvVars for MySQL Connection`;
//   }

//   return queryResult;
// };