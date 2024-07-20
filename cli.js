const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

let obj = {
  obj1: { id: 1, name: "hey siri" },
  obj2: { id: 2, name: "harry" },
};
let objArry = Object.values(obj);
let mylibrary = (book) => {
  let name = argv.name;
  let id = argv.id;
  let findObj = objArry.find((ele) => ele.id == id);
  let bookName = findObj.name;
  console.log(`id of ${id} have book ${bookName} allotted to ${name}`);
};

mylibrary(objArry);
