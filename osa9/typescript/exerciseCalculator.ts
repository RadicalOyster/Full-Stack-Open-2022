interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const getRating = (target: number, average: number) => {
    if (average >= target) {
        return {
            value: 3,
            description: "You reached your target, well done!"
        }
    }

    let percentageCompleted = average / target * 100
    if (percentageCompleted > 66) {
        return {
            value: 2,
            description: "You didn't reach your target, but you're more than 2/3 of the way there, keep it up!"
        }
    }

    return {
        value: 1,
        description: "You didn't quite make is this time, but don't be discouraged."
    }
}

const calculateExercises = (hours: Array<number>, target: number) => {
    let trainingDays = 0
    let hoursExercised = 0

    for (let i in hours) {
        if (hours[i] > 0) {
            trainingDays += 1
            hoursExercised += hours[i]
        }
    }

    const rating = getRating(target, hoursExercised / hours.length)

    const results: ExerciseResult = {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: target >= hoursExercised / hours.length,
        rating: rating.value,
        ratingDescription: rating.description,
        target: target,
        average: hoursExercised / hours.length
    }

    return results
  };

  const getArguments = () => {
    const target = Number(process.argv[2])
    console.log("TARGET ", target)

    if (isNaN(target)) {
        throw new Error('Provided arguments need to be numbers')
    }

    let hours = process.argv.slice(3)
    let parsedHours = []

    for (let i in hours) {
        const number = Number(hours[i])
        
        if (!isNaN(number)) {
            parsedHours.push(number)
        }
        else {
            throw new Error('Provided arguments need to be numbers')
        }
    }

    return ({
        target: target,
        hours: parsedHours
    })
  }

  const parsedArguments = getArguments()
  const results = calculateExercises(parsedArguments.hours, parsedArguments.target);
  console.log(results)
  