const fs = require("fs");
const os = require("os");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// fs.writeFile("data.txt", "hello:pranit", function (err, data) {
//   if (err != null) {
//     console.log(err);
//   }
//   console.log("file is created");
// });
// for new line
/*{fs.appendFile("data.account", "hey sri" + os.EOL, function (err, data) {
  //   console.log(data);
  console.log("append");
});}*/
// stat is used to find a file
fs.stat("data.account", function (err, data) {
  if (err != null) {
    console.log("file not found");
  }
  rl.question(`whats your filename ${os.EOL}`, (filename) => {
    fs.unlink(`${filename}.account`, function (err, data) {
      if (err != null) {
        console.log(err);
      }
      console.log("account is deleted");
    });
  });
});
