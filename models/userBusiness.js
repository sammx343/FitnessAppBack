const mongoose = require('mongoose');

const userBusinessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'admin', 'teacher', 'subscribed', ],
        default: 'subscribed'
    }
});

const UserBusiness = mongoose.model('UserBusiness', userBusinessSchema);
module.exports = UserBusiness;