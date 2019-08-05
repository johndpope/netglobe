/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var geoip = require('geoip-lite');
 
var ip = "104.25.6.12";
var geo = geoip.lookup(ip);
 
console.log(geo);