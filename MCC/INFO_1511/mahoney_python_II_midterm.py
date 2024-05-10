import tkinter
import sqlite3

class myGUI(tkinter.Frame):
    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent)
        self.pack(fill = tkinter.BOTH, expand=True)

        self.idLabel = tkinter.Label(self, text="Product ID: ")
        self.idLabel.grid(column=0, row=0)

        self.idEntry = tkinter.Entry(self)
        self.idEntry.grid(column=2, row=0)

        self.catLabel = tkinter.Label(self, text="Category: ")
        self.catLabel.grid(column=0, row=1)

        self.catEntry = tkinter.Entry(self)
        self.catEntry.grid(column=2, row=1)
        
        self.nameLabel = tkinter.Label(self, text="Product Name: ")
        self.nameLabel.grid(column=0, row=2)

        self.nameEntry = tkinter.Entry(self)
        self.nameEntry.grid(column=2, row=2)

        self.priceLabel = tkinter.Label(self, text="Price: ")
        self.priceLabel.grid(column=0, row=3)

        self.priceEntry = tkinter.Entry(self)
        self.priceEntry.grid(column=2, row=3)

        self.quantLabel = tkinter.Label(self, text="Quantity on hand: ")
        self.quantLabel.grid(column=0, row=4)

        self.quantEntry = tkinter.Entry(self)
        self.quantEntry.grid(column=2, row=4)

        self.saveButton = tkinter.Button(self, text="Save Record", command=self.dbAction)
        self.saveButton.grid(column=1, row=6)

        self.clearButton = tkinter.Button(self, text="Clear Text", command=self.clearAction)
        self.clearButton.grid(column=1, row=7)

        self.tx = tkinter.Text(self, height=10, width=50)
        self.tx.grid(column=6, row=0, columnspan=3, rowspan=5)

        self.searchLabel = tkinter.Label(self, text="Product Name: ")
        self.searchLabel.grid(column=6, row=6)

        self.searchEntry = tkinter.Entry(self)
        self.searchEntry.grid(column=8, row=6)

        self.displayButton = tkinter.Button(self, text="Display Record", command=self.displayAction)
        self.displayButton.grid(column=6, row=7)

        self.clearTextButton = tkinter.Button(self, text="Clear Text", command=self.clearAction)
        self.clearTextButton.grid(column=8, row=7)

        for child in self.winfo_children():
            child.grid_configure(padx=20, pady=5)
        
    def dbAction(self):
        try:
            conn = sqlite3.connect('products.db')
            c = conn.cursor()
            productID = int(self.idEntry.get())
            category = self.catEntry.get()
            name = self.nameEntry.get()
            price = float(self.priceEntry.get())
            quantity = int(self.quantEntry.get())
            params = (productID, category, name, name, price, quantity)
            paramquery = "INSERT INTO products VALUES (?,?,?,?,?)"
            c.execute(paramquery, params)
            conn.commit()
            conn.close()
            self.successLabel = tkinter.Label(self, text="Successfuly saved")
            self.successLabel.grid(column=1, row=8)
        except:
            self.errorLabel = tkinter.Label(self, text="ERROR! TRY AGAIN.\nEnsure all fields \nare filled out correctly")
            self.errorLabel.grid(column=1, row=8)

    def clearAction(self):
        self.tx.delete('1.0', tkinter.END)
        for widget in self.winfo_children():
            if isinstance(widget, tkinter.Entry):
                widget.delete(0, tkinter.END)

    def displayAction(self):
        try:
            conn = sqlite3.connect('products.db')
            c = conn.cursor()
            search = self.searchEntry.get()
            sqlSelectQuery = """select * from products where name == ?"""
            c.execute(sqlSelectQuery, (search))
            record = c.fetchone()
            self.tx.delete('1.0', tkinter.END)
            self.tx.insert(tkinter.END, str(record)+"\n")
            conn.close()
        except:
            self.errorLabel = tkinter.Label(self, text="ERROR! No matching records.")
            self.errorLabel.grid(column=7, row=8)

if __name__=="__main__":
    mainWindow = tkinter.Tk()
    mainWindow.title("Products")
    myGUI(mainWindow)
    mainWindow.mainloop()
    