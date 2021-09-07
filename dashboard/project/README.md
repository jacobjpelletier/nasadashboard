# Functional Programming with Javascript

## Student Instructions

### Big Picture

You are going to create a Mars rover dashboard that consumes the NASA API. Your dashboard will allow the user to select which rover's information they want to view. Once they have selected a rover, they will be able to see the most recent images taken by that rover, as well as important information about the rover and its mission. Your app will make use of all the functional concepts and practices you have learned in this course, and the goal is that you would become very comfortable using pure functions and iterating over, reshaping, and accessing information from complex API responses.

### Getting Started

We have supplied some of the foundational code for you. So follow these steps to get started:

1. We'll start with the typical setup - clone theis repo and install the dependencies

- [X] To clone the repo, remember to clone just the starter branch:

```git clone --single-branch --branch starter <repo-name>```

- [*] For this project we are using yarn as our package manager, so to install your depencies run:

```yarn install```

* yarn was buggy so I used npm

2. Next you'll need a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/. If you want to simply look around at what api endpoints NASA offers, you can use their provided DEMO_KEY to do this.

3. In your repo, you will see a .env-example file with a place for your API key. Rename or copy the file to one called `.env` and enter in your key. Now that you have your key, just remember to add it as a parameter to every request you make to NASA.

5. Run `yarn start` in your terminal and go to `http:localhost:3000` to check that your app is working. If you don't see an image on the page, check that your api key is set up correctly.

6. Remember to commit frequently, use branches, and leave good commit messages! You'll thank yourself later.

### Running The Project
To run this program, either
1. download the code and or clone the repository,
2. make sure you have node and npm installed
3. run 'npm start' from the 'project' directory
4. view site at localhost:3000

### Project Requirements

To complete this project, your UI must show the following:

- [X] A gallery of the most recent images sent from each mars rover
    * located in id=loadAPIDataHere of HTML once a rover button is selected and data is fetched
- [X] The launch date, landing date, name and status along with any other information about the rover
    * below each picture once API data is fetched
- [X] A selection bar for the user to choose which rover's information they want to see
    * this is done with the navigation bar at the top with 3 rover buttons which a user can select from

To complete this project, your UI must do the following:

- [X] Be responsive. Needs to look good(aka not broken) on phones(max width 768px) and desktop(min-width 991px, max-width 1824px). Tablet view is optional.
    * see css, break points defined at lines 122-143
- [X] Provide a way to dynamically switch the UI to view one of the three rovers
    * This was done by sending a new request with each rover name associated with each button, populating index.html

To complete this project, your frontend code must:

- [X] Use only pure functions
    * All functions are pure punctions,
      **  https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976
- [X] Use at least one Higher Order Function
    * Two higher order functions are used. forEach() and map()
      ** https://www.codecademy.com/learn/game-dev-learn-javascript-higher-order-functions-and-iterators/modules/game-dev-learn-javascript-iterators/cheatsheet
- [X] Use the array method `map`
    * map() function used at client.js:112
- [X] Use the ImmutableJS library
    * The ImmutableJS Library is used at index.js:27-29, 98

To complete this project, your backend code must:

- [X] Be built with Node/Express
    * uses node and npm as a package manager
- [X] Make successful calls to the NASA API
    * calls made: see running program. note that sometimes photos look the same, photo IDs added to ensure they are different objects from the API call
- [X] Use pure functions to do any logic necessary
    * all logic is contained within a pure function
- [X] Hide any sensitive information from public view (In other words, use your dotenv file)
    * .env used for API key

#### Dependencies:
    body-parser: ^1.19.0,
    dotenv: ^8.2.0,
    express: ^4.17.1,
    immutable: ^4.0.0-rc.12,
    node-fetch: ^2.6.0
    location in package.json file.


#### Project Rubric
https://review.udacity.com/#!/rubrics/2708/view

#### TODO:
1. include images to a better looking gallery.
