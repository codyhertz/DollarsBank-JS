import { Customer } from './customer_account.js';

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
    for(let i = 0; i < this.users.length; i++)
		{
			if(this.users[i].getUserId() == userId)
			{
				let correctPassword = password == this.users[i].getPassword();

				if(correctPassword)
				{
					this.setCurrentUser(this.users[i]);
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
      this.currentUser.withdrawlChecking(amount);
    }
  }

  withdrawlUserSavings(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.withdrawlSavings(amount);
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
