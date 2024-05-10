name = input("Enter a product of 4 characters or more: ")
while len(name) <= 3:
    name = input("Error: Enter a product name of 4 characters or more: ")
print(name)

price = float(input("Enter a price: "))
while price < 0:
    price = float(input("Error: Enter a price: "))
print(format(price, ".2f"))

number = int(input("Enter a quantity: "))
while number < 0:
    number = int(input("Error: Enter a quantity: "))
print(number)

ftotal = format(number*price, ".2f")
print("{0:<10} ${1:<8}".format(name, ftotal))
