const express = require('express');
const fs = require('fs');
const app = express();

// fs.readFile('storage.json', (err, data) => {
//     if(err) throw err;
//     let reports = JSON.parse(data);
//     console.log(reports);
// });
// console.log('This is after the read call');

var reportapprove = [
    {username: 'rrr', time: 'timmeeee', report: 'reporttt', approve: true, index: null},
    {username: 'aaa', time: 'timmeeee1212', report: 'reporttt2', approve: true, index: null}
]
var reportpending =[
    {username: 'abc', time: 'timmeeee', report: 'reporttt', approve: false, index: null},
    {username: '123', time: 'timmeeee1212', report: 'reporttt2', approve: false, index: null}
]

// let data = JSON.stringify(reportpending, null, 2);
// fs.writeFile('reportpending.json', data, (err) => {
//     if(err) throw err
//     console.log("data is written");
// })



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});

app.post("/api/post", (req, res, next) => {
    let reports = [];
    fs.readFile('reportpending.json', (err, data) => {
        if(err) throw err;
        reports = JSON.parse(data);
        console.log(reports);
    });
    reports.push(req);

    let data = JSON.stringify(reports, null, 2);
    fs.writeFile('storage.json', data, (err) => {
    if(err) throw err
    console.log("data is written");
})

    console.log('This is after the read call');
})

app.use('/api/reportsapproved',(req, res, next) => {
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

app.use('/api/reportspending',(req, res, next) => {
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