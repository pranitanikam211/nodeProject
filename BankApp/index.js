const readline = require("readline");
const fs = require("fs");
const os = require("os");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(
  `Welcome To Lena Dena Bank ,Please select one of the option From the list ${os.EOL} 
1 - Open Account ,2 - Close Account , 3- Deposit Money ,4- WithDraw Money
`,
  function (input) {
    switch (Number(input)) {
      case 1:
        createAccount();

        break;
      case 2:
        deleteAccount();
        break;
      case 3:
        depositMoney();
        break;
      case 4:
        WithdrawMoney();
      default:
        break;
    }
  }
);

function depositMoney() {
  rl.question(`What's your addhar Id? ${os.EOL}`, (addharId) => {
    // we have to check whether this aadhar id exists or not
    fs.stat(`accounts/${addharId}.account`, function (err, data) {
      if (err != null) {
        console.log("Account not found ,please re enter the aadhar id");
        depositMoney();
        return;
      }

      rl.question(
        `How much amount you want to deposit?  ${os.EOL}`,
        (amount) => {
          fs.appendFile(
            `accounts/${addharId}.account`,
            `${os.EOL} Amount:${amount}`,
            function (err, data) {
              if (err != null) {
                console.log(err);
                rl.close();
                return;
              }
              console.log("Account credited Successfully in your account");
              rl.close();
            }
          );

          // we will create a file
        }
      );
    });

    //
  });
}

function WithdrawMoney() {
  rl.question(`What's your Aadhar ID? ${os.EOL}`, (aadharId) => {
    // Check whether this Aadhar ID exists or not
    fs.stat(`accounts/${aadharId}.account`, function (err, stats) {
      if (err != null) {
        console.log("Account not found, please re-enter the Aadhar ID.");
        WithdrawMoney(); // retry
        return;
      }

      rl.question(
        `How much amount do you want to withdraw? ${os.EOL}`,
        (amount) => {
          amount = parseFloat(amount);
          if (isNaN(amount) || amount <= 0) {
            console.log("Invalid amount, please enter a valid number.");
            WithdrawMoney(); // retry
            return;
          }

          fs.readFile(`accounts/${aadharId}.account`, "utf8", (err, data) => {
            if (err) {
              console.log("Error reading account file.");
              rl.close();
              return;
            }

            let balance = parseFloat(data.split("Amount:")[1]);
            if (isNaN(balance)) {
              console.log("Error parsing account balance.");
              rl.close();
              return;
            }

            if (balance < amount) {
              console.log("Insufficient funds.");
              rl.close();
              return;
            }

            balance -= amount;
            fs.writeFile(
              `accounts/${aadharId}.account`,
              `Amount:${balance}`,
              (err) => {
                if (err) {
                  console.log("Error updating account file.");
                  rl.close();
                  return;
                }

                console.log(
                  `Amount withdrawn successfully. New balance: ${balance}`
                );
                rl.close();
              }
            );
          });
        }
      );
    });
  });
}

// We will create a bank account
// We will ask for name ,we will ask for aadharid
// we will ask for how much money you want to deposit
// we will create a file for that user

function createAccount() {
  rl.question(`What's your name? ${os.EOL}`, (name) => {
    rl.question(
      `Please Provide your Aadhar Card Id ?  ${os.EOL}`,
      (aadharId) => {
        fs.writeFile(
          `accounts/${aadharId}.account`,
          `Name : ${name} Account OpeningDate :${new Date().toISOString()}`,
          function (err, data) {
            if (err != null) {
              console.log(err);
              rl.close();
              return;
            }
            console.log("Account created Successfully");
            rl.close();
          }
        );

        // we will create a file
      }
    );

    //
  });
}

function deleteAccount() {
  rl.question(
    `Enter the Aadhar Id related to your bank account? ${os.EOL}`,
    (aadharId) => {
      // we will search for the file name

      fs.unlink(`accounts/${aadharId}.account`, (err) => {
        if (err != null) {
          console.log("Acoount not found ,please renter the adhar id");
          deleteAccount();
          return;
        }
        console.log("Account closed ,thanks for doing business with us");
        rl.close();
      });

      //
    }
  );
}
