const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must provide a name!'],
    },
    email: {
        type: String,
        required: [true, 'User must provide an email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number!'],
        unique: true,
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    department: {
        type: String,
        required: [true, 'Please provide your current department!'],
        lowercase: true,
        enum: ['computer science', 'mathematics', 'physics', 'insurance', 'accounting'],
    },
    level: {
        type: Number,
        required: [true, 'Please provide your current level!'],
    },
    role: {
        type: String,
        enum: ['student', 'representative', 'admin'],
        default: 'student',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            /* This only works on CREATE and SAVE, so when we want to update the user's
            password we should use the .save not findOneAndUpdate */
            validator: function (val) {
                return this.password === val;
            },
            message: 'Password did NOT match!',
        },
    },
    savedAssignments: [{ type: mongoose.Schema.ObjectId}],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
});

// HASH PASSWORD BEFORE SAVING TO THE DATABASE
userSchema.pre('save', async function (next) {
    // Only hash when password is just created or when updating the password.
    if (!this.isModified('password')) return next();
    // Save the new hashed password as the password
    this.password = await bcrypt.hash(this.password, 12);

    // Delete password confirm field
    this.passwordConfirm = undefined;
    next();
});

// SET passwordChangeAt WHEN USER UPDATE HIS/HER PASSWORD
userSchema.pre('save', function (next) {
    // Only set passwordChangeAt if the password is modified and also not on new user
    if (!this.isModified('password') || this.isNew) return next();
    /* Set it by back-timing it by 1s because sometimes the token is issued before 
    the document is saved */
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// DON'T INCLUDE DELETED USERS ON QUERY
userSchema.pre('find', function (next) {
    this.find({ active: { $ne: false } });
    next();
});

// DOCUMENT METHOD TO COMPARE ENCRYPTED AND NON-ENCRYPTED PASSWORDS
userSchema.methods.correctPassword = async (
    candidatePassword,
    userEncryptedPassword
) => {
    // can't use this.password because select is set to false on the password field.
    return await bcrypt.compare(candidatePassword, userEncryptedPassword);
};

// DOCUMENT METHOD TO CHECK IF USER HAS CHANGED PASSWORD AFTER TOKEN HAS BEEN ISSUED
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        // convert from miliseconds to seconds
        const passwordChangedTime = this.passwordChangedAt.getTime() / 1000;

        return JWTTimeStamp < passwordChangedTime;
    }
    // means password has NOT been changed after issuing JWT.
    return false;
};

// CREATE PASSWORD RESET TOKENS FOR USERS THAT FORGOT THEIR PASSWORD
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save hashed version of the token in the database
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // token expired after 10 minutes
    this.passwordResetExpired = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
