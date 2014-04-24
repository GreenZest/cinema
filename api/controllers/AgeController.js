/**
 * AgeController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  show: function(req,res,next) {
    Tag.find().done(function(err,alltags){
      Post.find().where( { age_id:req.param('id') } ).done(function(err,posts){
        var index = posts.length;
        if(posts.length <1 ) {
          res.view('post/query',{
            posts : [],
            alltags: []
          });
          return;
        }
        posts.forEach(function(post, i) {
          Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, tags) {
            if(err) return next(err);
            index--;
            posts[i].tags = tags.rows;
            if(index < 1) {
              // console.log(posts);
              res.view('post/query', {
                posts : posts,
                alltags : alltags
                // tags : tags
              }); 
            }
          });
        });
      });
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AgeController)
   */
  _config: {}

  
};
