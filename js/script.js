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

    var streetName = $('#street').val();
    var cityName = $('#city').val();
    var address = streetName + ', ' + cityName;
    
    greeting.text('So, you want to live at ' + address + '?');
    
    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    
    body.append('<img class="bgimg" src=" ' + streetViewUrl + ' ">');
       
    return false;
};


