import tkinter
import xml.etree.ElementTree as et


class NationsWindow:
        def __init__(self):
                
                self.mainWindow = tkinter.Tk()
                self.mainWindow.geometry("200x160")

                self.nameLabel = tkinter.Label(self.mainWindow, text="Country Name")
                self.nameEntry = tkinter.Entry(self.mainWindow)
                self.popLabel = tkinter.Label(self.mainWindow, text="Population")
                self.popEntry = tkinter.Entry(self.mainWindow)
                self.contLabel = tkinter.Label(self.mainWindow, text="Continent")
                self.contEntry = tkinter.Entry(self.mainWindow)

                self.addCountryButton = tkinter.Button(self.mainWindow, text="Write to XML", command=self.addCountry)
                self.nameLabel.pack()
                self.nameEntry.pack()
                self.popLabel.pack()
                self.popEntry.pack()
                self.contLabel.pack()
                self.contEntry.pack()
                self.addCountryButton.pack()
                tkinter.mainloop()

        def addCountry(self):
            tree = et.parse('Nations.xml')
            root = tree.getroot()

            country = et.SubElement(root, 'country')

            item = et.SubElement(country, 'name')
            item.text = self.nameEntry.get()
            oh = et.SubElement(country, 'population')
            oh.text = self.popEntry.get()
            pr = et.SubElement(country, 'continent')
            pr.text = self.contEntry.get()
            et.indent(root)
            tree.write('Nations.xml')

myWindow = NationsWindow()
