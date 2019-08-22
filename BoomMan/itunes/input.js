

let readlineSync = require("readline-sync");
let i = () => {
    let str = readlineSync.question("need output:");
    if (str == "1") {
        str = "pass";
    } else {
        str = "error";
    }
    return str
}
// readlineSync.close();
console.log(i());