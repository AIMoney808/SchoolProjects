import tkinter
import sqlite3

class myGUI:
    def __init__(self):
        self.main_window = tkinter.Tk()
        self.frm = tkinter.Frame(self.main_window)
        self.frm.grid(padx= 5, pady= 5)

        self.btnFrm = tkinter.Frame(self.frm)
        self.btnFrm.grid(column= 0, row= 5, columnspan= 2)


        self.lblID =tkinter.Label(self.frm, text= 'ID Value')
        self.lblFirstName = tkinter.Label(self.frm, text= 'First Name')
        self.lblLastName = tkinter.Label(self.frm, text= 'Last Name')
        self.lblPhone = tkinter.Label(self.frm, text= 'Phone Number')


        self.entID = tkinter.Entry(self.frm)
        self.entFirstName = tkinter.Entry(self.frm)
        self.entLastName = tkinter.Entry(self.frm)
        self.entPhone = tkinter.Entry(self.frm)


        self.btnSubmit = tkinter.Button(self.btnFrm, text= 'Submit', command= self.processRecord)


        self.lblID.grid(column= 0, row= 1, pady= 5)
        self.lblFirstName.grid(column= 0, row= 2, pady= 5)
        self.lblLastName.grid(column= 0, row= 3, pady= 5)
        self.lblPhone.grid(column= 0, row= 4, pady= 5)

        self.entID.grid(column= 1, row= 1)
        self.entFirstName.grid(column= 1, row= 2)
        self.entLastName.grid(column= 1, row= 3)
        self.entPhone.grid(column= 1, row= 4)

        self.btnSubmit.grid(column= 0, row= 5)


        self.value = tkinter.StringVar()
        self.lblValue = tkinter.Label(self.btnFrm, textvariable= self.value)
        self.lblValue.grid(column= 0, row= 6)


        tkinter.mainloop()


    def InsertRecord(self):
        try:
            conn = sqlite3.connect('ContactsDB.db')
            c = conn.cursor()
            c.execute("INSERT INTO Contacts VALUES (?,?,?,?)", \
            (self.entID.get(), self.entFirstName.get(), self.entLastName.get(), self.entPhone.get()))
            self.value.set('Record Inserted')

            conn.commit()
            conn.close()
        except:
            self.value.set("Data entry error")
    

    def processRecord(self):
        self.value.set("")
        self.InsertRecord()


if __name__ == '__main__':
    my_gui = myGUI()