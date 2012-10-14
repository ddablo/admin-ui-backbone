/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/27/12
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */
const places_collection = 'places';

exports.createPlace = function (req, appId, name, desc, loc, callback) {
    var mongoRef = req.mongoRef;

    if (!appId || !name || !loc)
        return callback(req.errorHelper.invalidArguments);

    loc.lon = parseFloat(loc.lon);
    loc.lat = parseFloat(loc.lat);

    appId = mongoRef.ObjectID.createFromHexString(appId);

    var doc = {
        name:name,
        description:desc,
        loc:loc,
        appOBJID:appId
    };

    var opts = { safe:true };
    mongoRef.collection(places_collection).insert(doc, opts, callback);
};

exports.updatePlace = function (req, appId, placeId, name, desc, callback) {
    var mongoRef = req.mongoRef;

    if (!appId || (!name && !desc))
        return callback(req.errorHelper.invalidArguments);

    appId = mongoRef.ObjectID.createFromHexString(appId);
    placeId = mongoRef.ObjectID.createFromHexString(placeId);

    var doc = {
        _id: placeId,
        appOBJID:appId
    };

    var update = {$set: {}};

    if (name) {
        update.$set.name = name;
    }

    if (desc) {
        update.$set.description = desc;
    }

    var opts = { new:true };

    var sort = [];

    mongoRef.collection(places_collection).findAndModify(doc, sort, update, opts, callback);
};

exports.getAppPlaces = function (req, appId, callback) {
    var mongoRef = req.mongoRef;

    if (!appId)
        return callback(req.errorHelper.invalidArguments);

    appId = mongoRef.ObjectID.createFromHexString(appId);

    var doc = {
        appOBJID:appId
    };

    mongoRef.collection(places_collection).findItems(doc, callback);
};

