window.addEventListener("DOMContentLoaded", function(){

    let subCreateData, viewSubNabTap, viewSubTap;

    var sub01ContentBox = document.querySelector('.content_box');
    sub01WaitFreeData(0);

    var subCateNabTabBtn = document.querySelector('.sub_cate_nav');
    subCateNabTabBtn.addEventListener('click', subNabTabChange);

    var subCateTabUlBtn = document.querySelector('.sub_cate_tab ul');
    subCateTabUlBtn.addEventListener('click', subTabChange);

    function subNabTabChange(){
        event.preventDefault();

        var target = event.target;
        if(target.href != undefined){

            var targetClass = document.querySelector('.sub_nav_active');
            targetClass.classList.remove('sub_nav_active');
            event.target.classList.add('sub_nav_active');

            if(sub01ContentBox != undefined){
                console.log(sub01ContentBox.querySelector('article'));
                sub01ContentBox.remove();
            }


        }
    }

    function subTabChange(){
       event.preventDefault();
       var target = event.target;
       if(target.href != undefined){
            var subTabList = sub01ContentBox.querySelector('article');
            if(subTabList != undefined){
                console.log(sub01ContentBox.querySelector('article'));
                subTabList.remove();
            }

            var targetClass = document.querySelector('.sub_tab_active');
            targetClass.classList.remove('sub_tab_active');
            event.target.classList.add('sub_tab_active');

            switch(target.innerText){
                case "전체": sub01WaitFreeData(0); break;
                case "순정": sub01WaitFreeData(1); break;
                case "소년": sub01WaitFreeData(2); break;
                case "드라마": sub01WaitFreeData(3); break;
                case "BL": sub01WaitFreeData(4); break;
                case "액션무협": sub01WaitFreeData(5); break;
                default: break;
            }
       }
    }

    function sub01WaitFreeData(idx){
        fetch("../json/sub01.json")
            .then(response => response.json())
            .then(function(response){
                subCreateData = response;
                
                articleCreate(sub01ContentBox, "", subCreateData[idx].name, 40, subCreateData[idx].type, subCreateData.dataType, subCreateData.hot);
            })
    }
    
});