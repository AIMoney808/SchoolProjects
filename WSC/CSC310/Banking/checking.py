from account import Account
# checking account inherits the properties of Account


class Checking(Account):
    # super name, balance, and password for the Account class,
    # and add a daily limit to the checking account. With a default of $2500
    def __init__(self, name, balance, password, daily_limit=2500):
        super().__init__(name, balance, password)
        self.daily_limit = daily_limit
        self.daily_limit = 2500

    # function to change the daily amount you can withdraw
    def set_daily_limit(self):
        daily_limit = ""
        while not daily_limit.isnumeric and 100 < float(daily_limit) < 1_00_000:
            daily_limit = input("Set daily limit to (100-1,000,000): ")

        self.daily_limit = float(daily_limit)

    # shows info about the account
    def show_info(self):
        print("")
        print("     Account Type: Checking")
        print("     Name:", self.name)
        print("     Balance:", self.balance)
        print("     Password:", self.password)
        print("     Daily Limit:", self.daily_limit)
        print("")
