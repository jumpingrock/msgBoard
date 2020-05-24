const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
var sha256 = require('js-sha256').sha256;

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});

app.post("/api/submitreport", (req, res, next) => {
    let report = req.body;
    let reports = [];
    fs.readFile('reportspending.json', (err, data) => {
        if(err) throw err;
        this.reports = JSON.parse(data);

        console.log(reports);
        report.indexNumber = this.reports.length;
        this.reports.push(report);

        data = JSON.stringify(this.reports, null, 2);
        fs.writeFile('reportspending.json', data, (err) => {
            if(err) throw err
        })
        res.status(201).json({
        message: 'Report added successfully!'
        });
    });
})
app.put("/api/approvereport", (req, res, next) => {
    let report = req.body;
    let reports = [];
    let reportNum = report.indexNumber
    
    fs.readFile('reportsapprove.json', (err, data) => {
        if(err) throw err;
        this.reports = JSON.parse(data);

        console.log(reports);
        report.indexNumber = this.reports.length;
        report.approve = true;
        this.reports.push(report);

        data = JSON.stringify(this.reports, null, 2);
        fs.writeFile('reportsapprove.json', data, (err) => {
            if(err) throw err
        })
        res.status(201).json({
        message: 'Report added successfully!'
        });
    });
})

app.delete("/api/deletereport/:id", (req, res, next) => {
    console.log(req.params.id);
    let reportNum = req.params.id
    let reports = [];
    fs.readFile('reportspending.json', (err, data) => {
        if(err) throw err;
        this.reports = JSON.parse(data);

        console.log(reports);
        this.reports.splice(reportNum,1);

        data = JSON.stringify(this.reports, null, 2);
        fs.writeFile('reportspending.json', data, (err) => {
            if(err) throw err
        })
        res.status(201).json({
        message: 'Report deleted successfully!'
        });
    });
})

app.get('/api/reportsapproved',(req, res, next) => {
    var reportsSent;
    fs.readFile('reportsapprove.json', (err, data) => {
        if(err) throw err;
        reportsSent = JSON.parse(data);
        
        res.status(200).json({
            message: 'Post fetch successful!',
            reports: reportsSent
        });
    });
    
});

app.get('/api/reportspending',(req, res, next) => {
    var reportsSent;
    fs.readFile('reportspending.json', (err, data) => {
        if(err) throw err;
        
        reportsSent = JSON.parse(data);
        
        res.status(200).json({
            message: 'Post fetch successful!',
            reports: reportsSent
        });
    });

});

app.post('/api/login',(req, res, next) => {
    var user= req.body;
    let users = [];
    fs.readFile('user.json', (err, data) => {
        if(err) throw err;
        users = JSON.parse(data);
        // consolß
        for (let i=0; i<users.length; i++) {

            if(users[i].username === user.username){
                if(users[i].password === user.password){
                    
                    res.status(200).json({
                        message: 'Post fetch successful!',
                        logonInfo: user
                });
                }
                
            }
        }
    });
    // res.status(501).json({
    //         message: 'Login error',
    //         logonInfo: null
    // });
});

app.post("/api/signup", (req, res, next) => {
    let user = req.body;
    let users = [];
    fs.readFile('user.json', (err, data) => {
        if(err) throw err;
        users = JSON.parse(data);
        for (let i=0; i<users.length; i++) {
            if(user.username === users[i].username){
                res.status(502).json({
                    message: 'User already exist!'
                    });
            }
        }
        users.push(user);

        data = JSON.stringify(users, null, 2);
        fs.writeFile('user.json', data, (err) => {
            if(err) throw err
        })
        res.status(201).json({
        message: 'User added successfully!'
        });
    });
})



module.exports = app;