Email Image Search
=====================
[![Build Status](https://travis-ci.org/rustybailey/email-image-project.svg?branch=master)](https://travis-ci.org/rustybailey/email-image-project)

Email Image Search is a simple project which takes an email as input to search for a corresponding image.

#### Features
- Frontend
    - Input which can search for image by email
    - Email validation
    - Uses AngularJS/Bootstrap/Sass
- Backend
    - Implemented an API to return an image using the [Google Custom Search API](https://developers.google.com/custom-search/json-api/v1/overview).
    - Uses [express-validator](https://github.com/ctavan/express-validator) for email validation
    - Uses some of the new ES6 features such as templates strings, arrow functions, and new object literal shorthand.
    - Tested with mocha/chai/sinon.
- Tooling
    - Gulp and webpack-dev-middleware for development
    - Webpack to bundle all of the frontend code into one file
    - `.editorconfig`, `.jshintrc`, and `.jscsrc` for code consistency and quality
    - Travis CI to automatically run JSHint/JSCS & unit tests
    - Heroku for hosting; automatically deploys when code is pushed to Github if Travis build passes

### Setup:

#### Prerequisites
- Git command line or Github GUI: [Windows](https://windows.github.com/)/[Mac](https://mac.github.com/)
- [Node.js](http://nodejs.org/download/) - **Must use 4.x to get ES6 features**
- [Python 2.7](https://www.python.org/downloads/windows/)
    - [node-gyp](https://github.com/TooTallNate/node-gyp) relies on Python 2.7.
    - If you are on Mac or Linux, you probably already have this installed.
- You will need a Google API Key that is set to use the Google Custom Search API and CX Code for your custom search engine.
    - See [Google's guide](https://developers.google.com/custom-search/json-api/v1/overview#prerequisites) for more info.

#### Getting the local development environment running
1. Clone the repo: `git clone https://github.com/TDASinternal/email-image-project.git` and change to that new directory.
2. At the root, create a file named `.env` which should contain the following:

    ```
    GOOGLE_API_KEY=[Your API key]
    GOOGLE_CX_CODE=[Your custom search engine]
    ```
3. Install all node packages: `npm install`
    - Must have Python 2.7 (not 3.x) installed. If you have multiple versions installed and just need to use 2.7 for this step, try `npm install --python=python2.7`.
4. Run `npm run develop` to start express server with gulp (which will also run webpack-dev-middleware in the 'development' environment).
5. Open `http://localhost:8080/` to view the app.
