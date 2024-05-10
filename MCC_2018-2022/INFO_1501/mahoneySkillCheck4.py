thislist = ["Red", "Green", "Blue"]
print(thislist,'\n')

list2 = [1, 5, 7, 9, 3]
for i in range(len(list2)):
  print(list2[i])
  
print()
myList = []
i = 0
while i < 3:
    item = input("Enter something:")
    myList.append(item)
    i += 1 
else:
  print(myList)
