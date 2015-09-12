var Psa = require('mongoose').model('Psa');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res, next) { 
    var psa = new Psa(req.body);
    psa.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(psa);
        }
    });
};

exports.list = function(req, res, next) {
    Psa.find({}, function(err, psas) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.render('psas', {
                psas: psas
            });
        }
    });
};

exports.read = function(req, res) {
    res.json(req.psa);
};

exports.photoByID = function(req, res, next, id) {
    Psa.findOne({
            _id: id
        }, 
        function(err, psa) {
            if (err) {
                return next(err);
            }

            if (!psa) {
                return next(new Error('Failed to load psa ' + id));
            }

            req.psa = psa;
            next();
        }
    );
};

exports.update = function(req, res, next) {
    Psa.findByIdAndUpdate(req.psa.id, req.body, function(err, psa) {
        if (err) {
            return next(err);
        }
        else {
            res.json(psa);
        }
    });
};

exports.delete = function(req, res, next) {
    req.psa.remove(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.psa);
        }
    })
};