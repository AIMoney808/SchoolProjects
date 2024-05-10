import tkinter
import xml.etree.ElementTree as et

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
        pass

    def addDB(self):
        pass

Assignment9()
