const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contributors: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            message: {
                type: String,
                required: true,
            },
        },
    ],

    images: [
        {
            type: String,
            required: true
        },

    ]
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
