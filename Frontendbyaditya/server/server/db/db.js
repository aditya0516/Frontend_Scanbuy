const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const pool = mysql.createConnection({ // Change According to your connection
    host: 'localhost',
    user: 'root',
    password: 'aditya0516',
    database: 'book',
    multipleStatements:true
});

pool.connect((err) => {
    if (!err)
        console.log('Sucessfully connected to the database');
    else
        console.log('DB connection failed \n Error' + JSON.stringify(err, undefined, 2))
});

let bookdb = {};

bookdb.all = () => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM FRONT1`, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });

};
bookdb.one = () => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM FRONT1 WHERE IDENTIFIER=?`, [result.params.identifier], (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });

};

bookdb.add = (ti,k,i,pc,d,tt,a,il,identi) => {

    return new Promise((resolve, reject) => {
       //
       var sql=`INSERT INTO FRONT1 (totalItems,kind,id,pageCount,description1,title,authors,infoLink,identifier) VALUES (?)`;
       
        const todo =JSON.stringify[ti,k,i,pc,d,tt,a,il,identi];
       
       
        pool.query(sql ,todo, (err, result,fields) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log("SUCCESS");
            return resolve(result);
        });
      console.log(resolve);
    });

};
module.exports = bookdb;