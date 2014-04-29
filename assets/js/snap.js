
  $(function() {
    $( ".draggable" ).draggable({ snap: true });
  });

  $(function() {
    // there's the gallery and the trash
    var $gallery = $( "#gallery" ),
      $trash = $( "#trash" );
 
    // let the gallery items be draggable
    $( "li", $gallery ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move",
      start: function(e, ui) {
        console.log(ui);
        $(ui.helper).addClass("ui-draggable-helper");
      }
    });
 
    // let the trash be droppable, accepting the gallery items
    $trash.droppable({
      accept: "#gallery > li",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        deleteImage( ui.draggable );
      }
    });
 
    // let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
      accept: "#trash li",
      activeClass: "custom-state-active",
      drop: function( event, ui ) {
        recycleImage( ui.draggable );
      }
    });
 
    // image deletion function
    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>x</a>";
    function deleteImage( $item ) {
      $('#loadpage').remove();
      $item.fadeOut(function() {
        var $list = $( "ul", $trash ).length ?
          $( "ul", $trash ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );
 
        $item.find( "a.ui-icon-trash" ).remove();
        $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
          var arr = [];
          $trash.find( 'li' ).each(function() {
            arr.push($(this).attr( "data-id" ));
            //arr.push($trash.find( 'li' ).data( "id" ));
            });
          console.log(arr);
          socket.get("/query", arr, function(response) {
            console.log(response);
            $('#postall').empty();
            if(response.posts.length > 0) {
              response.posts.forEach(function(post,i){
                var $postall = $('#postall'),
                  html = '';
                html += "<div class='post'>";
                  html += "<div class='title_post'>";
                    html += "<b><a href='/posts/"+post.id+"'>";
                    html += post.title +"</a></b></div>";
                html += "</a>";
                html += "<div class='text_area'>"+ post.preview +"</div>";
                if(post.tags) {
                  html += '<ul>';
                  post.tags.forEach (function(tag, i) {
                    html += '<li>'+ tag.name + '</li>';
                  });
                  html += "<a href='/posts/" +post.id+ "#disqus_thread'></a>";
                  
                  html += '</ul>';

                }
                html += "</div>";
                $postall.append(html);
                
              });
              DISQUSWIDGETS.getCount();
              $.getScript("http://greenzest.disqus.com/count.js");
            }
          });
        });
      });
    }
 
    // image recycle function
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "96px")
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( $gallery )
          .fadeIn();
          var arr = [];
          $trash.find( 'li' ).each(function() {
            arr.push($(this).attr( "data-id" ));
            //arr.push($trash.find( 'li' ).data( "id" ));
            });
          console.log(arr);
          socket.get("/query", arr, function(response) {
            console.log(response);
            $('#postall').empty();
            if(response.posts.length > 0) {
              response.posts.forEach(function(post,i){
                var $postall = $('#postall'),
                  html = '';
                html += "<div class='post'>";
                html += "<div class='title_post'>"+ post.title +"</div>";
                html += "<div class='text_area'>"+ post.preview +"</div>";
                if(post.tags) {
                  html += '<ul>';
                  post.tags.forEach (function(tag, i) {
                    html += '<li>'+ tag.name + '</li>';
                  });
                  html += "<a href='/posts/" +post.id+ "#disqus_thread'></a>";
                  $.getScript("http://greenzest.disqus.com/count.js");
                  html += '</ul>';

                }
                html += "</div>";
                $postall.append(html);
                
              });
              DISQUSWIDGETS.getCount();
              $.getScript("http://greenzest.disqus.com/count.js");
              // if(response.query == "")
              //   $postall.after('<div id="loadpage"></div>');
            }
          });
      });
    }
 
    // image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage( $link ) {
      var src = $link.attr( "href" ),
        title = $link.siblings( "img" ).attr( "alt" ),
        $modal = $( "img[src$='" + src + "']" );
 
      if ( $modal.length ) {
        $modal.dialog( "open" );
      } else {
        var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; <!--padding: 8px;-->' />" )
          .attr( "src", src ).appendTo( "body" );
        setTimeout(function() {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1 );
      }
    }
 
    // resolve the icons behavior with event delegation
    $( "ul.gallery > li" ).click(function( event ) {
      var $item = $( this ),
        $target = $( event.target );
 
      if ( $target.is( "a.ui-icon-trash" ) ) {
        deleteImage( $item );
      } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
        viewLargerImage( $target );
      } else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
      }
 
      return false;
    });

    $('#drophere').on('change', function(){
      console.log($(this).html());
    });
  });

    var disqus_shortname = 'greenzest';
    (function () {
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
    }());
  
