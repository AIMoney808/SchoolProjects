import tkinter

class CarpetWindow:
        def __init__(self):
                self.mainWindow = tkinter.Tk()
    
                self.lengthlabel = tkinter.Label(self.mainWindow, text="Length")
                self.lengthEntry = tkinter.Entry(self.mainWindow)
                self.widthlabel = tkinter.Label(self.mainWindow, text="Width")
                self.widthEntry = tkinter.Entry(self.mainWindow)
                self.pricelabel = tkinter.Label(self.mainWindow, text="Price")
                self.priceEntry = tkinter.Entry(self.mainWindow)

                self.priceButton = tkinter.Button(self.mainWindow, text="Price", command=self.doPrice)
                self.labelValue = tkinter.StringVar()
                self.labelValue.set("0")
                self.outputLabel = tkinter.Label(self.mainWindow, textvariable=self.labelValue)

                self.lengthlabel.pack()
                self.lengthEntry.pack()
                self.widthlabel.pack()
                self.widthEntry.pack()
                self.pricelabel.pack()
                self.priceEntry.pack()
                self.priceButton.pack()
                self.outputLabel.pack()

                tkinter.mainloop()

        def doPrice(self):
                try:
                    length = float(self.lengthEntry.get())
                    width = float(self.widthEntry.get())
                    price = float(self.priceEntry.get())
                    total = length * width * price
                    self.labelValue.set("$"+format(total, ".2f"))
                except:
                    self.labelValue.set("DATA INPUT ERROR!")

CarpetWindow()
