const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./utils/generateMarkdown');

const questions = [
    {
        type: "input",
        message: "Enter your Github username",    
        name: "username" 
    },
    {
        type: "input",
        message: "Enter your email address",
        name: "email"
    },
    {
        type: "input",
        message: "Enter the title of your project",    
        name: "title" 
    },
    {
        type: "input",
        message: "Enter a description of your project",
        name: "description"
    },
    {
        type: "input",
        message: "Explain how a user would install this project",
        name: "installation"
    },
    {
        type: "input",
        message: "Please provide instructions and examples for use",
        name: "usage"
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose your license for your project',
        choices: ['afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0', 'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib']
    },
    {
        type: "input",
        message: "Explain how users can contribute to your project",
        name: "contributors"
    },
    {
        type: "input",
        message: "Provide tests for project, and explain how to test (if necessary)",
        name: "tests"
    },
];

inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(response) {
            
            const githubInfo = {
                githubImage: response.data.avatar_url,
                email: response.data.email,
                profile: response.data.html_url,
                name: response.data.name
            };
            
          fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
              throw err;
            };
    
            console.log("New README file created with success!");
          });
        });

});

function init() {

}

init();