var page = 1;
$(document).ready(function(){
  
  $("#loadpage").bind("inview", function(isVisible) {
    // Event is triggered once the element becomes visible in the browser's viewport, and once when it becomes invisible
    if (isVisible) {
      if(!page){page = 1}
        page++;
      socket.get('/timeline/page', {page:page}, function(response){
        if(response.posts && response.posts.length > 0) {
          response.posts.forEach(function(post,i){
            var $before = $('#before'),
              $loadpage = $('#loadpage'),
              html = '';
            html += "<div id='hipage'>";
            // html += "<a href='/posts/"+post.id+"'>";
            // html += "<div class='title_post'>"+ post.title +"</div>";
            // html += "</a>";
          //   html += "<div class='title_post'>";
          //   html += "<b><a href='/posts/"+post.id+"'>";
          //   html += post.title +"</a></b></div>";
          //   html += "<div class='text_area'>"+ post.preview +"</div>";
          //   if(post.tags) {
          //     html += '<ul>';
          //     post.tags.forEach (function(tag, i) {
          //       html += '<li>'+ tag.name + '</li>';
          //     });
          //     html += "<a href='/posts/" +post.id+ "#disqus_thread'></a>";
          //     html += '</ul>';
            html += "</div>";
            $postall.append(html);
            }
          });
          $.getScript ("http://greenzest.disqus.com/count.js");
        }
        if(response.lastpage) {
          $('#loadpage').hide();
        }
      });
    } /*else {
      $('#loadpage').unbind('inview');
      console.log("element #loadpage became invisible in the browser's viewport");
      alert("element #loadpage became invisible in the browser's viewport");
    }*/
  });
});