const calculateBmi = (height: number, weight: number) => {
  let bmi = (weight / (height * height)) * 10000;
  let message = "Your bmi is " + bmi.toFixed(2)

  if (bmi >= 30) {
    return message + ": Obese"
  }
  else if (bmi >= 25) {
    return message + ": Overweight"
  }
  else if (bmi >= 18.5) {
    return message + ": Normal"
  }
  else {
    return message + ": Underweight"
  }
};

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided arguments need to be numbers.")
}

console.log(calculateBmi(height, weight));