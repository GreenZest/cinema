/**
 * PostController
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
    
    'new' : function (req, res) {
      Tag.find().done(function(err,tags){
        res.view({err:err, tags:tags});
      });
    },

    create : function(req,res,next) {
    	Post.create( req.params.all(), function(err,post) {
    		if(err) {
    			console.log(err);
    		}
    		else {
          /////////// создать ассоциации для тегов
          if(req.param('tags')) {
            tags = req.param('tags')[0];
            tags.forEach(function(tagname){
              Tag.findOneBySlug(tagname, function(err,tag) {
                if(err) return next(err);
                Tag_assoc.create({
                  tag_id: tag.id,
                  post_id: post.id,
                  type: "tag"
                }, function(err, assoc) {
                  if(err) return next(err);
                });
              });
            });
          }
          ///////////////////////////
    			console.log(post);
    		}
    		res.redirect('/posts');
    	} );
    },

    admin_index : function (req, res) {
    	Post.find().done(function(err,posts){
        var index = posts.length;
        posts.forEach(function(post, i) {
          Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, tags) {
            if(err) return next(err);
            index--;
            posts[i].tags = tags.rows;
            // console.log(tags.rows);
            if(index < 1) {
              console.log(posts);
              res.view({
                posts : posts
              }); 
            }
          });
        });
    	});
    	
    },

    'delete' : function (req, res) {
    	// Post.findOne(req.param('id')).done(function(err,post){
  		Post.destroy(req.param('id')).done(function(err){
  			if(!err) res.redirect('/posts');
  		});
    	// })
    },

    upload_file : function(req, res) {
    var fs = require('fs');
    console.log(req.files);

    fs.readFile(req.files.upload.path, function (err, data) {
    // save file
        var newPath = 'assets/files/' + req.files.upload.name;
            fs.writeFile(newPath, data, function (err) {
            if (err) return res.view({err: err});
            // redirect to next page
              html = "";
              html += "<script type='text/javascript'>";
              html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
              html += "    var url     = \"/files/" + req.files.upload.name + "\";";
              html += "    var message = \"Uploaded file successfully\";";
              html += "";
              html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
              html += "</script>";

              res.send(html);
        });

        });
  
    },
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostController)
   */
  _config: {}

  
};
