const resultContainer = document.querySelector("#result-container");
const query = document.querySelector("#query");
const searchButton = document.querySelector("#search-button");
const form = document.querySelector("#search-input");
const container = document.querySelector(".container");
const title = document.querySelector(".title");

//allows cursor focus on search input upon page load
window.onload = function() {
  query.focus();
};

//submit form
form.addEventListener("submit", submitInput);

function submitInput(event) {
  //prevent page reload upon submit
  event.preventDefault();
  //takes search input
  const input = query.value;
  //removes white space in search input
  const searchQuery = input.trim();
  //submits if length more than 0
  if (searchQuery.length > 0) {
  //display result-container
  resultContainer.style.display = "block";
  //change css on search container
  container.style.height = 0;
  title.style.marginTop = "100px";
  //displays results
  runSearch(searchQuery);
  //closes autocomplete on submit
  $("#query").autocomplete("close");
  }
  else {
    return false;
  }
}

//jQuery code for autocomplete
$("#query").autocomplete({
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

/*function runSearch(searchInput) {
  const wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&format=json&callback=?";
  $.getJSON(wikiURL, function(result) {

  })
}*/

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