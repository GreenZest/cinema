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
        Age.find().done(function(err,ages){
          res.view({err:err, tags:tags, ages:ages});
        });
      });
    },

    edit : function (req, res, next) {
      Post.findOneById(req.param('id')).done(function(err,post){
        if(err) return next(err);
        if(!post) res.view('404.ejs');
        Tag.find().done(function(err,tags){
          Age.find().done(function(err,ages){
            Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, post_tags) {
              res.view({err:err, tags:tags, post:post, post_tags: post_tags.rows, ages:ages});
            });
          });
        });
      });
    },

    show : function (req, res, next) {
      Post.findOneById(req.param('id')).done(function(err,post){
        if(err) return next(err);
        Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, post_tags) {
          console.log(post);
        res.view({post:post, err:err, post_tags: post_tags.rows});
        });
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
            if(typeof(tags)=='string'){
              Tag.findOneBySlug(tags, function(err,tag) {
                if(err) return next(err);
                Tag_assoc.create({
                  tag_id: tag.id,
                  post_id: post.id,
                  type: "tag"
                }, function(err, assoc) {
                  if(err) return next(err);
                });
              });
            }
            else {
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
          }
          ///////////////////////////
    			console.log(post);
    		}
    		res.redirect('/posts');
    	} );
    },

    update : function(req,res,next) {
      Post.findOneById( req.param('id')).done(function(err,post) {
        if(err) return next(err);
        post.title = req.param('title');
        post.body = req.param('body');
        post.preview = req.param('preview');
        post.age_id = req.param('age_id');
        post.save(function(err){
          if(err) return next(err);
          /////////// создать ассоциации для тегов
          if(req.param('tags')) {
            Tag_assoc.query("DELETE FROM tag_assoc WHERE post_id= " + post.id, function(err){
              if(err) return next(err);
              tags = req.param('tags')[0];
              if(typeof(tags)=='string'){
                Tag.findOneBySlug(tags, function(err,tag) {
                  if(err) return next(err);
                  Tag_assoc.create({
                    tag_id: tag.id,
                    post_id: post.id,
                    type: "tag"
                  }, function(err, assoc) {
                    if(err) return next(err);
                  });
                });
              }
              else {
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
            });
          }
        });
        ///////////////////////////
        console.log(post);
        res.redirect('/posts');
      });
    },

    admin_index : function (req, res) {
    	Post.find().done(function(err,posts){
        var index = posts.length;
        if(posts.length <1 ) {
          res.view({
            posts : [],
          });
          return;
        }
        posts.forEach(function(post, i) {
          Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, tags) {
            if(err) return next(err);
            index--;
            posts[i].tags = tags.rows;
            // console.log(tags.rows);
            if(index < 1) {
              console.log(posts);
              res.view({
                posts : posts,
              }); 
            }
          });
        });
    	});
    	
    },

    index : function (req, res) {
      Tag.find().done(function(err,alltags){
        Post.find().sort('id DESC').limit(2).done(function(err,posts){
          var index = posts.length;
          if(posts.length <1 ) {
            res.view({
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
                res.view({
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

    query : function(req, res, next) {
      console.log(req.params.all());
      if(req.param('all') == true) {
        var query_str = " WHERE (1=1) ";
      }
      else {
        var query_str = " WHERE (1=0) ";

        var tags = req.params.all();
        if(tags["0"]) {
          for(tag in tags){
            query_str = query_str + "OR a.tag_id = " + tags[tag];
          }
        }
        else query_str = "";
      }
      

      Post.query("SELECT DISTINCT post.id, post.title, post.preview FROM tag_assoc a JOIN post ON a.post_id = post.id"+query_str, function(err, posts) {
        posts = posts.rows;
        var index = posts.length;
        posts.forEach(function(post, i) {
          Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, tags) {
            if(err) return next(err);
            index--;
            posts[i].tags = tags.rows;
            if(index < 1) {
              console.log(posts);
              res.json({
                posts : posts,
                query : query_str
              });
                // tags : tags
              // }); 
            }
          });
        });
      });
    },

    loadpage : function (req,res){
      Post.find().sort('id DESC').skip(2*(req.param('page')-1)).limit(2).done(function(err, posts){
        var index = posts.length;
        if(index < 1)
          res.json({
                posts : [],
                lastpage : true
              });
        posts.forEach(function(post, i) {
          Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, tags) {
            if(err) return next(err);
            index--;
            posts[i].tags = tags.rows;
            if(index < 1) {
              // console.log(posts);  
              res.json({
                posts : posts
              });
            }
          });
        });
      });
    },

    delete : function (req, res) {
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
