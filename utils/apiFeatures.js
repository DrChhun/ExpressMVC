class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // aliasTopTours(req, res, next) {
    //     this.query.limit = '5';
    //     this.query.sort = '-raitingAverage,price';
    //     this.query.fields = 'name,price,ratingAverage,summary,difficulty';
    //     next();
    // }

    filter() {
        const queryObj = { ...this.queryString };
        // this two line of code below is not neccesary
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        // 2) Advanced filtering (grader than something)
        let queryStr = JSON.stringify(queryObj);
        //use add /g at the end to tell express to change all paramatter to $
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        // let query = Tour.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(req.query.sort);
            //sort('price rating')
        } else {
            this.query = this.query.sort('createdAt');
        }
        
        return this;
    }

    limit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v')
        }

        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

} 

module.exports = APIFeatures;