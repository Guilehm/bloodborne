const mongoose = require('mongoose');

const StoriesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: String,
    description: String,
    resourceURI: String,
    type: String,
    modified: String,
    thumbnail: {
        path: {
            type: String,
        },
        extension: {
            type: String,
        }
    },
    creators: Object,
    characters: Object,
    series: Object,
    comics: Object,
    events: Object,
    originalIssue: {
        resourceURI: {
            type: String
        },
        name: {
            type: String
        }
    },
}, {
    versionKey: false,
});

const Stories = mongoose.model('Stories', StoriesSchema);

module.exports = Stories;
