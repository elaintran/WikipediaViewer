# WikipediaViewer
<p>Wikipedia Viewer is a search engine that uses the MediaWiki Web API to pull information from Wikipedia and places them into individual entries that links back to the original article. The web application retains the same color palette as Wikipedia to keep it looking consistent and the design of the search bar was inspired by Google.</p>

## USER STORIES
<p>One of freeCodeCamp’s take home projects is to build a Wikipedia article previewer with the following user stories:</p>
<ul>
  <li>I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.</li>
  <li>I can click a button to see a random Wikipedia entry.</li>
</ul>

## DEVELOPMENT PROCESS
<p>For this project, jQuery UI Autocomplete makes an AJAX call to the Opensearch API and uses the information to provide search suggestions when typing into the search field.</p>
<p>In order to perform a search, the search input is taken, trimmed of white space, and placed as a value in the API link. In this case, action=query is used over action=opensearch when making a call for search results because it retrieves more information regarding the wiki while the latter is more limited.</p>
<p>The search form will not submitted when the search input length is zero. Along with this, if there are no matching results, the page will throw an error page.</p>
