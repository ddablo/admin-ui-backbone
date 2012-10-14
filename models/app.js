/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/24/12
 * Time: 11:20 PM
 * To change this template use File | Settings | File Templates.
 */
const apps_collection = 'apps';
const admin_users_to_apps_collection = 'admin_users_to_apps';

function generateAppKey(callback){
    require('crypto').randomBytes(16, function(ex, buf) {
        if(ex){
            console.log("could not produce random api key!");
            return callback(undefined);
        }

        callback(buf.toString('hex'));
    });
}

exports.replaceAppKey = function replaceAppKey(req, id, callbacak){
    generateAppKey(function(app_key){
        var changes = {
            app_key:app_key
        };

        req.dbHelper.changeById(apps_collection, id, changes, callbacak);
    });
}

exports.getAppById = function(req, appid, callback){
    var mongoRef = req.mongoRef;
    var objId = new mongoRef.ObjectID(appid);

    var doc= {_id:objId};

    mongoRef.collection(apps_collection).findOne(doc, callback);

}

exports.getUserApps = function (req, userObjectId, callback) {
    var mongoRef = req.mongoRef;

    var doc = {userObjectId:userObjectId};
    var opts = {
        appOBJID: 1,
        _id:0 };

    //noinspection JSValidateTypes
    mongoRef.collection(admin_users_to_apps_collection).findItems(doc, opts, function(err, apps) {
        if (err)
            return callback(err, undefined);

        var appObjectIds = [];

        for(var i = 0; i < apps.length; i++){
            appObjectIds.push(apps[i].appOBJID);
        }

        var appsDoc = {
            _id : {$in : appObjectIds }
        };

        mongoRef.collection(apps_collection).findItems(appsDoc, callback);
    });
};


exports.createUserApp = function (req, userObjectId, appName, callback) {
    var mongoRef = req.mongoRef;

    if (!userObjectId || !appName)
        return callback(req.errorHelper.invalidArguments);

    generateAppKey(function(app_key){
        var doc = {
            name:appName,
            app_key: app_key ? app_key : new mongoRef.ObjectID()
        };

        var opts = { safe:true };

        mongoRef.collection(apps_collection).insert(doc, opts, function (err, app) {
            if (err)
                return callback(err, undefined);

            var doc = {
                userObjectId: userObjectId,
                appOBJID: app[0]._id
            }

            mongoRef.collection(admin_users_to_apps_collection).insert(doc, callback);
        });
    });
};

exports.updateApp = function(req, appid, changes, callback){
    req.dbHelper.changeById(apps_collection, appid, changes, callback);
};

exports.getAppObjectId = function (req, appName, callback) {
    var mongoRef = req.mongoRef;

    var doc = { name:appName };
    var opts = { _id:1 };

    mongoRef.collection(apps_collection).findOne(doc, opts, function (err, id) {
        if (err || !id)
            return callback(err, undefined);

        callback(undefined, id._id);
    });
};
