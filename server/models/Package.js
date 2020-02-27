const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
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
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    completed: {
        type: Date,
    },
    status: {
        type: String,
        default: "active"
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

PackageSchema.pre('remove', async function (next) {
    await this.model('Session').deleteMany({ package: this._id });
    next();
})

//Reverse populate with virtuals
PackageSchema.virtual('sesh', {
    ref: 'Session',
    localField: '_id',
    foreignField: 'package',
    justOne: false
});


module.exports = Package = mongoose.model('Package', PackageSchema);