from saving import Saving
from checking import Checking

if __name__ == "__main__":
    # create new account variable
    new_account = None
    # Get name
    name = input("What is your name: ")

    # Ask for account type in loop until a correct option is chosen
    account_type = ""
    while account_type not in ["c", "s"]:
        account_type = input(f"Hello {name}, do you want a Checking (C) or Savings (S) account: ").lower()

    # Ask for balance in loop until balance is a positive number
    balance = "-1"
    while not balance.isnumeric() and not float(balance) > 0:
        balance = input("What is your accounts balance (number): ")

    # Ask for password until it is at least 4 characters long
    password = ""
    while len(password) < 4:
        password = input("Give a password of at least 4 characters: ")

    # Create checking, or savings account depending on users choice
    if account_type == "s":
        new_account = Saving(name, float(balance), password)
    if account_type == "c":
        new_account = Checking(name, float(balance), password)

    # withdrawing money, depositing money, and show info
    print("$ After withdrawing half the balance:", new_account.withdraw(float(balance)//2, password))
    print("$ After depositing 1000:", new_account.deposit(1000, password))
    new_account.show()
