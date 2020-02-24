const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    package: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package'
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking'
    },
    users: [{
        name: {
            type: String,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }],
    type: {
        type: String,
    },
    status: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
    },
});

module.exports = Session = mongoose.model('Session', SessionSchema);