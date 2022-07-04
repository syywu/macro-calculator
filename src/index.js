import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let female;
let male;
let inputWeight;
let inputHeight;
let inputAge;
let ree;
let tdee;
let calories;
await askWeight();
await askHeight();
await askAge();
await getGender();
await calculateREE();
await calculateTDEE(ree);
await goals(tdee, inputWeight);
await dailyFat(calories);
await dailyCarbs(calories);

// REE- get weight, height, age, gender
async function askWeight() {
  const weight = await inquirer.prompt({
    name: "input_weight",
    type: "input",
    message: "Please enter your weight in kg\n",
  });
  inputWeight = weight.input_weight;
}

async function askHeight() {
  const height = await inquirer.prompt({
    name: "input_height",
    type: "input",
    message: "Please enter your height in cm\n",
  });
  inputHeight = height.input_height;
}

async function askAge() {
  const age = await inquirer.prompt({
    name: "input_age",
    type: "input",
    message: "Please enter your age\n",
  });
  inputAge = age.input_age;
}

async function getGender() {
  const answers = await inquirer.prompt({
    name: "gender",
    type: "list",
    message: "Please select your gender\n",
    choices: ["Female", "Male"],
  });
  if (answers.gender === "Female") {
    female = answers.gender;
  } else {
    male = answers.gender;
  }
}

async function calculateREE() {
  if (male) {
    ree = 10 * inputWeight + 6.25 * inputHeight - 5 * inputAge + 5;
  } else {
    ree = 10 * inputWeight + 6.25 * inputHeight - 5 * inputAge - 161;
  }
  return ree;
}

// TDEE- sedentary (REE X 1.2), light  (REE x 1.375), moderate (REE x 1.55), v active (REE x 1.725)
async function calculateTDEE(ree) {
  const answers = await inquirer.prompt({
    name: "TDEE",
    type: "list",
    message: "What is your activity level?\n",
    choices: ["Sedentary", "Light", "Moderate", "Heavy"],
  });
  switch (answers.TDEE) {
    case "Sedentary":
      tdee = ree * 1.2;
      break;
    case "Light":
      tdee = ree * 1.375;
      break;
    case "Moderate":
      tdee = ree * 1.55;
      break;
    default:
      tdee = ree * 1.725;
  }
  return tdee;
}

// for weight loss or gains?
async function goals(tdee, inputWeight) {
  let proteinIntake;
  const answers = await inquirer.prompt({
    name: "weight_goal",
    type: "list",
    message: "What is your goal?\n",
    choices: ["Weight Loss", "Muscle gains"],
  });
  if (answers.weight_goal === "Weight Loss") {
    calories = tdee - tdee * 0.2;
    proteinIntake = inputWeight * 0.8;
  } else {
    calories = tdee + tdee * 0.2;
    proteinIntake = inputWeight * 1.5;
  }
  console.log(`Your daily calories intake is ${Math.floor(calories)}`);
  console.log(`Your daily protein intake is ${proteinIntake} grams`);
}

async function dailyFat(calories) {
  const fatIntake = Math.floor((calories * 0.25) / 9);
  console.log(`Your daily fat intake is ${fatIntake} grams`);
}

async function dailyCarbs(calories) {
  const carbsCal = Math.floor(calories / 2 + calories / 10 / 2);
  const carbsIntake = carbsCal / 4;
  console.log(`Your daily carbs intake is ${carbsIntake} grams`);
}
