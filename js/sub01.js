window.addEventListener("DOMContentLoaded", function(){

    let subCreateData;

    var sub01ContentBox = document.querySelector('.content_box');
    sub01WaitFreeData();

    var subCateTabUlBtn = document.querySelector('.sub_cate_tab ul');

    subCateTabUlBtn.addEventListener('click', subTabChange);

    function subTabChange(){
        event.preventDefault();
        var target = event.target;
        var subTabList = sub01ContentBox.querySelector('article');
        if(subTabList != undefined){
            console.log(sub01ContentBox.querySelector('article'));
            subTabList.remove();
            
        }
        switch(target.innerText){
            case "전체": sub01WaitFreeData(); break;
            case "순정": sub01WaitFreePureData(); break;
            case "소년": sub01WaitFreeBoyData(); break;
            case "드라마": sub01WaitFreeDramaData(); break;
            case "BL": sub01WaitFreeBlData(); break;
            case "액션무협": sub01WaitFreeActionData(); break;
            default: console.log("버튼아님"); break;
        }
    }



    function sub01WaitFreeData(){
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                
                articleCreate(sub01ContentBox, "", subCreateData[0].name, 40, subCreateData[0].type, subCreateData.dataType, subCreateData.hot);
            })
    }
    function sub01WaitFreePureData(){
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                
                articleCreate(sub01ContentBox, "", subCreateData[1].name, 40, subCreateData[1].type, subCreateData.dataType, subCreateData.hot);
            })
    }
    function sub01WaitFreeBoyData(){
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                
                articleCreate(sub01ContentBox, "", subCreateData[2].name, 40, subCreateData[2].type, subCreateData.dataType, subCreateData.hot);
            })
    }
    function sub01WaitFreeDramaData(){
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                
                articleCreate(sub01ContentBox, "", subCreateData[3].name, 40, subCreateData[3].type, subCreateData.dataType, subCreateData.hot);
            })
    }

    function sub01WaitFreeBlData(){
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                
                articleCreate(sub01ContentBox, "", subCreateData[4].name, 40, subCreateData[4].type, subCreateData.dataType, subCreateData.hot);
            })
    }
    function sub01WaitFreeActionData(){
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                
                articleCreate(sub01ContentBox, "", subCreateData[5].name, 50, subCreateData[5].type, subCreateData.dataType, subCreateData.hot);
            })
    }
});