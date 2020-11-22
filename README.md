# Filmtasy

**Filmtasy** is a SWAPI client for React. The [Star Wars API, or "SWAPI"](https://swapi.dev/) (Swah-pee) is the world's first quantified and programmatically-accessible data source for all the data from the Star Wars canon universe!

(\*) **Learning area**: Filmtasy is my first React App. This project allow me to experience and learn a new framework and its a huge source of training and self-development. In this area, you have to deal with bugs and technical debt.

## Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/b88d6c1b-4cfe-4ee7-a907-3b6efb964d2b/deploy-status)](https://app.netlify.com/sites/practical-mcnulty-40c0fb/deploys)
If you want to see the demo of this proyect deployed, you can visit: [Filmtasy running on Netlify](https://practical-mcnulty-40c0fb.netlify.app/)
Filmtasy is also deployed in AWS: [Filmtasy running on AWS Amplify](https://master.d3n7qst2iwya5v.amplifyapp.com/)

## How to run

Filmtasy use [Yarn](https://yarnpkg.com/) as package manager. Read the [Installation Guide](https://yarnpkg.com/en/docs/install) on our website for detailed instructions on how to install Yarn.
Once installed, in the project directory, you can run:

- **yarn start**: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- **yarn test**: Launches the test runner in the interactive watch mode
- **yarn test --coverage -watchAll**: Launches the test runner and print coverage report.
- **yarn build**: Builds the app for production to the `build` folder.\
- **yarn eject**: Once you `eject`, you can’t go back! This command will remove the single build dependency from your project.
- **yarn run cypress open**: Launch the Cypress Test Runner.

## Developer Guide

### React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Actually runs with React v16.13.0 and uses [Yarn](https://yarnpkg.com/) as package manager.

### React-Router-Dom

Filmtasy uses [React-Router-Dom](https://reactrouter.com/web/guides/quick-start) as client-side routing, allowing to navigate between different components, changing the browser URL, modifying the browser history, and keeping the UI state in sync. We define five routes in our application:

- / shows the list of films
- /films/:id shows information about a single film (by id)
- /characters/:id shows information about a single character (by id)
- /favourites shows user's favourites films
- /about shows information about project and a link to our repository

### Redux

We use [Redux](https://redux.js.org/) together with React as state container, which helped us reduce the coupling between components. We have splitted our logic (state, actions and reducers) into five slices: films, characters, currentCharacter, currentFilms and errors.

Considering 6 Star Wars films has been released in the last 28 years, I guess SWAPI doesn't update often. For this reason, Filmtasy caches all information retrieved by SWAPI in redux state. Maybe it's not a good cache solution with large scale application, but its works fine with our little data storage.

Therefore, once a film or character is fetched from the API, the data is cached in the store, preventing new requests to the API. However, the data is not persisted in any storage: if you refresh the page, Filmtasy retrieves the data again.

### Local Storage

Users can save films and characters as favorites. If user refresh page or close browser, we would like to keep their preferences. We save favorites selection in localstorage.

### Axios and Redux-Thunk

We use [Axios](https://github.com/axios/axios) as promise based HTTP client for fetching data from SWAPI.
To write async logic that interacts with the store, we use [Redux-Thunk](https://github.com/reduxjs/redux-thunk), as middleware for basic Redux side effects logic.

Using Axios combined with Redux-Thunk, we can display a spinner while the data is being retrieved and render our component (or not found page) once async logic is finished.

### i18n

Filmtasy is available in Spanish and English, using [i18next](https://www.i18next.com/) as internationalization-framework.
You can change language in our navigation bar.

### React Bootstrap

Filmtasy uses [React-Bootstrap](https://react-bootstrap.github.io/) as CSS Framework

### Testing

For testing, we import the following dependencies:

- [jest](https://jestjs.io/) as main testing framework
- [enzyme](https://enzymejs.github.io/enzyme/) as testing utility for testing components
- [cypress](https://www.cypress.io/) as tool for end2end testing.

Over 90% filmtasy code are coverage by unit testing. Run **yarn test --coverage -watchAll** for review the report
There are 32 E2E test to ensure the application flow behaves as expected. Run **yarn run cypress open** for Launch Cypress Suite.

## Technical Debt

As a side-project, Filmtasy is currently ongoing and we are dealing with technical debt:

- Random error in unit testing. Sometimes runs OK, sometimes it appears as a UnhandledPromiseRejectionWarning, sometimes fail. This bug is driving me crazy!
- SWAPI does not provide images, so we have covers and characters pictures in local json. We could implement a wrapper API to SWAPI
- TO-DO: Docker

![May the force be with you.](https://www.clipartkey.com/mpngs/m/6-62632_clip-art-may-the-force-be-with-you.png)
