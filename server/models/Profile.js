const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    avatar: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    timesPerWeek: {
        type: String,
    },
    goals: [
        {
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            completed: {
                type: Boolean,
                default: false
            },
            completedAt: {
                type: Number,
                default: null
            },
        }
    ],
    stats: [
        {
            weight: {
                type: String
            },
            fatPercentage: {
                type: String,
            },
            totalbodywater: {
                type: String,
            },
            muscle: {
                type: String,
            },
            boneDensity: {
                type: String,
            },
            rightArm: {
                type: String,
            },
            leftArm: {
                type: String,
            },
            rightLeg: {
                type: String,
            },
            leftLeg: {
                type: String,
            },
            hip: {
                type: String,
            },
            belly: {
                type: String,
            },
            butt: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);