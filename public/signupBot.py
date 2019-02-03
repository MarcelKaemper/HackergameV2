import requests
import random
import string


for i in range(5):
    uString = ""
    for i in range(6):
        uString += random.choice(string.ascii_letters)
    print("Unique string: "+uString)
    r = requests.post("http://127.0.0.1:3000/signup", data={"mail":uString+"@python.de", "username":uString, "password":"test", "confirmPassword":"test"})
    print(r.status_code, r.reason)

