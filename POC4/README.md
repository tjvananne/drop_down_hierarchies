

# POC4 - Convert app to electron desktop app

All I'm going to do for this poc is repackage the existing functionality into an electron app.


## to set this up:

In a command line in this directory, set up the node project:

    npm init

Then install electron locally and save it in package.json:

    npm install electron --save

Then edit the "test" script property in package.json. Change the name of the property to "start" and the value of the property should be "electron ."

That will enable you to start up the electron app with "npm start" instead of "electron ."




