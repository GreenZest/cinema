$(document).ready(function(){

  $search = $('#q');
  $search.on('search keypress', function(e){
    if(e.type == 'search' || e.which==13) {
      socket.get('/search', { search_string: $(this).val() }, function(response) {
        console.log(response);
        $('#postall').empty();
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
                html += '<li>'+ tag.name + '</li>';
              });
              html += '</ul>';
            html += "</div>";
            $postall.append(html);
            }
          });
        }
        $gallery = $("#gallery");
        $gallery.empty();
        html = "";
        html += "<h4 class='ui-widget-header'> Теги </h4>";

        if(response.allTags.length > 0) {
          response.allTags.forEach(function(tag,i){
            html += '<li class="ui-widget-content ui-corner-tr" data-id=' +tag.id+ '> ';
            html += '<img src="images/tag.png">';
            html += '<h5 class="ui-widget-header">' +tag.name+ '</h5>';
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