const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CallSchema = new Schema({
    call_type: { type: String, enum: ['Inbound', 'Outbound'], required: true },
    call_time: { type: Date, required: true },
    duration: { type: Number, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    caller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    related_entity: {
        type: { type: String, enum: ['Lead', 'Contact', 'Account', 'Opportunity'], required: true },
        entity_id: { type: Schema.Types.ObjectId, required: true }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, enum: ['Completed', 'Scheduled', 'Missed'], required: true }
});

CallSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Call = mongoose.model('Call', CallSchema);

module.exports = Call;
