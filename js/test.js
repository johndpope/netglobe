var netstat = require('node-netstat');
netstat({
    filter: {
    }
}, function (data) {
    console.log(data);
});