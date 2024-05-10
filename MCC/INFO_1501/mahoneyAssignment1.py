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
        return self.__length * self.__width

def main():
    #Creating a rectangle object
    r = Rectangle(-1,6)
    #Printing the data in the rectangle object
    print("The rectangle length is: ",r.getLength())
    print("The rectangle width is: ",r.getWidth())
    print("The area of the rectangle is: ",r.getArea())

    #Changing the existing rectangle object
    r.setLength(-2)
    r.setWidth(10)
    print("The rectangle lenght is: ",r.getLength())
    print("The rectangle width is: ",r.getWidth())
    print("The area of the rectangle is: ",r.getArea())
    
main()

