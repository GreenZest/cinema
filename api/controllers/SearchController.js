/**
 * SearchController
 */

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) {
    for(var i=0; i < this.length; i++) {
        if(comparer(this[i])) return true;
    }
    return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};

module.exports = {

    'search' : function (req, res) {
      var allTags = [];
      Post.findByTitleLike(req.param('search_string'), function(err,posts){
        if(posts.length > 0) {
          var index = posts.length;
          posts.forEach(function(post, i) {
            Tag.query("SELECT * FROM tag_assoc a JOIN tag ON a.tag_id = tag.id WHERE a.post_id = "+post.id, function(err, tags) {
              if(err) return next(err);
              index--;
              posts[i].tags = tags.rows;
              tags.rows.forEach(function(tag_j,j) {
                allTags.pushIfNotExist(tag_j, function(e) {
                  return e.id === tag_j.id;
                });
              });
              if(index < 1) {
                console.log(posts);
                res.json({
                  posts : posts,
                  allTags : allTags
                });
                  // tags : tags
                // });
              }
            });
          });
        }
        else
          res.json({ nothing_found: true})
      });
    },

  _config: {}


};
