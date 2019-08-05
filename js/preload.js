//k3vl4r
//preload netstat data into connections.json
var geoip = require('geoip-lite');
var whois = require('whois');
const { exec } = require('child_process');

const getIP = require('external-ip')();
var fs = require("fs");
const allResults = [];
const finalResults = [];
const mapResults = [];
const myMapResult = [];

console.log("Gathering local IP information...");

getIP((err, ip) => {
    if (err) {
        // every service in the list has failed
        throw err;
    }
    //console.log(ip);
    var myGeo = geoip.lookup(ip);
    var JSONMyGeo = JSON.stringify(myGeo);
    myMapResult.push({name: myGeo['city'] + "," + myGeo['region'] + "," + myGeo['country'], value: [myGeo['ll'][1], myGeo['ll'][0]]});
    fs.writeFile("myGeo.json", JSONMyGeo, (err) => {
        if (err)
            console.log(err);
    });
});

netstat({
    filter: {
    }
}, function (data) {
    allResults.push(data);
    for (i = 0; i < allResults.length; i++) {
        if (allResults[i].remote.address !== null) {
            var matchLoopback = allResults[i].remote.address.match("127.0.0.1");
            var matchLocalNetwork = allResults[i].remote.address.match("192.168");

            if (matchLoopback === null && matchLocalNetwork === null) {
                var alreadyLoaded = false;
                for (i2 = 0; i2 < finalResults.length; i2++) {
                    if (finalResults[i2][0] === allResults[i].remote.address) {
                        var alreadyLoaded = true;
                    }
                }
                if (alreadyLoaded === false) {
                    IP = allResults[i].remote.address;
                    Port = allResults[i].remote.port;
                    geo = geoip.lookup(IP);
                    //console.log("Looking up IP: " + IP);
                    finalResults.push([IP, Port, geo]);
                    if (geo['city'] !== "") {
                        mapResults.push({name: geo['city'] + "," + geo['region'] + "," + geo['country'], value: [geo['ll'][1], geo['ll'][0]], ip: IP, port: Port});
                    }
                }
            } else {

            }
        }
        //var geo = geoip.lookup(ip);  
        //finalResults.push([allResults[i].remote.address, geo]);
    }
    var JSONreturn = JSON.stringify(finalResults);
    var JSONMapReturn = JSON.stringify(mapResults);

    fs.writeFile("connections.json", JSONreturn, (err) => {
        if (err)
            console.log(err);

    });
    fs.writeFile("mapData.json", JSONMapReturn, (err) => {
        if (err)
            console.log(err);
    });
});
