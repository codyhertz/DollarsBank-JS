import { ATM } from './dollars_bank_atm.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const prompt = require('prompt-sync')({sigint: true});


function validPassword(password)
{
	let lowerCase = "abcdefghijklmnopqrstuvwxyz";
	let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let special = "!@#$%^&*()-+";

	let containsLowerCase = false;

	for(let i = 0; i < lowerCase.length; i++)
	{
		if(password.indexOf(lowerCase.charAt(i)) != -1)
		{
			containsLowerCase = true;
		}
	}

	if(!containsLowerCase)
	{
		return false;
	}

	let containsUpperCase = false;

	for(let i = 0; i < upperCase.length; i++)
	{
		if(password.indexOf(upperCase.charAt(i)) != -1)
		{
			containsUpperCase = true;
		}
	}

	if(!containsUpperCase)
	{
		return false;
	}

	let containsSpecial = false;

	for(let i = 0; i < special.length; i++)
	{
		if(password.indexOf(special.charAt(i)) != -1)
		{
			containsSpecial = true;
		}
	}

	if(!containsSpecial)
	{
		return false;
	}

	if(password.length < 8)
	{
		return false;
	}
	return true;
}


export function app()
{
  let atm = new ATM();
  let exit = false;
  let choice = 0;
  let name = "";
  let address = "";
  let number = "";
  let id = "";

  let valid = false;
  let password = "";
  let initialDeposit = 0;
  let amount = 0;

  do
  {
    if(atm.getCurrentUser() == null)
    {
      console.log("+---------------------------+");
      console.log("| DOLLARSBANK WELCOMES YOU! |");
      console.log("+---------------------------+");
      console.log("1. Create New Account");
      console.log("2. Login");
      console.log("3. Exit");
      choice = prompt("Enter Choice (1, 2 or 3): ");

      switch(choice)
      {
        case "1":
          console.log("\n+-------------------------------+");
          console.log("| ENTER DETAILS FOR NEW ACCOUNT |");
          console.log("+-------------------------------+");
          name = prompt("Customer Name: ");
          address = prompt("Customer Address: ");
          number = prompt("Customer Contact Number: ");
          id = prompt("User ID: ");

          valid = false;
          password = "";
          do
          {
            password = prompt("Password: ");
            valid = validPassword(password);

            if(!valid)
            {
              console.log("Your password is invalid. Please enter a new one.");
            }
          }while(!valid);

          valid = false;
          do
          {
            initialDeposit = prompt("Initial Deposit: ");
            valid = !isNaN(initialDeposit);

            if(!valid)
            {
              console.log("Must be a number!");
            }
          }while(!valid);

          atm.addUser(name, address, number, id, password, parseFloat(initialDeposit));
          break;

        case "2":
          valid = false;
          do
          {
            console.log("\n+---------------------+");
            console.log("| ENTER Login Details |");
            console.log("+---------------------+");
            id = prompt("User ID: ");
            password = prompt("Password: ");
            valid = atm.login(id, password);

            if(!valid)
            {
              console.log("Invalid Credentials. Try Again!");
            }

          }while(!valid);
          break;
        case "3":
						exit = true;
						break;
      }
    }
    else
    {
      do
				{
					console.log("\n+---------------------+");
					console.log("| Welcome Customer!!! |");
					console.log("+---------------------+");
					console.log("1. Deposit Amount Checking");
					console.log("2. Deposit Amount Savings");
					console.log("3. Withdraw Amount Checking");
					console.log("4. Withdraw Amount Savings");
					console.log("5. Transfer Between Accounts");
					console.log("6. View 5 Recent Transactions");
					console.log("7. Display Customer Information");
					console.log("8. Sign Out");

					choice = prompt("Enter Choice (1, 2, 3, 4, 5, 6, 7, or 8): ");

					switch(choice)
					{
						case "1":
							console.log("\n+------------------+");
							console.log("| Deposit Checking |");
							console.log("+------------------+");
							amount = prompt("Enter Amount: ");
							atm.depositUserChecking(parseFloat(amount));
							break;
						case "2":
							console.log("\n+-----------------+");
							console.log("| Deposit Savings |");
							console.log("+-----------------+");
							amount = prompt("Enter Amount: ");
							atm.depositUserSavings(parseFloat(amount));
							break;
						case "3":
							console.log("\n+-------------------+");
							console.log("| Withdraw Checking |");
							console.log("+-------------------+");
							amount = prompt("Enter Amount: ");
							atm.withdrawlUserChecking(parseFloat(amount));
							break;
						case "4":
							console.log("\n+------------------+");
							console.log("| Withdraw Savings |");
							console.log("+------------------+");
							amount = prompt("Enter Amount: ");
							atm.withdrawlUserSavings(parseFloat(amount));
							break;
						case "5":
							console.log("\n+----------------+");
							console.log("| Transfer Money |");
							console.log("+----------------+");
							console.log("1. Checking to Savings");
							console.log("2. Savings to Checking");

							choice = prompt("Enter Choice (1 or 2): ");

							if(choice == "1")
							{
								amount = prompt("Enter Amount: ");
								atm.userTransfer(true, parseFloat(amount));
							}
							else if(choice == "2")
							{
								amount = prompt("Enter Amount: ");
								atm.userTransfer(false, parseFloat(amount));
							}
							break;
						case "6":
							console.log("\n+-----------------------+");
							console.log("| 5 Recent Transactions |");
							console.log("+-----------------------+");
							atm.checkUserTransactions(atm.getCurrentUser());
							break;
						case "7":
							console.log("\n+------------------------------+");
							console.log("| Display Customer Information |");
							console.log("+------------------------------+");
							console.log(atm.getCurrentUser().printCustomer());
							break;
						case "8":
							atm.logout();
							break;
					}
				}while(choice != 8);
    }

  }while(!exit);


}
