def total(numbs):
        tot = 0
        for numb in numbs:
            tot += numb
        return tot
        

print(total([20, 11, 3, 4, 5]))


def employee (name, age, city = "Omaha"):
    print("Employee")
    print("Name = " + name)
    print("Age = " + age)
    print("City = " + city)
    print()

employee("Joe", "23", "Lincon")
employee("Fred", "34")


##Parameters are the variables listed in parentheses in the function definition.
##The argument is the value  sent to the function when it is called.
