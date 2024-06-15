const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    userimage: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCI1DP3A7pbP7IK0IB8ZBjqd8OEglM903WXQ&s',
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },

    role: {
        type: Number,
        default: 0
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
    ]
}, { timestamps: true })


module.exports = mongoose.model('user ', userSchema);