const express = require ('express');
const mysql = require('mysql');

const router = express.Router();

router.get('/router', (req, res) =>{
    console.log('We are in the router');
    res.end();
});

function connection(){
    return mysql.createConnection({
        host: 'ec2-75-101-138-165.compute-1.amazonaws.com',
        user: 'clcselimowewdn',
        password: '9425af04e97aa4b064f2f09070bcd371f539a2658ab0aa34b1a6ce01b819ef8b',
        database: 'deajfqv663lsc2'
    });
}


router.post('/searchIFSC', (req, res) =>{
    const getconnection = connection();
    IFSC=req.body.IFSC;
    const query = "Select * from `branches` WHERE `ifsc` = '"+IFSC+"'";

    getconnection.query(query, (err, rows, fields) =>{
        if(err){
            res.send("Error: "+err);
            res.end();
            return;
        }
        console.table(rows);
        res.json(rows);

    });
});




router.post('/allBankName', (req, res) =>{
    const getconnection = connection();
    const query = "Select name from `banks` ORDER BY name";

    getconnection.query(query, (err, rows, fields) =>{
        if(err){
            res.send("Error: "+err);
            res.end();
            return;
        }
        console.table(rows);
        res.json(rows);

    });
});



router.post('/allStateName', (req, res) =>{

    const getconnection = connection();
     const query = "Select state_name from `states` ORDER BY state_name";

    getconnection.query(query, (err, rows, fields) =>{
        if(err){
            res.send("Error: "+err);
            res.end();
            return;
        }
        console.table(rows);
        res.json(rows);

    });
});


router.post('/getDist', (req, res) =>{
    var bankName = req.body.bankName;
    var state = req.body.state;

    console.log(state);
    const getconnection = connection();
    const query = "Select DISTINCT(district) from `branches` WHERE state = '"+state+"' AND bank_name = '"+bankName+"' ORDER BY district";

    getconnection.query(query, (err, rows, fields) =>{
        if(err){
            res.send("Error: "+err);
            res.end();
            return;
        }
        console.table(rows);
        res.json(rows);

    });
});


router.post('/getBranch', (req, res) =>{
    var state = req.body.state;
    var dist = req.body.dist;
    var bankName = req.body.bankName;

    console.log(state);
    const getconnection = connection();
    const query = "Select DISTINCT(branch) from `branches` WHERE `state` = '"+state+"' AND `district` ='"+dist+"' AND bank_name = '"+bankName+"'  ORDER BY branch";

    getconnection.query(query, (err, rows, fields) =>{
        if(err){
            res.send("Error: "+err);
            res.end();
            return;
        }
        console.table(rows);
        res.json(rows);

    });
});


router.post('/getresult', (req, res) =>{
    var state = req.body.state;
    var dist = req.body.dist;
    var bankName = req.body.bankName;
    var branch = req.body.branch;


    console.log(state);
    const getconnection = connection();
    const query = "Select * from `branches` WHERE `bank_name` = '"+bankName+"' AND `state` = '"+state+"' AND `district` = '"+dist+"' AND `branch` = '"+branch+"'";

    getconnection.query(query, (err, rows, fields) =>{
        if(err){
            res.send("Error: "+err);
            res.end();
            return;
        }
        console.table(rows);
        res.json(rows);

    });
});

module.exports = router;
