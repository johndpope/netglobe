/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var whois = require('whois');
whois.lookup('173.79.149.7', function(err,data) {
    var Whois = data.split("\n");
    var NetRange = Whois[12];
    var NetName = Whois[14];
    var Organization = Whois[19];
    var OrgName = Whois[26];
    console.log(Whois);
});