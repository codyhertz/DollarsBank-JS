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
      choice = prompt("\nEnter Choice (1, 2 or 3):");

      switch(choice)
      {
        case "1":
          console.log("+-------------------------------+");
          console.log("| ENTER DETAILS FOR NEW ACCOUNT |");
          console.log("+-------------------------------+");
          name = prompt("Customer Name:");
          address = prompt("Customer Address:");
          number = prompt("Customer Contact Number:");
          id = prompt("User ID:");

          valid = false;
          password = "";
          do
          {
            password = prompt("Password:");
            valid = validPassword(password);

            if(!valid)
            {
              console.log("Your password is invalid. Please enter a new one.");
            }
          }while(!valid);

          valid = false;
          do
          {
            initialDeposit = prompt("Initial Deposit:");
            valid = !isNaN(initialDeposit);

            if(!valid)
            {
              console.log("Must be a number!");
            }
          }while(!valid);

          atm.addUser(name, address, number, id, password, initialDeposit.valueOf());
          break;

        case "2":
          valid = false;
          do
          {
            console.log("+---------------------+");
            console.log("| ENTER Login Details |");
            console.log("+---------------------+");
            id = prompt("User ID:");
            password = prompt("Password:");
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

    }

  }while(!exit);


}
