const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{2}-\d{6,}|\d{3}-\d{5,}/.test(v)
            },
            message: props => `${props.value} is incorrectly formatted. Please make sure the first part of your number is 2-3 digits and that the total length of the number is at least 8 digits.`
        }
    }
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)