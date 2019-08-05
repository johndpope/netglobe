/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var geoip = require('geoip-lite');
var netstat = require('node-netstat');
var whois = require('whois');
var fs = require("fs");
const allResults = [];
const finalResults = [];


netstat({
    filter: {
        state: "ESTABLISHED"
    }
}, function (data) {
    allResults.push(data);
    for (i = 0; i < allResults.length; i++) {
        var matchLoopback = allResults[i].remote.address.match("127.0.0.1");
        var matchLocalNetwork = allResults[i].remote.address.match("192.168");
        if (matchLoopback === null && matchLocalNetwork === null) {
            IP = allResults[i].remote.address;
            Port = allResults[i].remote.port;
            geo = geoip.lookup(IP);
            console.log("Looking up IP: " + IP);
            finalResults.push([IP, Port, geo]);
        } else {

        }
        //var geo = geoip.lookup(ip);  
        //finalResults.push([allResults[i].remote.address, geo]);
    }
    var JSONreturn = JSON.stringify(finalResults);
    fs.writeFile("../connections.json", JSONreturn, (err) => {
       if(err) console.log(err);
       console.log("Successfully wrote to connections.json");
    });
});