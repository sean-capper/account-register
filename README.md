# Account Registration

A simple Node.js application that allows the user to create new accounts, and sign in with each account.
The application prevents duplicate usernames from registering. User accounts are stored in a MongoDB, along
with the hashed password.

## Getting Started

Download or clone the repository to your local machine. Nagivate to the downloaded files in your operating system's
terminal. Run *node app* or *nodemon*, and also run *mongod* in another terminal window. You may need to create a new MongoDB
and using the command *mongo* in a terminal window. Update the *conncetionString* in *app.js* (default *connectionString* is *accounts*) to the new MongoDB you've created. You will also need to create a new colleciton inside the database using *db.createCollection('users')*. 

### Prerequisites

```
Node.js
MongoDB
Web Browser
```

### Installation and Usage

Clone or download the repository.
```
git clone https://github.com/sean-capper/account-register.git
```

Navigate to the folder location using terminal/cmd

```
$ cd projects/accountregister 
```

Start the Mongo Daemon in terminal/cmd

```
$ mongod
```

Create the MongoDB for the application to use, default is 'accounts'
```
$ use db_name_here
```

Create the collection the applicaiton will use, default is 'users'

```
$ db.createCollection('users') 
```

Install the npm dependencies in the project folder

```
$ npm install
```

Update the database connectionString in [app.js](app.js), if not using defaults

```
const db = mongojs('_CHANGE_THIS_', ['_AND_THIS_']);
```

Start the node app

```
$ node app
    or
$ nodemon
```

Open the application in a web browser by navigating to:

```
localhost:8000
```

## Built With

* [Node.js](https://nodejs.org/en/docs) - The web framework used
* [Express.js](https://expressjs.com/en/starter/installing.html) - Web application framework used
* [MongoDB](https://www.mongodb.com/) - Database used

## Version

* v0.0.1 - Has basic functionality implemented.

## Authors

* **Sean Capper** - *Initial work* - [sean-capper](https://github.com/sean-capper)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
