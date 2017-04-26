var body;
var wikiEl;
var wikiHeaderEl;
var nytHeaderEl;
var nytEl;
var greeting;
var img;
var cityName;

$(document).ready(main);

function main() {
    body = $('body');
    wikiEl = $('#wikipedia-links');
    wikiHeaderEl = $('#wikipedia-header');
    nytHeaderEl = $('#nytimes-header');
    nytEl = $('#nytimes-articles');
    greeting = $('#greeting');
    img = $('.bgimg');
    cityName = $('#city');
    
    $('#form-container').on('submit', loadData);
}

function dataClear() {
    // clear out old data before new request
    wikiEl.text('');
    nytEl.text('');
}

function prepareGoogleData() {
    var streetName = $('#street').val();
    var address = streetName + ', ' + cityName.val();
    
    greeting.text('So, you want to live at ' + address + '?');
    
    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    
    img.attr("src", streetViewUrl); 
}

function fetchData(url, dataType, renderContent, renderError) {
    $.ajax({
        url: url,
        dataType: dataType,
        success: renderContent,
        error: renderError,
    });
}

function renderNYTimesContent(data) {
    var articles = data.response.docs; 

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i]; 
        nytEl.append('<li class="article">'+
                     '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>' + article.snippet + '</p>'+'</li>'); 
    }
}

function renderNYTimesError() {
    nytHeaderEl.text('New York Times Article Could Not Be Loaded');
}

function prepareNYTimesData() {
    
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityName.val() + '&sort=oldest&api-key=3c2b347976404869946e1dcc15e46b03' ;
    
    nytHeaderEl.text('New York Times Articles about ' + cityName.val());
      
    fetchData(nytimesUrl, 'json', renderNYTimesContent, renderNYTimesError); 
}

function renderWikiContent(data) {
    var articles = data[1];

    for (var i = 0; i < articles.length; i++) {

        var article = articles[i];

        wikiEl.append('<li><a href="' + 'http://en.wikipedia.org/wiki/' + article + '">' + article + '</a></li>');
    }
}

function renderWikiError() {
    wikiHeaderEl.text('Wikipedia Links Could Not Be Loaded');
}

function prepareWikiData() {
    
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityName.val() + '&format=json&callback=wikiCallback';
        
    fetchData(wikiUrl, 'jsonp', renderWikiContent, renderWikiError); 
}

function loadData(event) {
    
    event.preventDefault();
        
    dataClear();
    
    // Google Maps request
    
    prepareGoogleData();
    
    // NY Times AJAX request
    
    prepareNYTimesData();
    
    // Wikipedia AJAX request
    
    prepareWikiData();   
}




