import { Customer } from './src/customer_account.js';

export class ATM
{
  constructor()
  {
    this.users = new Array();
    this.currentUser = null;
  }

  addUser(name, address, number, userId, password, initialDeposit)
  {
    let cust = new Customer(name, address, number, userId, password, initialDeposit);
    this.currentUser = cust;
    this.users.push(cust);
  }

  login(userId, password)
  {
    for(int i = 0; i < this.users.length; i++)
		{
			if(this.users[i].getUserId() == userId)
			{
				correctPassword = password == this.users[i].getPassword();

				if(correctPassword)
				{
					this.setCurrentUser(users[i]);
				}

				return correctPassword;
			}
		}
		return false;
  }

  logout()
  {
    this.currentUser = null;
  }

  getCurrentUser()
  {
    return this.currentUser;
  }

  setCurrentUser(currentUser)
  {
    this.currentUser = currentUser;
  }

  checkUserBalance()
  {
    if(this.currentUser != null)
    {
      this.currentUser.checkBalance();
    }
  }

  checkUserTransactions()
  {
    if(this.currentUser != null)
    {
      this.currentUser.getTransactions();
    }
  }

  depositUserChecking(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.depositChecking(amount);
    }
  }

  depositUserSavings(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.depositSavings(amount);
    }
  }

  withdrawlUserChecking(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.withdrawlUserChecking(amount);
    }
  }

  withdrawlUserSavings(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.withdrawlUserSavings(amount);
    }
  }

  userTransfer(checkingToSavings, amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.transfer(checkingToSavings, amount);
    }
  }
}
