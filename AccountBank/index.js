const fs = require("fs");
const os = require("os");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(
  `choose 1.create Account 2.delete Account 3.deposite account 4.withdraw account ${os.EOL}`,
  function (input) {
    switch (Number(input)) {
      case 1:
        createAccount();
        break;
      case 2:
        deleteAccount();
        break;
      case 3:
        depositAccount();
        break;
      case 4:
        withdrawAccount();
        break;
    }
  }
);
function createAccount() {
  rl.question(`what is your name ${os.EOL}`, (name) => {
    rl.question(`whats your id ${os.EOL}`, (idAdhar) => {
      fs.writeFile(
        `Account/${name}.account`,
        `name:${name}${os.EOL}accountNo:${idAdhar}${
          os.EOL
        }creationDate:${new Date().toISOString()}${os.EOL}Balance:0${os.EOL}`,
        function (err, data) {
          if (err != null) {
            console.log(err);
          }
          console.log("account created successfully");
          rl.close();
        }
      );
    });
  });
}
function deleteAccount() {
  rl.question(`what is your name ${os.EOL}`, (name) => {
    rl.question(`whats your id ${os.EOL}`, (idAdhar) => {
      fs.unlink(
        `Account/${name}.account`,

        function (err, data) {
          if (err != null) {
            console.log("Acoount not found ,please renter the name");
            deleteAccount();
            return;
          }
          console.log("account deleted successfully");
          rl.close();
        }
      );
    });
  });
}
function depositAccount() {
  rl.question(`What is your name?${os.EOL}`, (name) => {
    rl.question(`What is your Aadhar ID?${os.EOL}`, (idAdhar) => {
      const accountPath = `Account/${name}.account`;

      fs.readFile(accountPath, "utf8", (err, data) => {
        if (err) {
          console.log("Account not found, please re-enter the Aadhar ID.");
          rl.close();
          return;
        }

        let currentBalance = 0;
        const balanceMatch = data.match(/Balance:(\d+(\.\d+)?)/);
        if (balanceMatch) {
          currentBalance = parseFloat(balanceMatch[1]);
        } else {
          console.log("Balance not found in the account file.");
          rl.close();
          return;
        }

        rl.question(
          `How much amount do you want to deposit?${os.EOL}`,
          (amount) => {
            const depositAmount = parseFloat(amount);

            if (isNaN(depositAmount) || depositAmount <= 0) {
              console.log("Invalid deposit amount.");
              rl.close();
              return;
            }

            const newBalance = currentBalance + depositAmount;

            const updatedData = data.replace(
              /Balance:\d+(\.\d+)?/,
              `Balance:${newBalance}`
            );

            fs.writeFile(accountPath, updatedData, "utf8", (err) => {
              if (err) {
                console.log(err);
                rl.close();
                return;
              }

              console.log("Account credited successfully.");
              rl.close();
            });
          }
        );
      });
    });
  });
}
function withdrawAccount() {
  rl.question(`What is your name?${os.EOL}`, (name) => {
    rl.question(`What is your Aadhar ID?${os.EOL}`, (idAdhar) => {
      const accountPath = `Account/${name}.account`;

      fs.readFile(accountPath, "utf8", (err, data) => {
        if (err) {
          console.log("Account not found, please re-enter the Aadhar ID.");
          rl.close();
          return;
        }

        let currentBalance = 0;
        const balanceMatch = data.match(/Balance:(\d+(\.\d+)?)/);
        if (balanceMatch) {
          currentBalance = parseFloat(balanceMatch[1]);
        } else {
          console.log("Balance not found in the account file.");
          rl.close();
          return;
        }

        rl.question(
          `How much amount do you want to withdraw?${os.EOL}`,
          (amount) => {
            const withdrawAmount = parseFloat(amount);

            if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
              console.log("Invalid withdrawal amount.");
              rl.close();
              return;
            }

            if (withdrawAmount > currentBalance) {
              console.log("Insufficient funds.");
              rl.close();
              return;
            }

            const newBalance = currentBalance - withdrawAmount;

            const updatedData = data.replace(
              /Balance:\d+(\.\d+)?/,
              `Balance:${newBalance}`
            );

            fs.writeFile(accountPath, updatedData, "utf8", (err) => {
              if (err) {
                console.log(err);
                rl.close();
                return;
              }

              console.log("Amount withdrawn successfully.");
              rl.close();
            });
          }
        );
      });
    });
  });
}
