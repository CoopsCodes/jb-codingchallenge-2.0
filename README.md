       _________   _   _ _       ______ _      
      |_  | ___ \ | | | (_)      |  ___(_)     
        | | |_/ / | |_| |_ ______| |_   _      
        | | ___ \ |  _  | |______|  _| | |     
    /\__/ / |_/ / | | | | |      | |   | |     
    \____/\____/  \_| |_/_|      \_|   |_|     

     _____       _       _   _                 
    /  ___|     | |     | | (_)                
    \ `--.  ___ | |_   _| |_ _  ___  _ __  ___ 
     `--. \/ _ \| | | | | __| |/ _ \| '_ \/ __|
    /\__/ / (_) | | |_| | |_| | (_) | | | \__ \
    \____/ \___/|_|\__,_|\__|_|\___/|_| |_|___/


# JB Hi-Fi Coding Challenge

The purpose of this challenge was to build a webpage that calls the [OpenWeatherMap](https://openweathermap.org) service, allows the user to search a city and country that limits their calls to 5 per hour while handling any rejections/errors.

The repo is located in GitHub at [CoopsCodes Repo](https://github.com/CoopsCodes/jb-codingchallenge-2.0).

## Tech

This website was created with [Create React App](https://github.com/facebook/create-react-app).  While the Server is just a NodeJS Javascript file.

Using Axios to make the API call in the Frontend and Fetch to make the call in the Backend, with custom middlewares to manage the key restrictions limiting.

#  Cloning

To install and run the application open a terminal and run the below command in your terminal

### `git clone https://github.com/CoopsCodes/jb-codingchallenge-2.0.git

# Installing and running the Server

From the terminal change into the following directory with

### `cd jb-codingchallenge-2.0`

From there, change directory into `/Backend` and install the dependencies with `npm install`.

### Create the .env file
From the Root of the Backend (in the same place the Server.js is located) create a new file and call it `.env` ensure the path starts with a full stop and it does not need an extension at the end (the file path is its own extension).

Within the `.env` file copy the Keys from the text file that was sent with the submission.

#### Note: Without the Keys in the .env file this project will not return API calls, therefore this would be the first thing to check if needing to debug.

Once the NPM packages have installed and the Keys are placed in the .env file, run the server with `npm start` command.

This will display `Listening on port 5000` indicating the server is running.

#### Server needs to remain running for the Website to successfully run, so complete the next steps in a *new* terminal.

# Installing and Running the Website

From a new Terminal change into the frontend directory `/Frontend/frontend` and install the dependencies with the command `npm install`.

Once the dependencies have been installed run the command `npm start`, this will open the Website in a website browser.

If it doesn't automatically generate a website you can follow this [link](http://localhost:3000/).

# Assumptions and Disclaimer

My understanding of this coding challenge was to create a website that utilised a REST API, that holds 5 API keys each from the [OpenWeatherMap](https://openweathermap.org) service, each of those keys being restricted to 5 calls an hour (total of 25 calls an hour for the app).

On this understanding I set out to build a React Front end website that would contain form fields to and an option to select the preset key identifier to be swapped out for the appropriate key in the Backend, I didnt want the Frontend containing any secure information or processing any complex logic only managing state.

My Backend Server is intended to manage the request for an API call, swap out the Key identifier for the Secure Key and process the call, with a Middleware function managing the individual Key counter, limiting the calls while parsing the rejections to the Frontend.

### Limitations

I have not successfully been able to implement a unit test suite like I intended, I have manually user tested to the point I am confident. Unit testing it something I understand is extremly important to a developers role, and therefore I am committed to learning it and getting it right.  But unfortunately I was unable to get it working in this application.

While there are a fair few *nice to haves* I would've liked to include, I tried to stick as close to the challenge requirement as possible, although i did add the image icon that came with the weather response.

#### Thank you for rewieing my submission.
#### Cooper Viktor.
#### email: im.cooperviktor@gmail.com
#### phone: 0401205545