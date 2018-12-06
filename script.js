const resultContainer = document.querySelector("#result-container");
const query = document.querySelector("#query");
const searchButton = document.querySelector("#search-button");
const form = document.querySelector("#search-input");
const container = document.querySelector(".container");
const title = document.querySelector(".title");
const footer = document.querySelector("footer");

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

function runSearch(searchInput) {
  const wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchInput + "&namespace=0&format=json&callback=?";
  $.getJSON (wikiURL, function(data) {
    console.log(data);
    $(".results").html("");
    if (data[1] == "" && data [2] == "" && data[3] == "") {
      $(".results").append("<div class='error'><p>Sorry, we could not find any results matching <b>" + searchInput + "</b>.</p></div>");
    }
    else {
      for (var i = 0; i < data[1].length; i++) {
        $(".results").append("<div class='result-list'>" + "<a href ='" + data[3][i] + "'>" + data[1][i] + "</a><p>" + data[2][i] + "</p></div>");
      }
    }
  });
}