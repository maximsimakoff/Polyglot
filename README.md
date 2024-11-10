# Polyglot

Polyglot is an innovative web-based application designed to translate code from one programming language to another seamlessly. The app leverages the power of the OpenAI API to support multiple programming languages and provides an interactive, user-friendly interface for code conversion.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project
Polyglot is built to help developers and coding enthusiasts convert code snippets from one language to another effortlessly. Whether you are learning new languages or need quick translations for development projects, Polyglot makes it easier with a simple and clean interface.

### Key Features:
- **Language Translation**: Convert code between C, C++, Python, Java, and Assembly.
- **Interactive UI**: Select input and output languages and watch your code translate with ease.
- **Input Validation**: Ensures that the input language matches the content format and throws an error if not.
- **Visual Background Effects**: Includes an animated matrix-style background with green and sporadic red letters.
- **Timed Button Lock**: A 30-second cooldown after each "Convert!" click to prevent spamming API requests.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: OpenAI API
- **Deployment**: Vercel
- **Version Control**: Git and GitHub

## Setup and Installation
### Prerequisites:
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Steps:
1. Clone the repository:
   ```bash
   git clone git@github.com:maximsimakoff/Polyglot.git
   cd Polyglot
Install necessary dependencies (if any):

bash
Copy code
npm install
Create a .env file for environment variables:

env
Copy code
OPENAI_API_KEY=your_openai_api_key
Run the project locally:

bash
Copy code
npm start
Push your changes to GitHub if you make edits:

bash
Copy code
git add .
git commit -m "Your commit message"
git push -u origin main
Usage
Open the Polyglot application.
Select the input language and output language using the provided buttons.
Enter the code in the input box and click "Convert!".
The converted code will appear in the output box.
Cooldown Timer:
The "Convert!" button locks for 30 seconds after each click to prevent multiple rapid submissions. A countdown timer replaces the button text during this period.
Matrix Background:
The background includes a matrix-style effect with green letters and random red letters that move in various directions. This enhances the user experience with visual stimulation.
Code Overview
Key JavaScript Functions:
generateResponse(language, code): Sends API requests to OpenAI to translate the code.
handleConversion(): Handles the logic for validating and initiating the code conversion.
generateRedLetters(): Generates red letters that move randomly on the screen for the background effect.
draw(): Handles the drawing logic for the matrix-style background.
Event Listeners:
DOMContentLoaded: Sets up event listeners for buttons and initializes the auto-resize function for text areas.
click event on the "Convert!" button: Triggers the conversion process and starts the cooldown timer.
Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

Steps to Contribute:
Fork the project.
Create a feature branch:
bash
Copy code
git checkout -b feature/your-feature
Commit your changes:
bash
Copy code
git commit -m "Add your feature"
Push to your branch:
bash
Copy code
git push origin feature/your-feature
Open a pull request.

License
Distributed under the MIT License. See LICENSE for more information.

Contact
Maxim Simakoff
