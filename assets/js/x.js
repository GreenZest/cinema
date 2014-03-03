$(document).ready(function(){

  $('#new_tag').click(function(e){
    e.preventDefault();
    socket.post('/tag/create', 
      { name : $('#new_tag_name').val(), slug : $('#new_tag_slug').val(), _csrf : $('[name="_csrf"]').val() }, 
      function(data){
        if(data.success==true) {
          $('.tags').append('<li class="tag"><input type="checkbox" name="tags[]" value="'+data.tag.slug+'">'+data.tag.name+'</input></li>');
      }
    });
  });


});