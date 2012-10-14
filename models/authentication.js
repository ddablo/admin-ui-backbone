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

var isUserExists = function (req, res, userName, callback) {
    var query = {"uid":userName};

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
            return res.jsonWithOptions(undefined, {user_name:regUser.uid});
        });
    });
};

exports.isUserExists = isUserExists;