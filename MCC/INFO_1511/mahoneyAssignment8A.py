import csv

with open('products.csv',newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter = ',')
    for row in reader:
        print(', '.join(row))

print( '*' * 10)


pName=input('Enter Product Name: ')
pCat=input('Enter Category: ')
onHand=input('Enter The Number On Hand: ')
unitPrice=input('Enter The Unit Price: ')

with open('products.csv', 'a', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter = ',')
    writer.writerow([pName, pCat, onHand, unitPrice])

print( '*' * 10)


with open('products.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        print(', '.join(row))