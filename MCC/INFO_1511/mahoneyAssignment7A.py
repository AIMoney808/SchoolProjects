import json

p =open('products.txt','r')
total=0

for line in p:
    q=json.loads(line)
    subtotal=format(float(q["price"])*float(q["sold"]),".2f")
    total=float(subtotal)+total
    print("Product: ",q["product"],"Monthly Sales: $",subtotal, sep="")
print("Total: $",total)


p.close
