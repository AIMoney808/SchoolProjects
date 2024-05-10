import sqlite3
#Connecting to sqlite
conn = sqlite3.connect('inventory.db')
#Creating a cursor object using the cursor() method
cursor = conn.cursor()
sql = '''CREATE TABLE ProductDetails (
    ProductID integer NOT NULL,
    PManu varchar(30) NOT NULL,
    Price float  NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
    );'''
cursor.execute(sql)
cursor.execute("INSERT INTO ProductDetails VALUES(101,'Tech Corp.', '1.50')")
cursor.execute("INSERT INTO ProductDetails VALUES(101,'Tech Corp.', '1.50')")
cursor.execute("INSERT INTO ProductDetails VALUES(102,'Tech Corp.', '389.99')")
cursor.execute("INSERT INTO ProductDetails VALUES(102,'Tech Corp.', '389.99')")
cursor.execute("INSERT INTO ProductDetails VALUES(103,'Tech Corp.', '40.00')")
cursor.execute("INSERT INTO ProductDetails VALUES(103,'Tech Corp.', '40.00')")
cursor.execute("INSERT INTO ProductDetails VALUES(104,'RobCo', '120.00')")
cursor.execute("INSERT INTO ProductDetails VALUES(104,'RobCo', '120.00')")
cursor.execute("INSERT INTO ProductDetails VALUES(105,'RobCo', '19.99')")
cursor.execute("INSERT INTO ProductDetails VALUES(105,'RobCo', '19.99')")
cursor.execute("INSERT INTO ProductDetails VALUES(106,'RobCo', '140.50')")
cursor.execute("INSERT INTO ProductDetails VALUES(106,'RobCo', '140.50')")
print("Table created successfully........")
# Commit your changes in the database
conn.commit()
#Closing the connection
conn.close()