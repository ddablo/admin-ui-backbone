/**
 * Created with JetBrains WebStorm.
 * User: Daniboy
 * Date: 8/14/12
 * Time: 5:15 PM
 * To change this template use File | Settings | File Templates.
 */
Model = {
    login: require('./userLoginModel')
  ,  main: require('./mainModel')
  ,   app: require('./appModel')
  , place: require('./placeModel')
};

module.exports = Model;