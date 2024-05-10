import sqlite3

conn = sqlite3.connect('products.db')  # Create connection object

c = conn.cursor() # Get a cursor object -- which works with tables

## This is a long string we’ll use to to create a table
## Note the use of triple quotes to break the string across multiple lines!

tableString = """CREATE TABLE IF NOT EXISTS products (
    ID INTEGER not null primary key,
    PRODCATEGORY VARCHAR(12) not null,
    PRODNAME VARCHAR(30) not null,
    PRICE DOUBLE not null,
    ONHAND INTEGER not null)"""
## Note the 'IF NOT EXISTS' -- the table will not be created if it already exists

c.execute(tableString) # Create a table

## Insert rows of data into the table
c.execute("INSERT INTO PRODUCTS VALUES (1, 'Hardware', 'Grommets', 1.99, 25)")
c.execute("INSERT INTO PRODUCTS VALUES (2, 'Hardware', 'Large Grommets', 2.59, 12)")
c.execute("INSERT INTO PRODUCTS VALUES (3, 'Paper', 'Large Plates', 3.99, 15)")
c.execute("INSERT INTO PRODUCTS VALUES (4, 'Paper', 'Small Bowls', 2.99, 10)")

conn.commit() # Save (commit) the changes

## We can also close the connection if we are done with it.
## Just be sure any changes have been committed or they will be lost.
conn.close()
