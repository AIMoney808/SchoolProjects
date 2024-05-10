# get a value from the keyboard
test = int(input("Enter a value: "))
if test < 0:
    print("No Negitive Numbers Allowed")
    
if test > -1:
    print("The Entered Number Is Acceptable")
else:
    print("No Negative Numbers Allowed")
        
if test > 100:
    print("The Entered Number Is Too Large")
elif test > -1 and test <= 100:
    print("The Entered Number Is Acceptable")
else:
    print("No Negative Numbers Allowed")
