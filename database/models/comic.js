const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    digitalId: Number,
    title: String,
    issueNumber: Number,
    variantDescription: String,
    description: String,
    modified: String,
    isbn: String,
    format: String,
    pageCount: Number,
    textObjects: Object,
    resourceURI: String,
    urls: Object,
    series: Object,
    variants: Array,
    collections: Array,
    collectedIssues: Array,
    dates: Object,
    prices: Object,
    thumbnail: {
        path: {
            type: String,
        },
        extension: {
            type: String,
        }
    },
    images: Object,
    creators: Object,
    characters: Object,
    stories: Object,
    events: Object,
}, {
    versionKey: false,
});

const Comic = mongoose.model('Comic', ComicSchema);

module.exports = Comic;
