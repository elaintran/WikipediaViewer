//allows cursor focus on search input upon page load
window.onload = function() {
  $("#query").focus();
};

//form submit
$("form").on("submit", submitInput);

function submitInput(event) {
  //prevent page reload upon submit
  event.preventDefault();
  //takes search input and trim off white space from the edges
  var searchQuery = query.value.trim();
  //submits if length more than 0
  if (searchQuery.length > 0) {
    //display result-container
    $("#result-container").css("display", "block");
    $("footer").css("display", "block");
    //change css on search container
    $(".container").css("height", 0);
    $(".title").css("margin-top", "100px");
    //displays results
    runSearch(searchQuery);
    //closes autocomplete on submit
    $("#query").autocomplete("close");
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
    $(".results").empty();
    //if no matching results, display error
    if (data.query === undefined) {
      var error = $("<div>").addClass("error");
      var errorMessage = $("<p>").text("Sorry, we could not find any results matching " + searchInput + ".");
      var errorOptions = $("<ul>").attr("style", "list-style-type:disc");
      var liOne = $("<li>").text("Make sure all words are spelled correctly.");
      var liTwo = $("<li>").text("Try different keywords.");
      var liThree = $("<li>").text("Try more general keywords.");
      errorOptions.append(liOne).append(liTwo).append(liThree);
      error.append(errorMessage).append(errorOptions);
      $(".results").append(error);
      $("footer").css({
        "position": "absolute",
        "width": "100%"
      });
    }
    //loops through and display results
    else {
      for (var i in data.query.pages) {
        var wikiLink = $("<a>").attr("href", "https://en.wikipedia.org/wiki?curid=" + data.query.pages[i].pageid);
        var resultList = $("<div>").addClass("result-list");
        var title = $("<div>").addClass("result-title").text(data.query.pages[i].title);
        var content = $("<p>").text(data.query.pages[i].extract);
        resultList.append(title).append(content);
        wikiLink.append(resultList);
        $(".results").append(wikiLink);
      }
      $("footer").css("position", "static");
    }
  });
}