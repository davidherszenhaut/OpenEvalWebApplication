# OpenEval Web Application Delivery Documentation

## Release Notes

### New software features for this release

* Finished the base version of the application.

### Bug fixes made since the last release

* The search bar in `all-classes.html` now updates the class list automatically, without the user having to press a button to update the class list.

### Known bugs and defects

* Proper log in has not yet been implemented.
* The class list in `all-classes.html` currently shows only the course ID, not the course name.

## Install Guide

### Prerequisites

* A terminal
* A web browser

### Dependent libraries

* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Download instructions

* The code for the web application can be found [here](https://github.com/dedding4341/OpenEval/tree/master/Web) and [here](https://github.com/davidherszenhaut/OpenEvalWebApplication).
* A copy of the code can be gotten by cloning the repository using `git clone` or by downloading a ZIP of the repository on GitHub.

### Installation

* In a terminal, go to the directory where the code is stored and run `npm install`.

### Run instructions

* Once the appropriate Node.js packages have been installed, start the application by running either `node app.js` or `npm start`.
* Open a browser and type `http://localhost:3000/login` in the address bar.

### Troubleshooting

* If there is an error in starting the application, try running `npm i npm` to update npm and then running `npm install` to try installing the required packages again.