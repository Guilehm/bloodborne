const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    id: {
        type: String,
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
    comics: String,
    series: String,
    stories: String,
    events: String,
    urls: Object,
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;