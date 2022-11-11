const { Connection, Request } = require("tedious");
const express = require("express");
const prompt = require("prompt-sync")();
const nodemssql = require('node-mssql');
const app = express();





// Create connection to database
const config = {
  
    authentication: {
      type: "azure-active-directory-password",
      options: {
        userName: "attodeep.sonawane.btech2019@sitpune.edu.in", // update me
        password: "Akash@2001", // update me
        tenantId: '23035d1f-133c-44b5-b2ad-b3aef17baaa1'
      },
      
    },
    server: "cloudpharmaserver.database.windows.net", // update me
    options: {
      database: "CloudPharmaDB", //update me
      encrypt: true,
    },
  };

// SignUp
const signup = () => {
    const connection = new Connection(config);
  
    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", (err) => {
      if (err) {
        console.error(err.message);
        signupError = "Connection Error!";
        s = false;
      } else {
        registerDatabase();
      }
    });
  
    connection.connect();
  
    function registerDatabase() {
      
      console.log("in function regdb");
        
        var fname = prompt('Enter fname: ');
        var lname = prompt('Enter lname: ');
        var mno = prompt('Enter mno: ');
        var city = prompt('Enter city: ');
        var zcode = prompt('Enter zcode: ');
        var gender = prompt('Enter gender: ');
        var custID =Math.floor( Math.random() * (10 - 1) + 1);
        
        console.log("Reading rows from the Table...");
        // Read all rows from table
        const request = new Request(
          `insert into [dbo].[login] (Firstname,Lastname,PhoneNo,City,Zipcode,Gender,CustomerID) values('${fname}','${lname}',${mno},'${city}',${zcode},'${gender}',${custID})   `,
          (err, rowCount) => {
            if (err) {
              // console.error(rowCount-1, err.message);
              signupError = "username/email already exist!";
            } else {
              console.log(`${rowCount - 1} row(s) returned`);
            }
          }
        );
  
        connection.execSql(request);
    }
    console.log("signup hua!");
  };

// Login
const login = (mno) => {
    const connection = new Connection(config);
  
    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", (err) => {
      if (err) {
        console.error(err.message);
        loginError = err;
      } else {
        loginDatabase(mno);
      }
    });
  
    connection.connect();
  
    function loginDatabase(mno) {

      // var mno =prompt('Enter mno: ');
      // console.log(mno);
      console.log("Reading rows from the Table...");
  
      // Read all rows from table
      const request = new Request(
        `select [dbo].[login].[Firstname] from [dbo].[login] where PhoneNo = '${mno}' `,
        function (err, result) {
          if (err) {
            console.error(err.message);
            loginError = err;
          }
  
          if (result > 0) {
            console.log(result);
            console.log("redirecting....");
            // redirect link
            r=true;
          } else {
            console.log("User Does not exist");
            loginError = "User Does not exist";
            r = false;
          }
        }
      );
      connection.execSql(request);
    }
  };
// Stocks
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
    var prodname =prompt('Enter prodname: ');
      console.log(prodname);
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `select * from [dbo].[stockdb] where ItemName = '${prodname}'    `,
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
      `select * from [dbo].[employee] `,
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
// Purchase History
const History = (prodname) => {
  const connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on("connect", (err) => {
    if (err) {
      console.error(err.message);
      loginError = err;
    } else {
      HistoryDatabase();
    }
  });

  connection.connect();
  function HistoryDatabase() {
    var prodname =prompt('Enter prodname: ');
      console.log(prodname);
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `select * from [dbo].[payment] where CustomerID = '${prodname}'    `,
      function (err, result) {
        if (err) {
          console.error(err.message);
          stockError = err;
        }

        if (result > 0) {
          console.log("History Exist");
        }else {
          console.log("History not exist");
          stockError = "History not exist";
         
        }
      }
    );
    connection.execSql(request);
  }
};






// Main

signup();
// login();
// stocks();
// Employee();
// History();   // needs table
