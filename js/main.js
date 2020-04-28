
let mainSection, mainBannerDatas, subBannerDatas, mainDatas, noSlideBannerDatas, recSlideBannerDatas;
window.addEventListener('load', function(){
    mainSection = document.querySelector('.main');

    // json 데이터 가져오기 START

    let file = ["../json/mainBanner.json", "../json/subBanner.json" ,"../json/main.json", "../json/noSlideBanner.json", "../json/recBanner.json"];
    
    let fileIdx = 0;
    pro(file, fileIdx);
    function pro(url, idx){
        console.log(url[idx]);
        fetch(url[idx])
        .then(response => response.json())
        .then(function(response){
            switch(idx){
                case 0: 
                    mainBannerDatas = response;
                    break;
                case 1: 
                    subBannerDatas = response;
                    break;
                case 2: 
                    mainDatas = response; 
                    break;
                case 3: 
                    noSlideBannerDatas = response; 
                    break;
                case 4: 
                    recSlideBannerDatas = response; 
                    break;
                default: 
                    console.log("오류"); 
                    break;
            }
            
            if(idx < file.length-1){
                idx++;
                pro(file, idx);
            }else{
                createMainPage();
            }
        })

    }
});
   //제이슨 데이터 가져오기 END

   function createMainPage(){
       createMainSlide();
       createSubSlide();
       createContents(0, 3);
    //    createContents(5, 8);
       createContents(3, 4);
       createNoSlideBanner();
       createContents(9, 12);
       createRecSlide(mainDatas[4], recSlideBannerDatas);
       createBottomAppDownLoad();
   }

    function createMainSlide(){
        console.log("createMainSlide");
        mainSlideBanner(mainSection, mainBannerDatas);
        autoSlide();

        topBannerBtnLeft.addEventListener('click', function(){
            clickSlide();
        });
        topBannerBtnRight.addEventListener('click', function(){
            clickSlide();
        });
        
    }
    function createSubSlide(){
        console.log("createSubSlide");
        subBannerSlideCreate(mainSection, subBannerDatas);

        subBannerBtnLeft.addEventListener('click', function(){
            clickSubSlide();
        });
        subBannerBtnRight.addEventListener('click', function(){
            clickSubSlide();
        });
    }

    function createRecSlide(mainDatas, recSlideBannerDatas){
        console.log("createRecSlide");
        recommendEventBannerCreate(mainDatas, recSlideBannerDatas);

        recBannerBtnLeft.addEventListener('click', function(){
            clickRecSlide();
        });
        recBannerBtnRight.addEventListener('click', function(){
            clickRecSlide();
        });
    }

    function createContents(startNum, endNum){

        for(var i = startNum; i < endNum; i++){
            articleCreate(mainSection, mainDatas[i].name, mainDatas[i].listCnt, mainDatas[i].type, mainDatas[i].dataType, mainDatas[i].hot);
        }
    }
    function createNoSlideBanner(){
        noSlideBannerCreate(noSlideBannerDatas, 0);
    }

    function createBottomAppDownLoad(){
        bottomAppdownloadCreate(mainSection);
        downloadBtn.addEventListener('click', function(){
            location.href= "https://page.kakao.com/appdownload";
        });
    }
 
    var targetUlTag,
        mainBannerIdx = 1, subBannerIdx = 1, recBannerIdx = 1,
        maxListBoxIdx = 0, listBoxIdxClone = 0,
        translateXPx = -720;


    // 기능 모음 START

    function mainBannerSlideEvent(target){

        if(mainSlideCheck){
            mainSlideCheck = false;

            targetUlTag = topBannerTarget; 
            if(target.id == "topBtnLeft"){
                target = target.id;
                mainBannerIdx--;
            }else{
                mainBannerIdx++;
            }
            mainBannerIdx = bannerTargetCheck(target, targetUlTag, targetListData = topBannerTargetList, mainBannerIdx); 

            mainSlideSpan.innerText = mainBannerIdx + " / " + mainBannerDatas.length;

            setTimeout(function(){mainSlideCheck = true;}, 500);
        }
    }
    function subBannerSlideEvent(target){
        
        if(subSlideCheck){
            subSlideCheck = false;

            targetUlTag = slideSubBannerBoxUlTag; 
            if(target.id == "subBtnLeft"){
                target = target.id;
                subBannerIdx--;
            }else{
                subBannerIdx++;
            }
            subBannerIdx = bannerTargetCheck(target, targetUlTag, targetListData = slideSubBannerBoxLiTags, subBannerIdx); 
            setTimeout(function(){subSlideCheck = true;}, 500);
        }
    }

    function recBannerSlideEvent(target){
        
        if(recSlideCheck){
            recSlideCheck = false;

            targetUlTag = recUlTag; 
            if(target.id == "recBtnLeft"){
                target = target.id;
                recBannerIdx--;
            }else{
                recBannerIdx++;
            }
            recBannerIdx = bannerTargetCheck(target, targetUlTag, targetListData = recLiTag, recBannerIdx); 

            recSlideSpan.innerText = recBannerIdx + " / " + recSlideBannerDatas.length;

            setTimeout(function(){recSlideCheck = true;}, 500);
        }
    }

    function bannerTargetCheck(target, targetUl, targetLength, bannerTargetIdx){
        if(target == "topBtnLeft" || target == "subBtnLeft" || target == "recBtnLeft"){
            maxListBoxIdx = 0;
            listBoxIdxClone = targetLength.length-2;
        }else{
            listBoxIdxClone = 1;
            maxListBoxIdx = targetLength.length-1;
        }
        return checkIdx(targetUl, bannerTargetIdx);
    }

    function checkIdx(targetUl, bannerTargetIdx){
        
        if(bannerTargetIdx == maxListBoxIdx){
            slideAni(targetUl, .5, bannerTargetIdx);
            bannerTargetIdx = listBoxIdxClone;
            setTimeout(function(){
                slideAni(targetUl, 0, bannerTargetIdx);
            }, 500);
        }else{
            slideAni(targetUl, .5, bannerTargetIdx);
        }
        return bannerTargetIdx;
    }
    function slideAni(targetUl, transitionValue, bannerTargetIdx){
        translateXPx = -bannerTargetIdx * parseInt(window.getComputedStyle(targetListData[bannerTargetIdx]).width.replace("px", ""));
        targetUl.style.transition = transitionValue + "s";
        targetUl.style.transform = "translate(" + translateXPx + "px" + ")";
    }
    
    function autoSlide(){
        autoSlideInterval = setInterval(function(){
            mainBannerSlideEvent(this);
        }, 3000);
    }
    function clickSlide(){
        clearInterval(autoSlideInterval);
        mainBannerSlideEvent(event.currentTarget);
        autoSlide();
    }
    function clickSubSlide(){
        subBannerSlideEvent(event.currentTarget);
    }
    function clickRecSlide(){
        recBannerSlideEvent(event.currentTarget);
    }
    // 기능모음 END

