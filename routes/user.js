
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req,res){
    res.json({
        id:'323223',
        userName: req.body.inputEmail
    });
}