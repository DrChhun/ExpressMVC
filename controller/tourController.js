const Tour = require('../model/tourModel');
const APIFeatures = require('../utils/apiFeatures');

// exports.aliasTopTours = (req, res, next) => {
//     req.query.limit = '5';
//     req.query.sort = '-raitingAverage,price';
//     req.query.fields = 'name,price,ratingAverage,summary,difficulty';
//     next();
// };

// file = require('../dev-data/data/tours-simple.json')

module.exports = {
    // Middleware for /top-5-cheap
    aliasTopTours : (req, res, next) => {
        req.query.limit = '5';
        req.query.sort = '-raitingAverage,price';
        req.query.fields = 'name,price,ratingAverage,summary,difficulty';
        next();
    },

    // Logical
    getAllTours: async (req, res) => {
        try {
            // 1) Filtering 
            // const queryObj = { ...req.query };
            // const excludedFields = ['page', 'sort', 'limit', 'fields'];
            // excludedFields.forEach(el => delete queryObj[el]);

            // // 2) Advanced filtering (grader than something)
            // let queryStr = JSON.stringify(queryObj);
            // //use add /g at the end to tell express to change all paramatter to $
            // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

            // let query = Tour.find(JSON.parse(queryStr));

            // 3) Sorting
            // if (req.query.sort) {
            //     const sortBy = req.query.sort.split(',').join(' ');
            //     query = query.sort(req.query.sort);
            //     //sort('price rating')
            // } else {
            //     query = query.sort('createdAt');
            // }

            // 4) Field limit
            // if (req.query.fields) {
            //     const fields = req.query.fields.split(',').join(' ');
            //     query = query.select(fields);
            // } else {
            //     query = query.select('-__v')
            // }

            // 5) Pagination
            // const page = req.query.page * 1 || 1;
            // const limit = req.query.limit * 1 || 100;
            // const skip = (page - 1) * limit;

            // query = query.skip(skip).limit(limit);

            // if (req.query.page) {
            //     const numTours = await Tour.countDocuments();
            //     if (skip >= numTours) throw new Error('This page does not exist');
            // }

            //Execute query
            const features = new APIFeatures(Tour.find(), req.query)
                .filter()
                .sort()
                .limit()
                .pagination();
            const tours = await features.query;
            // query.sort().select().skip().limit()

            res.status(200).json({
                status: 'success',
                results: tours.length,
                data: {
                    tours
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    },

    // find content by id
    getContentId: async (req, res) => {
        try {
            const tour = await Tour.findById(req.params.id);

            res.status(200).json({
                status: 'success',
                data: {
                    tours: tour
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: 'Content not found'
            })
        }
    },

    // post add content to json
    addContent: async (req, res) => {
        try {

            const newTour = await Tour.create(req.body);

            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour
                }
            })
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: "Invalid data sent! 🫵🏼😂🔥",
                error: err
            })
        }
    },

    // update data in json
    updateContent: async (req, res) => {
        try {
            const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            res.status(200).json({
                status: 'success',
                data: {
                    tour
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: "Can't update content 🙁",
                error: err
            })
        }
    },

    // delete content in json
    deleteContent: async (req, res) => {
        try {

            await Tour.findByIdAndDelete(req.params.id, req.body);
            // tour.delete
            res.status(204).json({
                status: 'success',
                data: "null"
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: "Can't delete content 🫵🏼😂",
                error: err
            })
        }
    },

    getTourStats : async (req, res) => {
        try {
            //aggregate is like a simple query use for join document like join table in mysql
            // .find() return query
            // .aggregate() return object
            // in aggregate we don't use await 
            const stats = await Tour.aggregate([
                {
                    $match: { ratingsAverage: { $gte: 4.5 } }
                },
                {
                    $group: {
                        _id: { $toUpper: '$difficulty' },
                        numTours: { $sum: 1},
                        numRatings: { $sum: '$ratingsQuantity'},
                        avgRating: { $avg: '$ratingsAverage' },
                        avgPrice: { $avg: '$price' },
                        minPrice: { $min: '$price' },
                        maxPrice: { $max: '$price' }
                    }
                },
                {
                    $sort: { avgPrice: 1 }
                },
                // {
                //     $match: { _id: { $ne: 'EASY' } }
                // }
            ]);

            res.status(200).json({
                status: 'success',
                data: {
                    stats
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            })
        }
    },

    getMonthlyPlan: async (req, res) => {
        try {
            const year = req.params.year * 1; // 2021

            const plan = await Tour.aggregate([
                {
                    $unwind: '$startDates'
                },
                {
                    $match: {
                        startDates: {
                            $gte: new Date(`${year}-01-01`),
                            $lte: new Date(`${year}-12-31`)
                        }
                    }
                },
                {
                    $group: {
                        _id: { $month: '$startDates'},
                        numTourStarts: { $sum: 1 },
                        tours: { $push: '$name' }
                    }
                },
                {
                    $addFields: { month: '$_id' }
                },
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $sort: { numTourStarts: -1 }
                },
                {
                    $limit: 12
                }
            ]);

            res.status(200).json({
                status: 'success',
                data: {
                    plan
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    }

}
