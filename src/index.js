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
await goals(tdee);

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
    console.log(female);
  } else {
    male = answers.gender;
    console.log(male);
  }
}

async function calculateREE() {
  if (male) {
    ree = 10 * inputWeight + 6.25 * inputHeight - 5 * inputAge + 5;
  } else {
    ree = 10 * inputWeight + 6.25 * inputHeight - 5 * inputAge - 161;
  }
  console.log(ree);
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
  console.log(tdee);
  return tdee;
}

// for weight loss or gains?
async function goals(tdee) {
  const answers = await inquirer.prompt({
    name: "weight_goal",
    type: "list",
    message: "What is your goal?\n",
    choices: ["Weight Loss", "Muscle gains"],
  });
  if (answers.weight_goal === "Weight Loss") {
    calories = tdee - tdee * 0.2;
  } else {
    calories = tdee + tdee * 0.2;
  }
  console.log(Math.floor(calories));
  return Math.floor(calories);
}
// Weight loss TDEE = 3,250 – (3250 x .20) = 2,600 Calories
// Weight gain TDEE = 3,250 + (3250 x .20) = 3,900 Calories

/*
Daily protein calories
When already lean and lifting heavy for bodybuilding use a measure of 1 g of protein per pound of body weight.
Most people can use a more balanced approach and use .825 g protein per pound since most people are carrying fat tissue which skews the “1 gram per pound rule.”
For people with a lot of excess fat weight or people who don’t do a lot of strength training, use .65 grams per pound of body weight.
*/

/*
How to calculate fat grams per day
3,250 Calories x 0.25 = 812.5 Calories
Divide 812.5 by 9 (9 calories per gram of fat) = 90.27g Fat (which I’d round down to 90 g).
 */

/*
How to calculate carb grams per day
We started with 3,250 Calories. We allocated 644 calories (161 g) to protein, 813 calories (90 g) to fat and we now allocate the rest, 1793 calories, to carbohydrates.
Since 1g of carb equals 4 calories we divide 1793 by 4 and get 448 g Carbohydrates.
*/
