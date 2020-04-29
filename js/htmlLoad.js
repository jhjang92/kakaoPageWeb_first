window.addEventListener('DOMContentLoaded', function(){
    var header = document.querySelector('header');
    fetch("../main/header.html")
    .then(function(response){
        response.text().then(function(text){
            header.innerHTML = text;
        })
    })
});