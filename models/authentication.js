/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/14/12
 * Time: 3:37 PM
 * To change this template use File | Settings | File Templates.
 */
var common = require('../public/javascripts/common');
var mongo_entity = require('mongo-entity');
var admin_users = new mongo_entity.Entity('admin_users');

var isUserExists = function (req, res, userName, password, callback) {
    if ('function' === typeof password) callback = password, password = undefined;
    var query = {"uid":userName};

    //if password was passed - add to query
    if (password) query.password = password;

    //returns true if exists (count > 0). Otherwise, false (count == 0)
    admin_users.countEntities(req, res, {query:query}, callback);
};

exports.register = function (req, res, userName, passWord, callback) {
    if (!userName || !passWord)
        return callback(req.errorHelper.invalidArguments);

    if (!common.isSignUpUserValid(userName) || !common.isSignUpPasswordValid(passWord))
        return callback(req.errorHelper.invalidSignupData);

    isUserExists(req, res, userName, function (err, isUserExists) {
        if (err) return callback(err);
        if (isUserExists) return callback(req.errorHelper.userAlreadyExists);

        var query = {uid:userName, password:passWord};

        admin_users.createEntities(req, res, {query:query}, function (err, regUser) {
            if (err) return callback(err);

            //set session - user
            req.session.user = regUser;

            //return result with user name
            return callback(undefined, {user_name:regUser.uid});
        });
    });
}

exports.login = function (req, res, userName, passWord, callback) {
    if(req.session.user) return callback(req.errorHelper.userAlreadyLoggedIn);

    var query = {uid:userName, password:passWord};

    //find user
    admin_users.findEntities(req, res, {query:query}, function (err, users) {
        if (err) return callback(err);
        if (users.length == 0) return callback(req.errorHelper.userNotExist);

        //create user session
        req.session.user = users[0];

        //return result with user name
        return callback(undefined, {user_name:regUser.uid});
    });
}

exports.isUserExists = isUserExists;