/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var netstat = require('node-netstat');
const allResults = [];
netstat({
    filter: {
        state: "ESTABLISHED"
    }
}, function (data) {
    allResults.push(data);
    //for(i=0;i<allResults.length;i++) {
    //    console.log(allResults[i].remote.address + ":" + allResults[i].remote.port);
    //}
});