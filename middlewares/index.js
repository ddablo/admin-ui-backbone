var helpers = require('../helpers');

exports.addAdminUILocals = function (req, res, next) {
    res.locals.session = req.session;
    res.locals.errors = {};
    req.errorHelper = helpers.errorHelper;
    req.dbHelper = helpers.dbHelper;

    res.renderWithOptions = function(view, locals, callback){

        for(var key in res.locals.errors){
            res.locals.errors[key] = helpers.errorHelper.getUserMessage(res.locals.errors[key]);
        }

        res.render(view, locals, callback);
    };

    next();
};

exports.requiresLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login?redir=' + req.url);
    }
};