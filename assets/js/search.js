$(document).ready(function(){

  $search = $('#q');
  $search.on('search keypress', function(e){
    if(e.type == 'search' || e.which==13) {
      // $search.clear();
      socket.get('/search', { search_string: $(this).val() }, function(response) {
        console.log(response);
        $('#postall').empty();
        $('#loadpage').remove();
        var posts = [];
        if(response.posts && response.posts.length > 0) {
          response.posts.forEach(function(post,i){
            posts.push(post.id);
            var $postall = $('#postall'),
              html = '';
            html += "<div class='post'>";
            html += "<a href='/posts/"+post.id+"'>";
            html += "<div class='title_post'>"+ post.title +"</div>";
            html += "</a>";
            html += "<div class='text_area'>"+ post.preview +"</div>";
            if(post.tags) {
              html += '<ul>';
              post.tags.forEach (function(tag, i) {
                html += '<li class="draggable">'+ tag.name + '</li>';
              });
              html += "<a href='/posts/" +post.id+ "#disqus_thread'></a>";
              html += '</ul>';
            html += "</div>";
            $.getScript("http://greenzest.disqus.com/count.js");
            $postall.append(html);
            }
          });
          
        }
        $gallery = $("#gallery");
        $gallery.empty();
        html = "";
        // html += "<p class='ui-widget-header'> Теги </p>";

        if(response.allTags.length > 0) {
          response.allTags.forEach(function(tag,i){
            html += '<p class="ui-widget-header">' +tag.name+ '</p>';
            html +='</li>';
          });
          $gallery.append(html);

          $( "li", $gallery ).draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
          });

        }

      });
    }
  });
});

    var disqus_shortname = 'greenzest';
    (function () {
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
    }());