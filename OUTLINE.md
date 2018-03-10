# Hub

I am just experimenting with this curriculum outline right now.

For the Codecademy side of things my plan is as follows.
I will use Codecademy as an outline for how to structure lectures.
Each class will be taught a new section of code cademy.
I will look at what is taught, take note (maybe even quote them), and teach it myself.
Then I will look at the exercises that are given by Codecademy, modify them to my liking, and have the students do them.

## Section 1 - Python Syntax

### Part 1 - Printing

One of the most basic things you can do in python is print text to the screen. As far a python sees it, for now, there are only two different types of things you can print to the screen. Numbers, and everything else.

To print a number it is very simple
```python
print(1)
```
You can place any number you would like (positive of negative number) in between the parentheses
```python
print(-274.81)
```
If you want to print multiple numbers to the screen you can just add some more print statements like so
```python
print(1)
print(2)
print(3)
```

Now for the everything else type. In the world of computer science we call them strings. A string can be any sequence of letters, numbers, or symbols that you can type on your keyboard. Think words, addresses, and formatted phone numbers. You can still use the print() keyword but the catch is that you must surround your string in double quotes.

```
print("Hello World!")
```

Remember, a string can be any combination of characters, so they could include numbers

```python
print("The ABCs are as easy as 123")
```

You can also print numbers and strings within the same print statement as long as you separate them by a comma

```python
print("Today is March", 10, "th")
```

### Part 2 - Variables 

What is a variable and why do we need them?
  * Variables store "things" so that these "things" can be used and changed easily throughout a program.
  * They make life so much easier
  
To understand this a little bit better lets actually write our first bit of code that prints the number 10 to the screen.

```python
print(10)
```

Now lets print 10 to the screen 5 times

```python
print(10)
print(10)
print(10)
print(10)
print(10)
```

It works! Yay! However, now lets print the number 11 to the screen. To do this, all we have to do is change all the numbers 10 to 11

```python
print(11)
print(11)
print(11)
print(11)
print(11)
```

This works. But it was kind of annoying to go back to all of the print statements and delete 10 and replace it with 11. What if we could change all of them at once? Well, with varialbes you can.

lets create a variable to store the number 10 and call it myNumber.

```python
myNumber = 10
```

If we want to print myNumber we can do it like this

```python
myNumber = 10
print(myNumber)
```

To print myNumer 5 times, just like before, we can just copy and past it 5 times

```python
myNumber = 10
print(myNumber)
print(myNumber)
print(myNumber)
print(myNumber)
print(myNumber)
```
Now, if we want to print out the number 11 instead of 10, we can simply change the value of myNumber to 11

```python
myNumber = 11
print(myNumber)
print(myNumber)
print(myNumber)
print(myNumber)
print(myNumber)
```

What if we want to print 11 three times and 12 two times?

```python
myNumber = 11
print(myNumber)
print(myNumber)
print(myNumber)
myNumber = 12
print(myNumber)
print(myNumber)
```

Variables can be called anything (just make sure you only use letters, numbers, and underscores and always start a varialbe name with a letter) and be set to three different types of things(for now)
  * Positive and negative numbers without decimals, integers
    * 10, 11, -2, 35678, -87, 0, 56, -999
  * Pisitive and negative numbers with decimals, floats
    * 5.6, -43.543, 100.000, 56342.34698, -7865.342
  * Text, Strings
    * "Jack", "Ice Cream", "a", "145", "#tbh", "How are you doing to day?"
  * Ture of false, boolean
    * true or false
    
Lets look at what all of these varialbes look like in code

```python
num = 10
otherNumber1 = 11
wrd3g98tgdc_xTTcY = -2 #This is an extrem example of a variable name that is actuall technically legal. Please make your variable names make sense though.
otherNumber2 = 35678
otherNumber1 = -87
otherNumber2 = 0

f = 4.5
my_float = -6966.007401
f = -0.90

word = "banana"
words = "banana split"

isIt = true
isIt = false
```

Now lets talk about opporators.
