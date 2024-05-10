import sqlite3


while True:

    print('What would you like to do?')
    print('1: Find a record by first and last name showing phone number (type \'1\')')
    print('2: Add a record to the table (type \'2\')')
    print('3: List all records in the table (type \'3\')')
    print('4: Quit the program (type \'4\')')
    choice = input('')


    if choice == '1':
        try:
            conn = sqlite3.connect('ContactsDB.db')
            c = conn.cursor()
            fn = input("Enter the first name: ")
            ln = input("Enter the last name: ")

            parms = (fn, ln)
            parmquery = "select PhoneNumber from Contacts where FirstName = ? and LastName = ?"
            c.execute(parmquery, parms)
            rows = c.fetchall()
            row = rows[0]
            print(row[0])
            conn.close()
        except:
            print("Error, could not read data")
        

    elif choice == '2':
        try:
            conn = sqlite3.connect('ContactsDB.db')
            c = conn.cursor()
            CustID = int(input("Enter a customer ID: "))
            Firstname = input("Enter the first name: ")
            Lastname = input("Enter the last name: ")
            Tn = input("Enter the Phone Number: ")
            parms = (CustID, Firstname, Lastname, Tn)
            parmquery = "INSERT INTO Contacts VALUES (?,?,?,?)"
            c.execute(parmquery, parms)
            conn.commit()
            conn.close()
            print('record added')
        except:
            print("Error when inserting record")
    

    elif choice == '3':
        try:
            conn = sqlite3.connect('ContactsDB.db')
            c = conn.cursor()
            c.execute("select * from Contacts")
            rows = c.fetchall()
            for row in rows:
                print("id:",row[0], "FirstName:",row[1], "LastName:",row[2], "PhoneNumber:",row[3])
            conn.close()
        except:
            print("Read error")


    elif choice == '4':
        break