import { Customer } from './src/customer_account.js';

export class ATM
{
  constructor()
  {
    this.users = new Array();
    this.currentUser = null;
  }

  addUser(cust)
  {
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
}
