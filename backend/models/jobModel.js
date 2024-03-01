const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },

    companyName: {
        type: String,
        required: true
    },

    companyLogo: {
        type: String,
        required: true,
        min: 6
    },

    minPrice: {
        type: String,
        required: true,
    },

    maxPrice: {
        type: String,
        required: true,
    },

    salaryType: {
        type: String,
        required: true,
    },

    jobLocation: {
        type: String,
        required: true,
    },

    experienceLevel: {
        type: String,
        required: true,
    },

    employmentType: {
        type: String,
        required: true,
    },

    employmentType: {
        type: String,
        required: true,
    },

    postingDate: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    postedBy: {
        type: String,
        required: true
    }


}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);