$('.query').autocomplete({
    source: function(request, response){
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          "action": "opensearch",
          "format": "json",
          "limit": 5,
          "search": request.term
        },
        success: function(data){
          response(data[1]);
        }
      });
    },
    //set limits to search
    select: function(event, ui){
      if (event.which === 1){
        search(ui.item.value);
        $(".query").val(ui.item.value);
      }
    },
    //moves position of autocomplete
    position: {
        my: "left-14 top+15",
    }
  });