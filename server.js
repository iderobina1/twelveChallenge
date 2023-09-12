const inquirer = require ('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection ({

host: 'localhost',
port: 8808,
user: 'root',
password: ''
database: 'employee_db'
});

connection.connect((err)) => {
if(err) {
    console.log('error connecting to mysql', err)
    return;
}
console.log('connected to db')
}

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


function start() {
    inquirer
.prompt({
type: 'list',
choices: [
'Add a department',
'Add a Role',
'Add an Employee',
'Update an employee role',
'Exit',
],
message: '',
name: 'option'
})

.then ((result) => {
    console.log('You chose:' + result.option);

   switch(result.option) {
    case 'Add a departmtent':
        addDepartment();
        break;
    case: 'Add an employee';

   } 
})


}






// // Don't forget to close the connection when done
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing MySQL connection:', err);
//     return;
//   }
//   console.log('MySQL connection closed');
// });
