const resultContainer = document.getElementById("result-container");
const query = document.getElementById("query");

//allows user search input on page load
window.onload = function() {
  query.focus();
};

//let resultContainer = document.getElementById("result-container");


//jquery
/*$(document).ready(function() {
    $(".result-container").hide();
})

$(document).ready(function() {
  // enter key event to serve as button 
  $("#query").keypress(function (e) {
    var key = e.which;
    if (key == 13) // enter key is true
      {
        $(".search-button").click()
        return false;
        function myFunction() {
        document.getElementById("result-container").style.display = "block";
      };
        //$(".result-container").show();
        $(".container").css("height", 0);
        $(".title").css("margin-top", "40px");
      }
  });
    $(".search-button").on("click", function () {
        var srchTerm;
        srchTerm = $("#query").val();
        if (srchTerm.length > 0) {
            runSearch(srchTerm);
            $("#query").autocomplete("close");
            $(".result-container").show();
            $(".container").css("height", 0);
            $(".title").css("margin-top", "100px");
        }
    });
});*/

$('#query').autocomplete({
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
        $("#query").val(ui.item.value);
      }
    },
    //moves position of autocomplete
    position: {
        my: "left-0 top+15",
    }
  });

function runSearch(srchString) {
    // declare wikipedia search url variable
    var wikiURL;
    //construct wikiURL string
    wikiURL = 'https://en.wikipedia.org/w/api.php?';
    wikiURL += 'action=query&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=2&exlimit=max&generator=search&gsrsearch=' + srchString;
    wikiURL += '&format=json&callback=?';

    $.getJSON(wikiURL, function(result) {
        var resultHTML = "";

        $.each(result.query.pages, function(i, val) {
            
            resultHTML += '<div class="resultTable"><a ' + link(val.pageid) + '>' + val.title + '</a><p> ' + val.extract + '</p></div>';
        });

    $(".results").html(resultHTML);
    }); 
    
    function link(pageID) {
        return 'href="https://en.wikipedia.org/?curid=' + pageID + '" target="_blank"';
    }
}

$("#reload").click(function() {
  location.reload(true);
});