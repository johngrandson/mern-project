const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        validate: {
            validator: value => {
                return value === true || value === false
            },
            message: 'Field must be boolean'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    devices: {
        type: Schema.Types.ObjectId,
        ref: 'devices'
    }
});

module.exports = User = mongoose.model('users', UserSchema);