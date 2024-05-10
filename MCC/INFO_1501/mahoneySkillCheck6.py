

x = int(input("Enter first number: "))
y = int(input("Enter second number: "))

try:
  z = x / y

except ZeroDivisionError:
    print('Cannot divide by zero.')

else:
    print( x, "/", y, "=", z)
