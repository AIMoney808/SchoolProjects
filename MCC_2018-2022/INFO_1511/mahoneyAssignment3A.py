import sqlite3
import xml.etree.ElementTree as et
import tkinter
from tkinter import messagebox as mb

class SaveDataWindow(tkinter.Frame):
    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent)
        self.pack(fill = tkinter.BOTH, expand=True)
        self.var = tkinter.StringVar()
        self.var.set("Overnight")

        self.deliveryTimeLable = tkinter.Label(self, text="Time of Delivery")
        self.deliveryTimeLable.grid(row=0, column=0)
        self.statesLable = tkinter.Label(self, text="States")
        self.statesLable.grid(row=0, column=3)

        self.rbOvernight = tkinter.Radiobutton(self,
            text="Overnight",
            padx = 20,
            variable=self.var,
            value="Overnight")
        self.rbOvernight.grid(row=1, column=0)

        self.rb23day = tkinter.Radiobutton(self,
            text="2 - 3 Days",
            padx = 20,
            variable=self.var,
            value="2-3 Days")
        self.rb23day.grid(row=1, column=1)

        self.rbWeek = tkinter.Radiobutton(self,
            text="1 Week",
            padx = 20,
            variable=self.var,
            value="1 Week")
        self.rbWeek.grid(row=1, column=2)

        self.listB = tkinter.Listbox(self, height=4)
        self.listB.insert(1, "Nebraska")
        self.listB.insert(2, "Kansas")
        self.listB.insert(3, "Oklahoma")
        self.listB.insert(4, "Texas")
        self.listB.grid(row=1, column=3)

        self.sOptionLabel = tkinter.Label(self, text="Shipping Options")
        self.sOptionLabel.grid(row=2, column=0)

        self.var1 = tkinter.IntVar()
        self.chkFreeS = tkinter.Checkbutton(self, text="Free Shipping", variable=self.var1)
        self.chkFreeS.grid(row=3, column=0)
        self.var2 = tkinter.IntVar()
        self.chkTrack = tkinter.Checkbutton(self, text="Tracking", variable=self.var2)
        self.chkTrack.grid(row=3, column=1)
        self.var3 = tkinter.IntVar()
        self.chkInsurance = tkinter.Checkbutton(self, text="Insurance", variable=self.var3)
        self.chkInsurance.grid(row=3, column=2)

        self.submitButton = tkinter.Button(self, text="Submit", command=self.Display)
        self.submitButton.grid(row=4, column=0)


        for child in self.winfo_children():
            child.grid_configure(padx=5, pady=5)

    def Display(self):
        message = "Shipping Time: "
        rbVar = str(self.var.get())
        if rbVar == "Overnight":
            message += rbVar
        elif rbVar == "2-3 Days":
            message += rbVar
        elif rbVar == "1 Week":
            message += rbVar
        try:
            temp = self.listB.get(self.listB.curselection())
        except:
            temp = "Nebraska"
        message += "\n" + temp +"\n"
        text = ""
        if self.var1.get() == 1:
            message += "Free Shipping\n"
        if self.var2.get() == 1:
            message += "Tracking\n"
        if self.var3.get() == 1:
            message += "Insurance"
        w = mb.showinfo("Shipping Information", message)


if __name__ == "__main__":
    mainWindow =tkinter.Tk()
    mainWindow.title("Shipping Options")
    SaveDataWindow(mainWindow)
    mainWindow.mainloop()