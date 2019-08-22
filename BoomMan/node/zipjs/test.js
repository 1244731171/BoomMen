// let Zip = require("./jszip.min.js");
// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// let zip = new Zip();

// let xhr = new XMLHttpRequest();

// xhr.open('GET', './text.zip');

// xhr.responseType = 'arraybuffer';

// xhr.onreadystatechange = function () {

//     if (xhr.readyState == 4 && xhr.status == 200) {

//         var arrayBuffer = xhr.response;

//         if (arrayBuffer) {

//             var byteArray = new Uint8Array(arrayBuffer);

//             for (var i = 0; i < byteArray.byteLength; i++) {

//                 // do something

//             }
//         }

//     } else {

//         alert(xhr.statusText);

//     }

// };

// xhr.send();