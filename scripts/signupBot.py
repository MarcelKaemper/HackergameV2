import requests
import random
import string

print("How many user do you want to sign up?")
amount = int(input(">"))
print("How long should each generated name be?")
nameLength = int(input(">"))
print("Enter a password for the user")
pw = input(">")

for i in range(amount):
    uString = ""
    for i in range(nameLength):
        uString += random.choice(string.ascii_letters)
    print("Unique string: "+uString)
    r = requests.post("http://127.0.0.1:3000/signup", data={"mail":uString+"@python.de", "username":uString, "password":pw, "confirmPassword":pw})
    print(r.status_code, r.reason)

