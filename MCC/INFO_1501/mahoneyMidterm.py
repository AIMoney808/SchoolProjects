import tkinter


class CharacterWindow:
        def __init__(self):
                
                self.mainWindow = tkinter.Tk()
                self.mainWindow.geometry("200x150")


                self.chalabel = tkinter.Label(self.mainWindow, text="Character Extractor")
                self.chaEntry = tkinter.Entry(self.mainWindow)
                self.vowelButton = tkinter.Button(self.mainWindow, text="Extraxt Vowels", command=self.doVowel)
                self.consonantButton = tkinter.Button(self.mainWindow, text="Extract Consonants", command=self.doConsonant)
                self.labelString = tkinter.StringVar()
                self.labelString.set("-")
                self.outputLabel = tkinter.Label(self.mainWindow, textvariable=self.labelString)


                self.chalabel.pack()
                self.chaEntry.pack()
                self.outputLabel.pack()
                self.vowelButton.pack()
                self.consonantButton.pack()


                tkinter.mainloop()

        def doVowel(self):
                
                try:
                    cha = self.chaEntry.get()
                    vowels = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U']
                    for x in vowels:
                        cha = cha.replace(x,"");
                    self.labelString.set(cha)
                    
                except:
                    self.labelString.set("...")
                    
        def doConsonant(self):
                
                try:
                    cha = self.chaEntry.get()
                    consonants = ['b', 'B', 'c', 'C', 'd', 'D', 'f', 'F', 'g', 'G',
                                  'h', 'H', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M',
                                  'n', 'N', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S',
                                  't', 'T', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z']
                    for x in consonants:
                        cha = cha.replace(x,"");
                    self.labelString.set(cha)
                    
                except:
                    self.labelString.set("...")

CharacterWindow()
