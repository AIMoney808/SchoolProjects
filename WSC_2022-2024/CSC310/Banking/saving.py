from account import Account
# savings account inherits the properties of Account


class Saving(Account):
    # super name, balance, and password for the Account class,
    # and add interest rate with a default value of 4.5%
    def __init__(self, name, balance, password, interest_rate=0.045):
        super().__init__(name, balance, password)
        self.interest_rate = interest_rate

    # Adds the interest to the bank account balance
    def add_interest(self):
        self.balance += self.balance * self.interest_rate

    # shows info about the account
    def show_info(self):
        print("")
        print("     Account Type: Savings")
        print("     Name:", self.name)
        print("     Balance:", self.balance)
        print("     Password:", self.password)
        print("     Interest Rate:", self.interest_rate)
        print("")
