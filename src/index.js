import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let female;
let male;
let inputWeight;
let inputHeight;
let inputAge;
await askWeight();
await askHeight();
await askAge();

// REE- get weight, height, age, gender
async function askWeight() {
  const weight = await inquirer.prompt({
    name: "weight",
    type: "input",
    message: "Please enter your weight in kg",
  });
  inputWeight = weight.inputWeight;
}

async function askHeight() {
  const height = await inquirer.prompt({
    name: "height",
    type: "input",
    message: "Please enter your height in cm",
  });
  inputHeight = height.inputHeight;
}

async function askAge() {
  const age = await inquirer.prompt({
    name: "age",
    type: "input",
    message: "Please enter your age",
  });
  inputAge = age.inputAge;
}

// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 = REE- MEN
// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161 = REE- WOMEN

// TDEE- sedentary (REE X 1.2), light  (REE x 1.375), moderate (REE x 1.55), v active (REE x 1.725)

// for weight loss or gains?
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
