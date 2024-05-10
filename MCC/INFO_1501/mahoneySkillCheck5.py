newFile = input("Enter new file name: ")

def main():
    f = open(newFile,"w")
    a = ''
    while a != 'QUIT':
       a = input("Enter a string: ")
       f.write(a + '\n')
    else:
        f.close
main();

def main2():
    f = open(newFile, "r")
    print(f.read())
    f.close()
main2();
