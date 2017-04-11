# react-webpack
Basic ReactJS boilerplate w/webpack
### installation
NodeJS installation with Homebrew (OSX)
1. Open up Terminal
2. type: which brew
3. If /usr/local/bin/brew is shown skip to step 5
4. Install Homebrew by running /usr/bin/ruby -e `$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)`
5. Install NodeJS by running `brew install node`
### Local Setup
1. Install node dependencies: `npm i`
2. Start the app on the development server: `npm start`

*The app should now be available at http://localhost:8081*
### Production
1. Run: `npm run build`

*Site will be compiled and available in the dist directory*
### Project Structure
* All front end code is placed in the 'src' directory.
* A static build will be available in the 'dist' directory after running 'npm run build'.
* the react-boilderplate uses the Airbnb JavaScript Style Guide.
