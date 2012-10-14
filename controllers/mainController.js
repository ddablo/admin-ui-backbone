/**
 * Created with JetBrains WebStorm.
 * User: farin99
 * Date: 8/22/12
 * Time: 10:05 PM
 * To change this template use File | Settings | File Templates.
 */

exports.view = function(req, res){
    res.render('main', { title: 'Welcome to Placer', ignoreDefaultBack:true });

};

exports.consoleView = function(req, res){
    res.render('console', { title: 'Console' });
};