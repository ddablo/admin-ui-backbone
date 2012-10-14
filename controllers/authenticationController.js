/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/15/12
 * Time: 10:01 PM
 * To change this template use File | Settings | File Templates.
 */
var authModel = require('../models/authentication');
var app_model = require('../models/app');
const DEFAULT_APP_NAME = "Default-App";

exports.loginUser = function (req, res) {
    authModel.login(req, res, req.body.inputEmail, req.body.inputPassword, res.jsonWithOptions);
}

exports.registerUser = function (req, res) {
    authModel.register(req, res, req.body.inputEmail, req.body.inputPassword, res.jsonWithOptions);

    /*userLogin_model.regUser(req, req.body.userTextBox, req.body.passTextBox, function (err, result) {

        if (err) {
            res.locals.errors.warn = err;
            res.renderWithOptions('signup', { title:'Signup', redir:req.body.redir,
                loginBtn:false});
        }
        else {

            var splt = result.sessionKey.split('_');
            req.session.user = result.user;
            //create default app for new users.
            app_model.createUserApp(req, result.user._id, DEFAULT_APP_NAME, function (err, result) {
                if (err) {
                    res.locals.errors.warn = err;
                    res.renderWithOptions('signup', { title:'Signup', redir:req.body.redir,
                        loginBtn:false});
                }
                else {
                    req.session.sessionKey = splt[0];
                    res.redirect('/apps');
                }
            });
        }
    });
    */
}

exports.logoutUser = function (req, res) {
    //clear session
    req.session.user = undefined;

    //result ok
    res.jsonWithOptions(undefined, []);
};

exports.isUserExists = function (req, res) {
  authModel.isUserExists(req, res, req.body.inputEmail, res.jsonWithOptions);
}