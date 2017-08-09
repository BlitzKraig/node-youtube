var youtube = require('../script.js');

youtube('https://www.youtube.com/watch?v= ????')
    .gif('0:05', '0:35', './file.gif')
    .then(function () {
        console.log("Done");
    }).catch(function (err) {
        console.log("err : ", err)
    });


// example with size and fps

youtube('https://www.youtube.com/watch?v= ????')
    .gif('0:05', '0:35', './file.gif', {size: '600x300', fps: 8})
    .then(function () {
        console.log("Done");
    }).catch(function (err) {
        console.log("err : ", err)
    });