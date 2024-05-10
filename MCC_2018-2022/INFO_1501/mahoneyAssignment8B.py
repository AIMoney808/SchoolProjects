import datetime

year = int(input('Enter a 4 digit year: '))
month = int(input('Enter a month number: '))
day = int(input('Enter a day number: '))

d= datetime.date(year, month, day)
daySpan = int(input('Enter a number of days: '))
numberOfDays = datetime.timedelta(days=daySpan)

newD = d + numberOfDays

print(newD)
