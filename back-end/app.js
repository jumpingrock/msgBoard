const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

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
        console.log(reportsSent);
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
        console.log(reportsSent);
        res.status(200).json({
            message: 'Post fetch successful!',
            reports: reportsSent
        });
    });

});



module.exports = app;