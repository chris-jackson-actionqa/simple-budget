# Routes and DB notes

## Expenses

### expenses routes

- GET /expenses # get all expenses
- POST /expenses # create a new expense
- GET /expenses/:expense # get existing expense
- PUT /expenses/:expense # modify existing expense
- DELETE /expenses/:expense # delete existing expense

### expenses table

- expenseid SERIAL PRIMARY KEY
- userid FOREIGN KEY
- name VARCHAR(50)
- recurrance VARCHAR(1)
  - ["O", "D", "W", "M", "Y"]
  - Once, Daily, Weekly, Monthly, Yearly
  - time frame for recurrance. "O" is for a one time only expense.
  - defaults to "M"
- recurrance_amount NUMBER
  - modifier for recurrance. Like, every 2 months would have
    a recurrance of "M" and a recurrance_amount of `2`
  - defaults to `1`
- starting_date DATE
  - a starting date for recurrance to be calculated from
- amount NUMBER
  - amount of the expense

## Balance

- GET /balance
- PUT /balance
- DELETE /balance

### A balance

- amount

## Income

- GET /incomes
- POST /incomes
- GET /incomes/:id
- PUT /incomes/:id
- DELETE /incomes/:id

### Income Data

- name
- frequency
- start_date
