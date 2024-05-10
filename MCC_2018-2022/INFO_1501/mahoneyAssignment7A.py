import sqlite3
conn = sqlite3.connect('shippers.db')  # Create connection object
c = conn.cursor() # Get a cursor object -- which works with tables
## This is a long string we’ll use to to create a table
## Note the use of triple quotes to break the string across multiple lines!
tableString = """CREATE TABLE SHIPPERS (
   ID INTEGER not null primary key,
   NAME VARCHAR(30),
 PHONE VARCHAR(30))"""
##c.execute(tableString) # Create a table
## Insert rows of data into the table
##c.execute("INSERT INTO SHIPPERS VALUES (1,'Speedy Express','503-555-9831')")
##c.execute("INSERT INTO SHIPPERS VALUES (2,'United Package','503-555-3199')")
##c.execute("INSERT INTO SHIPPERS VALUES (3,'Federal Shipping','503-555-9931')")
##c.execute("INSERT INTO SHIPPERS VALUES (4,'Hermes Parcel','503-555-2123')")
conn.commit() # Save (commit) the changes
## We can also close the connection if we are done with it.
## Just be sure any changes have been committed or they will be lost.
conn.close()


conn = sqlite3.connect('shippers.db')
c = conn.cursor()
c.execute("SELECT * FROM SHIPPERS")

records = c.fetchall()
for r in records:
    print(r[0],r[1],r[2])
print()

conn.commit()
conn.close()


conn = sqlite3.connect('shippers.db')
c = conn.cursor()


c.execute("DELETE FROM SHIPPERS WHERE ID = 3")
c.execute("SELECT * FROM SHIPPERS")

records = c.fetchall()
for r in records:
    print(r[0],r[1],r[2])
print()

conn.commit()
conn.close()

conn = sqlite3.connect('shippers.db')
c = conn.cursor()

c.execute("UPDATE SHIPPERS SET NAME = 'Hermes Parcel and Shipping' WHERE NAME = 'Hermes Parcel'")
c.execute("SELECT * FROM SHIPPERS")

records = c.fetchall()
for r in records:
    print(r[0],r[1],r[2])
print()

conn.commit()
conn.close()

conn = sqlite3.connect('shippers.db')
c = conn.cursor()
##c.execute("INSERT INTO SHIPPERS VALUES (5,'ABC Express','503-333-4567')")
c.execute("SELECT * FROM SHIPPERS")

records = c.fetchall()
for r in records:
    print(r[0],r[1],r[2])
print()

conn.commit()

conn.close()



