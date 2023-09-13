const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 8080, // Correct the port number to your MySQL server's port
  user: 'root',
  password: '',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  start();
});

const start = () => {
  inquirer
    .prompt({
      type: 'list',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a Role',
        'Add an Employee',
        'Update an employee role',
        'Exit',
      ],
      message: 'Select an option:',
      name: 'option',
    })
    .then((result) => {
      console.log('You chose: ' + result.option);

      switch (result.option) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployee();
          break;
        case 'Exit':
          exit();
          break;
        default:
          quit();
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: 'input',
      message: 'What is the department name?',
      name: 'deptName',
    })
    .then((answer) => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [answer.deptName],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the role name?',
        name: 'roleName',
      },
      {
        type: 'input',
        message: 'What is the role salary?',
        name: 'salaryTotal',
      },
      {
        type: 'input',
        message: 'What is the dept id?',
        name: 'deptID',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.roleName, answer.salaryTotal, answer.deptID],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the name of the employee?',
        name: 'employeeFirstName',
      },
      {
        type: 'input',
        message: 'What is the last name of the employee?',
        name: 'employeeLastName',
      },
      {
        type: 'input',
        message: 'What is the employee role id?',
        name: 'roleId',
      },
      {
        type: 'input',
        message: 'What is the manager id?',
        name: 'managerId',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [
          answer.employeeFirstName,
          answer.employeeLastName,
          answer.roleId,
          answer.managerId,
        ],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Which employee do you want to update?',
        name: 'updateEmployee',
      },
      {
        type: 'input',
        message: 'Please input the new role id:',
        name: 'updateRole',
      },
    ])
    .then((answer) => {
      connection.query(
        'UPDATE employee SET role_id=? WHERE first_name=?',
        [answer.updateRole, answer.updateEmployee],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

const viewDepartments = () => {
  let query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewRoles = () => {
  let query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewEmployees = () => {
  let query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const exit = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
      return;
    }
    console.log('MySQL connection closed');
    process.exit();
  });
};

const quit = () => {
  console.log('Thank you and goodby!');
  process.exit();
};
