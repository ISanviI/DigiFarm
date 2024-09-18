from io import BytesIO, StringIO

data = "Great and lovely"
address = StringIO(data)
print("Address of data - ", address)

bytes = data.encode('utf-8')
# bytes = BytesIO(bytes)
print("Encoded data - ", bytes)

text = StringIO("Some random text")
print("Value of text - ", text.getvalue())