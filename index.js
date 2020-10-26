const inquirer = require("inquirer");
const fs = require("fs");
const util = require("./utils/generateMarkdown.js");
const generateMarkdown = require("./utils/generateMarkdown.js");


const fileName = "README.md"

// array of questions for user
function promptUser() {
    return inquirer.prompt([
    {
        type: "input",
        message: "Enter your Github username.",    
        name: "username" 
    },
    {
        type: "input",
        message: "Enter the title of your project.",    
        name: "title" 
    },
    {
        type: "input",
        message: "Enter a description of your project.",
        name: "description"
    },
    {
        type: "input",
        message: "Explain how a user would install this project.",
        name: "installation"
    },
    {
        type: "input",
        message: "Please provide instructions and examples for use.",
        name: "usage"
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose your license for your project.',
        choices: ['afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0', 'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib']
        
    },
    {
        type: "input",
        message: "Explain how users can contribute to your project.",
        name: "contributors"
    },
    {
        type: "input",
        message: "Provide tests for project, and explain how to test (if necessary).",
        name: "tests"
    } 
       
]);

}

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your markdown file has been created.')
    });
}

// const writeFileAsync = util.promisify(fs.writeFile);

// function to initialize program
async function init() {
    try {
        const answers = await promptUser();

        const markdown = generateMarkdown(answers);

        await writeFileAsync("README.md", markdown);

        console.log("Successfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
}

// function call to initialize program
init();
