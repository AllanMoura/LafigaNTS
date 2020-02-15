const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const npcSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    race: {type: String, required: false},
    occupation: {type: String, required: false},
    location: {type: String, required: false},
    description: {type: String, required: false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    createdAt: {type: Date, default: Date.now()}
});

npcSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Npc', npcSchema);