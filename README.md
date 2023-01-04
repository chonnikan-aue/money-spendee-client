<!-- 
Ougrid's Read Me
## Resources:
- https://bootstrap-table.com/docs/getting-started/introduction/
- https://examples.bootstrap-table.com/#welcomes/from-html.html#view-source
- https://examples.bootstrap-table.com/#view-source
- https://stackoverflow.com/questions/70619448/how-to-make-an-href-dropdown-item-that-does-not-reload-the-page-with-react-boost
- https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
- https://bobbyhadz.com/blog/javascript-get-sum-of-array-of-numbers
- https://bobbyhadz.com/blog/react-filter-array-of-objects
- https://medium.com/how-to-react/using-env-file-in-react-js-b2714235e77e 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
- https://www.w3schools.com/css/tryit.asp?filename=trycss_css_image_overlay_opacity
- https://canvasjs.com/docs/charts/integration/react/
- https://canvasjs.com/react-charts/pie-chart-index-data-label-inside/
- https://stackoverflow.com/questions/4244896/accessing-an-object-property-with-a-dynamically-computed-name
- https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component
- https://www.smashingmagazine.com/2020/03/sortable-tables-react/

## DB:
INSERT INTO "Deposits" VALUES (DEFAULT,'Fixed Income',10000,'2023-01-04',1,1);
INSERT INTO "Withdraws" VALUES (DEFAULT,'Shopping',120,'2023-01-04',1,1,1);
-->

# MONey Spendee Client

## Description

MONey Spendee application is a money management application which allow users to sign up and record their transaction in daily life.

## Installation

to install the package

### `npm i` 

runs the application

### `npm start`

## Link

[Deploy Link](https://github.com/chonnikan-aue/money-spendee-client)

[Github Link](https://github.com/chonnikan-aue/money-spendee-client)

## Wirefram and User Interface

### Planning wireframe

![image](https://user-images.githubusercontent.com/116058313/210303185-92344558-ae85-4532-94ce-d73cbfbcf65c.png)
![image (1)](https://user-images.githubusercontent.com/116058313/210303197-6af6836e-21db-4e93-83fd-fc2bde05330a.png)
![image (2)](https://user-images.githubusercontent.com/116058313/210303195-9adeb045-71b2-4ecd-a391-f51d7c09021f.png)
![image (3)](https://user-images.githubusercontent.com/116058313/210303192-31e6c147-85c9-49ac-9164-c5647c367525.png)
![image (4)](https://user-images.githubusercontent.com/116058313/210303191-a0742c6c-9d1e-4a43-a78f-8ff661c3f7ac.png)
![image (5)](https://user-images.githubusercontent.com/116058313/210303190-842f0eb2-5277-449b-a0f3-2c63dcc3f3ce.png)

### Actual wireframe

![Login](https://user-images.githubusercontent.com/116058313/210388011-3ab854d9-d12b-46fc-892c-e202cb57fe2f.jpg)
![dashboard](https://user-images.githubusercontent.com/116058313/210388020-f974c385-1b90-472f-803a-00770d39c798.jpg)
![summary](https://user-images.githubusercontent.com/116058313/210388025-0886c4a6-234c-47d5-8653-37e552f651cb.jpg)
![deposit fix income](https://user-images.githubusercontent.com/116058313/210388027-9f378c61-cf7e-4fcc-9770-3c81807a808c.jpg)
![adddeposit](https://user-images.githubusercontent.com/116058313/210388032-a1cc653c-ed6f-4f2e-ad67-0288ca22709d.jpg)
![add withdraw and alert](https://user-images.githubusercontent.com/116058313/210388036-828263c6-3944-49d3-af3a-d6977336e5eb.jpg)
![edit fix income](https://user-images.githubusercontent.com/116058313/210388038-8e759d6e-d50a-4aef-a744-4f3859d49c78.jpg)
![add account](https://user-images.githubusercontent.com/116058313/210388044-71900324-2e03-4ae1-b1e2-8297a24b1d96.jpg)
![add withdraw type](https://user-images.githubusercontent.com/116058313/210388046-12165c57-04c5-4e53-8ef7-18c8e7855075.jpg)
![edit withdraw type](https://user-images.githubusercontent.com/116058313/210388050-0004a506-f11e-4f27-bc32-509d959817da.jpg)


## Teachnology used

We use react as a foudation of the application and mainly use react-bootrap for the user interface

## User stories

- As a user, I want to log my daily transactions, so that I can look them up later.
- As a user, I want to set the percentages on my expenses, savings, and investment per month, so that I can allocate my spendings correctly as planned.
- As a user, I want to see a summary report and dashboard of my monthly transactions, so that I can plan my next month’s spending.

### MVP Goal:

- [x] Create “types” table (Attributes: Income, Daily Expenses, Savings, Investment)
- [x] Create “transactions” table [CRUD: FULL CRUD]
- [x] Users can add fixed income amount per month [CRUD: UPDATE]
- [x] The transaction table will have the “withdrawFrom” column (savings, expenses)
- [x] Make the application responsive
- [ ] Every 1st of each month, the net amount (total income – total expenses = net amount) of the previous month will be added as the savings of the current month (insert in the transaction table).

### Strech Goal:

- [x] Users can specify and edit the preferred amount of money (as percentages) that they want to allocate for their expenses, savings, and investment per month [CRUD: READ, UPDATE]
- [x] Show dashboard on the homepage that summarizes every transaction of a user
- [x] User authorization (with sign up and log in pages) [CRUD: FULL CRUD]
- [x] Alert users when they are about to reach the limit of their maximum expenses per month
- [ ] Add filter and/or sort function inside the transaction table on the homepage to let users filter and/or sort data on the date/ name/ type of transaction they want to see
- [ ] Add a date range filter on dashboard view and summary view
- [ ] Group authorization (with sign up and log in pages) [CRUD: FULL CRUD]
    a. User can access and log in into group authorization only after logging in through the user authorization

## Approch

### Frontend application

We can create the application which is able to CRUD with our created database by interact from the front end website and users are also able to signup, login, signout. Our application is also responsive and has variety function such as dropdown, accordion, alert, etc.

### Backend application

We can create our own database that is able to CRUD from frontend and export the database as a API and JSON format. Our website is also define the authorization to access the database.

## What left?

### Frontend application

We want our app to have more features such as table filter, other dash board style and more dynamics.

### Backend application.

We want to create a group or event that allow many user the access and CRUD the same event
