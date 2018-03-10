## Solutions

### Problem #1
```python
print("Welcome to the age difference calculator")

name1 = input("What is your name?")
age1 = input("What is your age?")

name2 = input("What is your partner’s name?")
age2 = input("What is their age?")

difference = abs(int(age2) - int(age1)) #the abs() is not necessary
print(name1, ", you and", name2, "'s age is", difference, "years apart.")
```

### Problem #2
```python
print("Welcome to the average age calculator")

age1 = input("What is the first age?")
age2 = input("What is the second age?")

average = (int(age1) + int(age2)) / 2

print("The average age between", age1, "and", age2, "is", average)
```

### Problem #3
```python
print("Welcome to the addition calculator")

num1 = input("What is the first number?")
num2 = input("What is the second number?")

added = int(num1) + int(num2)

print(num1, "+", num2, "=", added)
```

### Problem #4
```python
print("Welcome to the triable area solver")

base = input("What is the base?")
height = input("What is the height?")

area = .5 * int(base) * int(height)

print("The triable's area is", area)
```

### Problem #5
```python
print("Welcome to the circle area solver")

radius = input("What is the radius?")

area = 3.14 * int(radius) * int(radius)

print("The circle's area is", area)
```
