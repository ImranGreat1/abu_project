const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (Model) => {
    return catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(new AppError('Cannot find document with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            message: 'Successfully deleted the document',
        });
    });
};

exports.updateOne = (Model) => {
    return catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return the new updated document.
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError('Cannot find document with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });
};

exports.createOne = (Model) => {
    return catchAsync(async (req, res, next) => {
        // const newTour = new Tour(req.body);
        // newTour.save().then((tour) => console.log(tour));

        const newDoc = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: newDoc,
            },
        });
    });
};

exports.getOne = (Model, popOptions) => {
    return catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);

        const doc = await query;

        if (!doc) {
            return next(new AppError('Cannot find document with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: { data: doc },
        });
    });
};

exports.getAll = (Model, query) => {
    return catchAsync(async (req, res, next) => {

        let filter = {};
        // Find base on the query, if not get all the docs
        if (query) filter = query;

        // EXECUTE QUERY
        const docs = await Model.find(filter);

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                data: docs,
            },
        });
    });
};