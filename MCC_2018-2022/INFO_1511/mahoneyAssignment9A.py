import random
import time

def server():
    count = 24
    x = 0
    while x < count:
        y = random.randint(1, 6)
        if y == 6:#indicates error occurrence
            tValue = time.ctime()
            error = random.randint(1, 3)#indicates error number
            errorListener(error, tValue)
        x += 1
        time.sleep(5)

def errorListener(err, ct):
    file = open('errorlog.txt', 'a')
    file.write("Error Message:"+ str(err)+"Date/Time:"+ str(ct)+"\n")
    file.close()

server()
