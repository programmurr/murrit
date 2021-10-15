# Murrit - A Reddit Clone

Capstone JavaScript project from [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/final-project).

*"Replicate your favorite website as close as possible - Pinterest, Facebook, Twitter, etc. Just make sure it has lots of interesting functionality. You’ll be integrating a full array of skills into this one. If you have completed a backend course, you may use that for this project, otherwise use Firebase. This should prove that you now have all the tools and knowledge needed to build a website, just like the ones you use every day."*

## Core Technologies
- [ReactJS](https://reactjs.org/)
  - [Styled Components](https://styled-components.com/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [React Router DOM](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/)
  - Authentication
  - Cloud Firestore
  - Cloud Storage
  - Hosting

## Features
- User accounts
- Text posts with markdown
- Image posts facilitated with Drag and Drop and File APIs
- Data pagination with infinite scrolling
- Board creation by users
- New/Highest vote count sorting

## Installation Instructions (Mac/Linux)

*Please not these instructions are for personal use. The Firebase Emulator Suite requires linking your Google account
to the Firebase CLI. If you install the CLI and link your account, you will be authorised to install and run your
projects but not mine.*

Follow the steps and enter the commands in your terminal.  

1. Clone the repo
    - `git clone git@github.com:programmurr/murrit.git`

2. Enter the murrit directory
    - `cd murrit`

3. Install dependencies
    - `npm install`

4. Install the Firebase CLI
    - `curl -sL https://firebase.tools | bash`

5. Check if you have Java installed
    - `java -version`

6. If you do not have Java, install it with these commands
    - `sudo apt update`
    - `sudo apt install default-jre`
    - `sudo apt install default-jdk`

7. Verify installations
    - `java -version`
    - `javac -version`

8. Connect the Firebase CLI to your Google account
    - `firebase login`

9. Run the emulators
    - `firebase emulators:start`

10. Open a new terminal tab in the same directory and run the React app
    - `npm start`

A development instance of murrit should now be running in 
the browser. At the moment, data will not persist beyond emulator
shutdown. [Follow the documentation](https://firebase.google.com/docs/emulator-suite/install_and_configure#startup) to set up test data.

## Status

Live! View it on [Firebase](https://murrit-ec42e.web.app).
