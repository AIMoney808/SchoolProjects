import sqlite3
#Connecting to sqlite
conn = sqlite3.connect('inventory.db')
#Creating a cursor object using the cursor() method
cursor = conn.cursor()
sql = '''CREATE TABLE Products (
    ProductID integer NOT NULL Primary Key,
    PName varchar(30) NOT NULL,
    InspectionCode integer,
    ApprovedDate varchar(10) NOT NULL
    );'''
cursor.execute(sql)
cursor.execute("INSERT INTO Products VALUES(101,'Micro Chip 01', '2705','1/1/2022')")
cursor.execute("INSERT INTO Products VALUES(102,'CPU 27', '4530','6/17/2022')")
cursor.execute("INSERT INTO Products VALUES(103,'SSD 04', '2304','2/16/2021')")
cursor.execute("INSERT INTO Products VALUES(104,'Hydraulic Motor', '4802','5/08/2019')")
cursor.execute("INSERT INTO Products VALUES(105,'Infrared Sensor', '3406','12/10/2014')")
cursor.execute("INSERT INTO Products VALUES(106,'Ball Bearings 6c', '2041','2/16/2021')")
print("Table created successfully........")
# Commit your changes in the database
conn.commit()
#Closing the connection
conn.close()
