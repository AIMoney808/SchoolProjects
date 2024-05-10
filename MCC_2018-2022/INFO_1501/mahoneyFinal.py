import tkinter
import xml.etree.ElementTree as et
import sqlite3

conn = sqlite3.connect('assign9.db')
c = conn.cursor()

c.execute('''create Table if not exists database(ID,FIRST,LAST,PAYRATE);''')

class Assignment9:
    def __init__(self):
        self.mainWindow = tkinter.Tk()
        self.mainWindow.geometry("300x200")


        self.IDLabel = tkinter.Label(self.mainWindow, text="Employee ID")        
        self.IDLabel.grid(column = 0, row = 0)
        self.IDEntry = tkinter.Entry(self.mainWindow)
        self.IDEntry.grid(column = 1, row = 0)

        self.firstLabel = tkinter.Label(self.mainWindow, text="First Name")        
        self.firstLabel.grid(column = 0, row = 1)
        self.firstEntry = tkinter.Entry(self.mainWindow)
        self.firstEntry.grid(column = 1, row = 1)

        self.lastLabel = tkinter.Label(self.mainWindow, text="Last Name")        
        self.lastLabel.grid(column = 0, row = 2)
        self.lastEntry = tkinter.Entry(self.mainWindow)
        self.lastEntry.grid(column = 1, row = 2)

        self.payLabel = tkinter.Label(self.mainWindow, text="Payrate")        
        self.payLabel.grid(column = 0, row = 3)
        self.payEntry = tkinter.Entry(self.mainWindow)
        self.payEntry.grid(column = 1, row = 3)


        self.XMLButton = tkinter.Button(self.mainWindow, text="XML", command=self.addXML, bg="lightblue", fg="red")
        self.XMLButton.grid(column = 0, row = 4)

        self.DBButton = tkinter.Button(self.mainWindow, text="DB", command=self.addDB, bg="red", fg="black")
        self.DBButton.grid(column = 1, row = 4)

        
        tkinter.mainloop()


    def addXML(self):
        tree = et.parse('assign9.xml')
        root = tree.getroot()

        employee = et.SubElement(root, 'employee')

        em = et.SubElement(employee, 'ID')
        em.text = self.IDEntry.get()
        fn = et.SubElement(employee, 'first')
        fn.text = self.firstEntry.get()
        ln = et.SubElement(employee, 'last')
        ln.text = self.lastEntry.get()
        pr = et.SubElement(employee, 'pay')
        pr.text = self.payEntry.get()
        et.indent(root)
        tree.write('assign9.xml')

    def addDB(self):
        ID = self.IDEntry.get()
        first = self.firstEntry.get()
        last = self.lastEntry.get()
        pay = self.payEntry.get()
        
        c.execute('''insert into database values(?,?,?,?);''',(ID,first,last,pay))
        
        conn.commit()
        conn.close()

myWindow = Assignment9()
