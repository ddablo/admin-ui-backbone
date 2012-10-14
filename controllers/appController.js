/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/24/12
 * Time: 11:09 PM
 * To change this template use File | Settings | File Templates.
 */
var app_model = require('../models/appModel');
var userLogin_model = require('../../admin-ui-backbone/models/userLoginModel');

exports.view = function(req,res){
    userLogin_model.getLoggedUserObjectId(req, function(err, userObjectId){
        if(err)
            return res.json({err: err});

        app_model.getUserApps(req, userObjectId, function(err, result){
            if(err){
                return res.json({err: err});
            }
            res.locals.apps = result;
            res.render('myApps', { title: 'My Apps' });
        });
    });
}

exports.setSelectedApp = function(req,res){
    var appid = req.params.appid;
    app_model.getAppById(req, appid, function(err, app){
        if(err)
        {
            res.send(err);
            return;
        }

        req.session.selectedApp = app;
        res.redirect('/apps/places');
    });
};

//region tabs
exports.placesView = function(req,res){
    res.render('appCenter/tabs/places', { title: 'App Center' });
};

exports.settingsView = function(req,res){
    res.render('appCenter/tabs/settings', { title: 'App Center' });
};

//endregion

function updateSelected(req,res){
    if(req.body.appNameBox){
        // set changes to do
        var changes = {
            name:req.body.appNameBox
        };
        // get id of app to change
        var appid = req.session.selectedApp._id;
        // call model to do the job
        app_model.updateApp(req, appid, changes, function(err,updatedApp){

            if(updatedApp)
                req.session.selectedApp.name = updatedApp.name;
            res.redirect("/apps/settings");
        });
    }
    else{
        res.redirect("/apps/settings");
    }
}

function regenerateAppKey(req, res, id){
    app_model.replaceAppKey(req, id, function(err, updatedObj){
        if(updatedObj)
            req.session.selectedApp.app_key = updatedObj.app_key;
        res.redirect("/apps/settings");
    });
}

exports.createAppForUser = function (req,res){
    //TODO: Yoni Finish

    app_model.createUserApp(req, function(err, result){
        if(err){
            return res.json({err: err});
        }

        res.json(result);
    });
};

exports.updateSelected = updateSelected;
exports.regenerateAppKey = regenerateAppKey;
