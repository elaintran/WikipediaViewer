var resultContainer = document.querySelector("#result-container");
var query = document.querySelector("#query");
var searchButton = document.querySelector("#search-button");
var form = document.querySelector("#search-input");
var container = document.querySelector(".container");
var title = document.querySelector(".title");
var footer = document.querySelector("footer");

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
  var input = query.value;
  //removes white space in search input
  var searchQuery = input.trim();
  //submits if length more than 0
  if (searchQuery.length > 0) {
  //display result-container
  resultContainer.style.display = "block";
  footer.style.display = "block";
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
  //submit upon selection of autocomplete
  select: function(event, ui) {
    $("#query").val(ui.item.value);
    submitInput(event);
    return false;
  },
  //moves position of autocomplete
  position: {
    my: "left-0 top+15",
  }
});

//search results
function runSearch(searchInput) {
  var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchInput + "&gsrinfo=totalhits&format=json&callback=?";
  //gets Wikipedia information
  $.getJSON (wikiURL, function(data) {
    console.log(data);
    $(".results").html("");
    //put object in array
    var resultArray = Object.keys(data);
    //if no matching results, display error
    if (resultArray.length < 3) {
      $(".results").append("<div class='error'><p>Sorry, we could not find any results matching <b>" + searchInput + "</b>.</p><ul style='list-style-type:disc'><li>Make sure all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></ul></div>");
      footer.style.position = "absolute";
      footer.style.width = "100%";
    }
    //loops through and display results
    else {
      for (var i in data.query.pages) {
        $(".results").append("<a href ='https://en.wikipedia.org/wiki?curid=" + data.query.pages[i].pageid + "'><div class='result-list'><div class='result-title'>" + data.query.pages[i].title + "</div><p>" + data.query.pages[i].extract + "</p></div></a>");
        }
      footer.style.position = "";
    }
  });
}