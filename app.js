/* process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
 */

/* const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your name?`, (name) => {
  console.log(`Hi ${name}!`);
  readline.close();
}); */

/*  const args = require("minimist")(process.argv.slice(2));

console.log(args["name"]); //joe */

const inquirer = require("inquirer");

let questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
  {
    type: "password",
    mask: "*",
    name: "password",
    message: "Enter your password:",
    validate: "Lucas",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Hi ${answers["name"]}!`);
  console.log(`Korrekt!`);
});
