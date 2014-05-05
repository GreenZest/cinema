/**
 * Post
 * Посты ( записи )
 */

module.exports = {

  attributes: {
  	title: {
  		type: 'string',
  		required: true
  	},
    body: {
      type: 'text'
    },
    preview: {
      type: 'text'
    },
    // связь с десятилетием
    age_id : "integer"
  },

  findAllPostsWithTags: function(cb, where, sort, limit) {
    where = where || { };
    sort = sort || 'id ASC';
    limit = limit || 0;
    Post.find().where(where).sort(sort).limit(limit).done(function(err,posts){
      var index = posts.length;
      if(posts.length <1 ) {
        posts = [];
        cb(posts);
      }
      posts.forEach(function(post, i) {
        Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, tags) {
          if(err) return 'fail';
          index--;
          posts[i].tags = tags.rows;
          if(index < 1) {
            cb(posts);
          }
        });
      });
    });
  },

  createTagAssociations: function(post, tags) {
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

};
