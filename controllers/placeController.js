/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/27/12
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
var place_model = require('../models/placeModel');
var app_model = require('../models/appModel');

function getDefaultAppPlaces(req, res) {
    var appId = req.session.selectedApp._id;

    place_model.getAppPlaces(req, appId, function (err, places) {
        if (err)
            return res.json(err);

        return res.json(places);
    });
};

exports.createPlace = function (req, res) {
    var appId = req.session.selectedApp._id;

    place_model.createPlace(req, appId, req.body.name, req.body.description, req.body.loc, function (err, places) {
        if (err)
            return res.json(err);

        res.json(places[0]);
    });
};

exports.updatePlace = function (req, res) {
    var appId = req.session.selectedApp._id;
    var placeId = req.body._id;

    place_model.updatePlace(req, appId, placeId, req.body.name, req.body.description, function (err, place) {
        if (err)
            return res.json(err);

        res.json(place);
    });
};

exports.getPlaces = function (req, res) {
    getDefaultAppPlaces(req, res, function (err, places) {
        if (err)
            return res.json({err:err});

        res.json(places);
    });
};


exports.view = function (req, res) {
    getDefaultAppPlaces(req, res, function (err, places) {
        if (err)
            return res.json({err:err});

        res.locals.places = places;
        res.render('appCenter', { title:'App Center' });
    });
};


