#In the previous week, you should have created a class called Rectangle.  This week, you will perform inheritance with the Rectangle class.
#Some Background:  Rugs have a set size and are sold for a set price.  On the other hand, Carpets are sold by cutting a swath from a roll -- so the size of a carpet (and its cost) can be variable. 


class Rectangle:
    
    def __init__ (self,length,width):
        if length < 0:
            length = 1
        if width < 0:
            width = 1
        self.__length = length
        self.__width = width
        
    def getLength(self):
        return self.__length

    def getWidth(self):
        return self.__width

    def setLength (self,length):
        if length < 0:
            length = 1
        self.__length = length

    def setWidth (self,width):
        if width < 0:
            width = 1
        self.__width = width

    def getArea (self):
        return self.__length() * self.__width()


#Create a class called Rug that inherits from Rectangle.  Then give the Rug class a price variable.  The length, width and price of the Rug should be set in the constructor of the Rug class.
#Give the Rug class a getPrice method that returns the cost.  Also give the Rug class an overriden __str__() method that returns a string that is a report on the data in a Rug object.

class Rug(Rectangle):
    def __init__(self, length, width, price):
        Rectangle.__init__(self, length, width)
        if length < 0:
            lenght = 1
        self.__length = length
        if width < 0:
            width = 1
        self.__width = width
        if price < 0:
            price = 1
        self.__price = price

    def getPrice(self):
        return self.__price

    def setPrice(self, price):
        if price < 0:
            price = 1
        self.__price = price

    def __str__(self):
        return (f'The length is {self.getLength()}, the width is {self.getWidth()} and the price is {self.getPrice()}')



#Create another class called Carpet that also inherits from Rectangle.  It should have a price_per_square_foot variable.
#The length, width, and price_per_square_foot are set in the constructor of the Carpet class.  Give the Carpet glass a getPrice method that calculates the price of the Carpet and returns it.
#Also give the Carpet class an overriden __str__() method that returns a string that is a report on the data in a Carpte object.

class Carpet(Rectangle):
    def __init__(self, length, width, pricePerSquareFoot):
        Rectangle.__init__(self, length, width)
        if length < 0:
            lenght = 1
        self.__length = length
        if width < 0:
            width = 1
        self.__width = width
        if pricePerSquareFoot < 0:
            pricePerSquareFoot = 1
        self.__pricePerSquareFoot = pricePerSquareFoot

    def getPrice(self):
        sqFt = self.__length * self.__width
        return sqFt * self.__pricePerSquareFoot

    def setPPSF(self, pricePerSquareFoot):
        self.__pricePerSquareFoot = pricePerSquareFoot

    def getPPSF(self):
        return self.__pricePerSquareFoot

    def __str__(self):
        return (f'The length is {self.getLength()}, the width is {self.getWidth()}, the PPSF is {self.getPPSF()} and the price is {self.getPrice()}')


#Then write a main method in which an even number of Rug and and odd number of Carpet objects are created.  Put those objects in a List object.
# Then code a loop that iterates through the List and uses the __str__() method to print a description of each object as you iterate through List.

def main():
    
    
    pList = []
    pList.append(Rug(4, 6, 40))
    pList.append(Rug(5, 9, 90))
    pList.append(Carpet(15, 15, 15))
    pList.append(Carpet(12, 10, 5))
    pList.append(Carpet(9, 13, 20))

    for i in pList:
        print(i)

    
if __name__ == '__main__': 
    main()
