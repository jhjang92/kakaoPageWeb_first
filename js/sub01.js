window.addEventListener("DOMContentLoaded", function(){


    var sub01ContentBox = document.querySelector('.content_box');
    sub01WaitFreeData();

    function sub01WaitFreeData(){
        let subCreateData;
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                articleCreate(sub01ContentBox, "", subCreateData[0].name, 40, subCreateData[0].type, subCreateData.dataType, subCreateData.hot);
            })
    }
});