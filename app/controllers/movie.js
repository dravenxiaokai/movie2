var Movie = require('../models/movie')
var Comment = require('../models/comment')
var _ = require('underscore')

//detail page
exports.detail = function (req, res) {
    var id = req.params.id
    Movie.findById(id, function (err, movie) {
        Comment
            .find({movie:id})
            .populate('from','name')
            .populate('reply.from reply.to','name')
            .exec(function(err,comments){
                res.render('detail', {
                    title: 'movie ' + movie.title,
                    movie: movie,
                    comments:comments
                })
        })
    })
}

//admin post movie
exports.save = function (req, res) {
    // var id =  mongoose.Types.ObjectId.createFromHexString(req.body.movie._id)
    var id = req.body.movie._id
    // console.log(id)
    var movieObj = req.body.movie
    var _movie

    if (id !== 'undefined' && mongoose.Types.ObjectId.isValid(id)) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }

            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
}

//admin page
exports.new = function (req, res) {
    res.render('admin', {
        title: '电影后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
}

//list page
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: '电影列表页',
            movies: movies
        })
    })
}

//admin update movie
exports.update = function (req, res) {
    var id = req.params.id

    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'movie 后台更新页',
                movie: movie
            })
        })
    }
}

//list delete movie
exports.del = function (req, res) {
    var id = req.query.id

    if (id) {
        Movie.remove({ _id: id }, function (err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({ success: 1 })
            }
        })
    }
}