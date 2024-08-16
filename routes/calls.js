const express = require('express');
const router = express.Router();
const Call = require('../models/Call');
const CallNote = require('../models/CallNote');

// 2.1 Create a New Call
router.post('/', async (req, res) => {
    try {
        const call = new Call(req.body);
        await call.save();
        res.json({ success: true, call });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2.2 Retrieve All Calls
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.caller) filter.caller = req.query.caller;
        if (req.query.participant) filter.participants = req.query.participant;
        if (req.query.related_entity_type && req.query.related_entity_id) {
            filter['related_entity.type'] = req.query.related_entity_type;
            filter['related_entity.entity_id'] = req.query.related_entity_id;
        }
        const calls = await Call.find(filter);
        res.json({ success: true, calls });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2.3 Retrieve a Single Call
router.get('/:call_id', async (req, res) => {
    try {
        const call = await Call.findById(req.params.call_id);
        if (!call) return res.status(404).json({ success: false, message: 'Call not found' });
        res.json({ success: true, call });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2.4 Update a Call
router.put('/:call_id', async (req, res) => {
    try {
        const call = await Call.findByIdAndUpdate(req.params.call_id, req.body, { new: true });
        if (!call) return res.status(404).json({ success: false, message: 'Call not found' });
        res.json({ success: true, call });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2.5 Delete a Call
router.delete('/:call_id', async (req, res) => {
    try {
        const call = await Call.findByIdAndDelete(req.params.call_id);
        if (!call) return res.status(404).json({ success: false, message: 'Call not found' });
        res.json({ success: true, message: 'Call deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2.6 Add Notes to a Call
router.post('/:call_id/notes', async (req, res) => {
    try {
        const note = new CallNote({
            call_id: req.params.call_id,
            ...req.body
        });
        await note.save();
        res.json({ success: true, note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
