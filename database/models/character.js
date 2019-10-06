const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    modified: Date,
    thumbnail: {
        path: {
            type: String,
        },
        extension: {
            type: String,
        }
    },
    resourceURI: String,
    comics: Object,
    series: Object,
    stories: Object,
    events: Object,
    urls: Object,
}, {
    versionKey: false,
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;