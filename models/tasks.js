const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Must Provide Name"],
        trim: true,
        maxlength: [20, "Name can not be more than 20 character"],
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Task', TaskSchema);
