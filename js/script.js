$(document).ready(main);

function main() {
    $('#form-container').submit(loadData);
}

function loadData() {

    var body = $('body');
    var wikiEl = $('#wikipedia-links');
    var nytHeaderEl = $('#nytimes-header');
    var nytEl = $('#nytimes-articles');
    var greeting = $('#greeting');
    
    // clear out old data before new request
    wikiEl.text("");
    nytEl.text("");
    
    // Google Maps request
    
    var streetName = $('#street').val();
    var cityName = $('#city').val();
    var address = streetName + ', ' + cityName;
    
    greeting.text('So, you want to live at ' + address + '?');
    
    var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    
    body.append('<img class="bgimg" src=" ' + streetViewUrl + ' ">');
    
    // NY Times AJAX request
    
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityName + '&sort=oldest&api-key=3c2b347976404869946e1dcc15e46b03' ;
    
    $.getJSON(nytimesUrl, function(data){
       
        nytHeaderEl.text('New York Times Articles about ' + cityName);
        
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            nytEl.append('<li class="article">'+
                         '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>' + article.snippet + '</p>'+'</li>');
        };
    }).error(function(e){
        nytHeaderEl.text('New York Times Article Could Not Be Loaded');
    });
    
    // Wikipedia AJAX request
    
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityName + '&format=json&callback=wikiCallback';
    
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        
        success: function(response) {
            var articleList = response[1];
            
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                wikiEl.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
        }
        
    })
    
    return false;
};




