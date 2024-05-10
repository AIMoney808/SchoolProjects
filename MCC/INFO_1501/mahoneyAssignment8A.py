import datetime

year = int(input('Enter a 4 digit year: '))
month = int(input('Enter a month number: '))
day = int(input('Enter a day number: '))

d= datetime.date(year, month, day)
ph= datetime.date(1941, 12, 7)

while d < ph:
    print('That date is before Pearl Harbor. Try again.')
    year = int(input('Enter a 4 digit year: '))
    Month = int(input('Enter a month number: '))
    day = int(input('Enter a day number: '))
    d= datetime.date(year, month, day)

sp = d - ph

print(sp.days,' days')
