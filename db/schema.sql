DROP DATABASE IF EXISTS employee_info;
CREATE DATABASE employee_info;
USE DATABASE employee_info;

CREATE TABLE department (
id: INT
name: VARCHAR(30) NOT NULL,
PIMARY KEY(id)   
);


CREATE TABLE role (
id: INT 
title: VARCHAR(30) NOT NULL,
salary; DECIMAL NOT NULL,
department_id; INT NOT NULL,
PIMARY KEY(id)
);


CREATE TABLE employee (
id: INT PRIMARY KEY,
first_name: VARCHAR(30) NOT NULL,
last_name: VARCHAR(30) NOT NULL,
role_id; INT NOT NULL,
manager_id: INT,
PIMARY KEY(id)
);
