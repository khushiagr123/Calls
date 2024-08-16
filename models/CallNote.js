const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CallNoteSchema = new Schema({
    call_id: { type: Schema.Types.ObjectId, ref: 'Call', required: true },
    note: { type: String, required: true },
    added_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now }
});

const CallNote = mongoose.model('CallNote', CallNoteSchema);

module.exports = CallNote;
