/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/15/12
 * Time: 10:01 PM
 * To change this template use File | Settings | File Templates.
 */
var userLogin_model = require('../models/login');
var app_model = require('../models/app');
const DEFAULT_APP_NAME = "Default-App";

exports.view = function (req, res) {
    res.render('login', { title:'Login', redir:req.query.redir, loginBtn:false });
}

exports.signUpView = function (req, res) {
    res.render('signup', { title:'Sign up', redir:req.query.redir, loginBtn:false });
}

exports.accountView = function(req, res){
    res.render('account', { title:'My Account' });
}

exports.loginUser = function (req, res) {
    userLogin_model.loginUser(req, req.body.userTextBox, req.body.passTextBox, function (err, result) {
        if (err) {
            res.locals.errors.warn = err;
            res.renderWithOptions('login', { title:'Login', redir:req.body.redir,
                loginBtn:false });
        }
        else {
            var splt = result.sessionKey.split('_');
            req.session.sessionKey = splt[0];
            req.session.user = result.user;
            res.redirect(req.body.redir || '/');
        }
    });
}

exports.updateUser = function(req, res){
    userLogin_model.updateUser(req,function(err){
        // todo: err handling
        res.redirect('/login/account');

    });
}

exports.registerUser = function (req, res) {
    userLogin_model.regUser(req, req.body.userTextBox, req.body.passTextBox, function (err, result) {

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
}

exports.logout = function (req, res) {
    req.session.sessionKey = undefined;
    req.session.user = undefined;
    res.redirect('/');
};

exports.isUserExists = function (req, res) {
    userLogin_model.isUserExists(req, req.params.userName, function (err, result) {
        if (err)
            return res.json({error:err});

        res.json({result:result });
    });
}