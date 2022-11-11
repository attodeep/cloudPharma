const { Connection, Request } = require("tedious");
const express = require("express");
const prompt = require("prompt-sync")();

// Create connection to database
const config = {
    authentication: {
      options: {
        userName: "bossguy", // update me
        password: "6AdMCa44dQcHSeA", // update me
      },
      type: "default",
    },
    server: "pbl2server.database.windows.net", // update me
    options: {
      database: "pbl2", //update me
      encrypt: true,
    },
  };
  const stocks = (prodname) => {
    const connection = new Connection(config);
  
    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", (err) => {
      if (err) {
        console.error(err.message);
        loginError = err;
      } else {
        stockDatabase();
      }
    });
  
    connection.connect();
    function stockDatabase() {
      console.log("Reading rows from the Table...");
  
      // Read all rows from table
      const request = new Request(
        `select * from [dbo].[stocks]`,
        function (err, result) {
          if (err) {
            console.error(err.message);
            stockError = err;
          }
  
          if (result > 0) {
            console.log("Product Exist");
          }else {
            console.log("Product not exist");
            stockError = "Product not exist";
           
          }
        }
      );
      connection.execSql(request);
    }
  };
  // Employee Data
  const Employee = (prodname) => {
    const connection = new Connection(config);
  
    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", (err) => {
      if (err) {
        console.error(err.message);
        loginError = err;
      } else {
        EmployeeDatabase();
      }
    });
  
    connection.connect();
    function EmployeeDatabase() {
      console.log("Reading rows from the Table...");
  
      // Read all rows from table
      const request = new Request(
        `select * from [dbo].[employee] where EmpID = '${empid}'    `,
        function (err, result) {
          if (err) {
            console.error(err.message);
            stockError = err;
          }
  
          if (result > 0) {
            console.log("Employee Exist");
          }else {
            console.log("Employee not exist");
            stockError = "Employee not exist";
           
          }
        }
      );
      connection.execSql(request);
    }
  };