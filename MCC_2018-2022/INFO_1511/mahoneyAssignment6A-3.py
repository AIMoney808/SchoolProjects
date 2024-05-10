import sqlite3
conn = sqlite3.connect('inventory.db')
cursor = conn.cursor()
sqlH = '''SELECT * FROM Products;'''
cursor.execute(sqlH)
stList = cursor.fetchall()
print("\nProducts...")
for test in stList:
    print(test)
conn.commit()
conn.close()

conn = sqlite3.connect('inventory.db')
cursor = conn.cursor()
sqlI = '''SELECT * FROM ProductDetails;'''
cursor.execute(sqlI)
stList = cursor.fetchall()
print("\nProductDetails...")
for test in stList:
    print(test)
conn.commit()
conn.close()


conn = sqlite3.connect('inventory.db')
cursor = conn.cursor()
sqlJ = '''SELECT Products.PName, ProductDetails.PManu, ProductDetails.Price
            FROM Products
            INNER JOIN ProductDetails on ProductDetails.ProductID = Products.ProductID;'''
cursor.execute(sqlJ)
stList = cursor.fetchall()
print("\nProducts and ProductDetails...")
for test in stList:
    print(test)
conn.commit()
conn.close()