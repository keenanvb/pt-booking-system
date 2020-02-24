const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    bookedByAdmin: {
        type: Boolean,
    },
    type: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: null
    },
    package: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package'
    },
    users: [{
        name: {
            type: String,
            require: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }],
    createAt: {
        type: Date,
        default: Date.now
    },
    confirmation: {
        type: Boolean,
        default: false
    },
    clientCancelled: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        require: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    }
});

module.exports = Booking = mongoose.model('Booking', BookingSchema);