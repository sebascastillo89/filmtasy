# Filmtasy

**Filmtasy** is a SWAPI client for React. The [Star Wars API, or "SWAPI"](https://swapi.dev/) (Swah-pee) is the world's first quantified and programmatically-accessible data source for all the data from the Star Wars canon universe!

(\*) **Learning area**: Filmtasy is my first React App. This project allow me to experience and learn a new framework and its a huge source of training and self-development

## Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/b88d6c1b-4cfe-4ee7-a907-3b6efb964d2b/deploy-status)](https://app.netlify.com/sites/practical-mcnulty-40c0fb/deploys)
If you want to see the demo of this proyect deployed, you can visit: [Filmtasy running on Netlify](https://practical-mcnulty-40c0fb.netlify.app/)

## How to run

Filmtasy use [Yarn](https://yarnpkg.com/) as package manager. Read the [Installation Guide](https://yarnpkg.com/en/docs/install) on our website for detailed instructions on how to install Yarn.
Once installed, in the project directory, you can run:

- **yarn start**: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- **yarn test**: Launches the test runner in the interactive watch mode
- **yarn build**: Builds the app for production to the `build` folder.\
- **yarn eject**: Once you `eject`, you can’t go back! This command will remove the single build dependency from your project.

## What I've learned

Filmtasy was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and use following tools:

- [Yarn](https://yarnpkg.com/) as package manager.
- [React-Router-Dom](https://reactrouter.com/web/guides/quick-start) as client-side routing.
- [Redux](https://redux.js.org/) as state container.
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk) as middleware for basic Redux side effects logic
- [React-Bootstrap](https://react-bootstrap.github.io/) as CSS Framework
- [Axios](https://github.com/axios/axios) as promise based HTTP client
- [Moxios](https://github.com/axios/moxios) Mock axios requests for testing
- [redux-mock-store](https://github.com/reduxjs/redux-mock-store) A mock store for testing Redux async action creators and middleware

### Testing

I am using jest and enzyme to test Filmtasy. Provider, and MemoryRouter has been used to mock Redux store and useParams hook.

![May the force be with you.](https://www.clipartkey.com/mpngs/m/6-62632_clip-art-may-the-force-be-with-you.png)
