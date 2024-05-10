import sqlite3


conn = sqlite3.connect('ContactsDB.db')
c = conn.cursor()

tableString = """CREATE TABLE Contacts (
    CustomerID INTERGER not null Primary Key,
    FirstName VARCHAR(20) not null,
    LastName VARCHAR(20) not null,
    PhoneNumber VARCHAR(10) not null)"""
c.execute(tableString)
c.execute("INSERT INTO Contacts VALUES (1,'Billy','Bob','503-555-9831')")
c.execute("INSERT INTO Contacts VALUES (2,'Bob','Billy','503-555-3199')")
conn.commit()

conn.close()
