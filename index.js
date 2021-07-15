const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allMemberQs = [
    {
        type: "input",
        message: "Team Member's Name:",
        name: "name"
    },

    {
        type: "input",
        message: "Team Member's ID:",
        name: "id"
    },

    {
        type: "input",
        message: "Team Member's Email:?",
        name: "email"
    },
]

const managerQ = [
    {
        type: "input",
        message: "Office Number:",
        name: "officeNum",
    },
]
const engineerQ = [
    {
        type: "input",
        message: "Github Name:",
        name: "githubName"
    }
]
const internQ = [
    {
        type: "input",
        message: "School's Name",
        name: "school"
    }
]

const roleQ = [
    {
        type: "list",
        message: "What type of team member would you like to add?",
        name: "teamMember",
        choices: ["Engineer", "Intern", "Do Not Add"]
    }

]

let employees = []
let person;

async function init() {
    console.log ("Manager details:");
    const allMemberAs = await inquirer.prompt(allMemberQs);
    const managerAs = await inquirer.prompt(managerQ);
    person = new Manager(allMemberAs.name, allMemberAs.id, allMemberAs.email, managerAs.officeNum);
    employees.push(person);
    console.log(employees)
    otherMembers();
}
init ();

async function otherMembers() {
    const chooseMem = await inquirer.prompt(roleQ);
    if (chooseMem.teamMember === "Engineer") {
        const allEngineerA  = await inquirer.prompt(engineerQ);
        const generalEngQs = await inquirer.prompt(allMemberQs);
        person = new Engineer(generalEngQs.name, generalEngQs.id, generalEngQs.email, allEngineerA.githubName)
        employees.push(person);
        otherMembers();
    } else if (chooseMem.teamMember === "Intern") {
        const allInternA  = await inquirer.prompt(internQ);
        const generalInQs = await inquirer.prompt(allMemberQs);
        person = new Intern(generalInQs.name, generalInQs.id, generalInQs.email, allInternA.school)
        employees.push(person);
        otherMembers();

    } else if (chooseMem.teamMember ==="Do Not Add") {
        fs.writeFile(outputPath, render(employees), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("File is saved!")
        })
        return;
    }

}