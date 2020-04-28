let loadingState = true;
let contentBox;
let webToonData, pureToon, boyToon, dramaToon, blToon, actionToon, waitFreeToonData = [], vodData;
window.addEventListener('DOMContentLoaded', function(){

    var toonUrl = "../json/toon.json";

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', toonUrl);
    httpRequest.send();

    function alertContents(){ 
        if (httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                webToonData = JSON.parse(httpRequest.responseText);
                pureToon = webToonData[1];
                boyToon = webToonData[2];
                dramaToon = webToonData[3];
                blToon = webToonData[4];
                actionToon = webToonData[5];
                waiteFreeCheck();

                loadingState = false;
                contentBox = document.createElement('div');
                contentBox.classList.add('content_box');

            }else{
                alert('request 에 문제가 있습니다.');
            }
        }
    }
    
});

function articleCreate(mainSection, content, addListCnt, type, dataType, hot){
    console.log("articleCreate");
    if(!mainSection.querySelector('.content_box')){
        mainSection = document.querySelector('.main');
        mainSection.append(contentBox);
    }

    var typeData; //main 에서 받아온 type을 기준으로 data를 담아서 진행
    switch(type){
        case 0: typeData = "웹툰"; break;
        case 1: typeData = pureToon; break;
        case 2: typeData = boyToon; break;
        case 3: typeData = dramaToon; break;
        case 4: typeData = blToon; break;
        case 5: typeData = actionToon; break;
        case 50: typeData = vodData; break;
        case 100: typeData = waitFreeToonData; break;
    }

    var article = document.createElement('article');
    contentBox.append(article);

    var h3 = document.createElement('h3');
    h3.title = content;
    h3.innerText = content;
    article.append(h3);

    if(dataType != 2){
        var small = document.createElement('small');
        small.innerText = "(" + typeData.length + ")"; //데이터 다 받아와지면 그때
        h3.append(small);
    }
    if(hot){
        typeData.sort(function(a, b){
            return b["views"] - a["views"];
        });
    }

    listContentCreate(article,addListCnt, typeData, dataType);
}
function listContentCreate(article,addListCnt, typeData, dataType){
    var dataTypeName; // 0 == 웹툰,소설  1 == vod
    var dataTypeFigure;
    switch(dataType){
        case 0: dataTypeName = "", dataTypeFigure = ""; break;
        case 1: dataTypeName = "_vod", dataTypeFigure = ""; break;
        case 2: dataTypeName = "", dataTypeFigure = "_ranking"; break;

        default: console.log("예외"); break;
    }

    var ul = document.createElement('ul');
    ul.classList.add('list_content_ul' + dataTypeName);
    article.append(ul);

    for(var i = 0; i < addListCnt; i++){
        var li = document.createElement('li');
        li.classList.add('list_content_li' + dataTypeName);
        ul.append(li);

        var a = document.createElement('a');
        //a 태그의 href 값에 서브페이지 해당 작품 상세내용으로 이동할 링크 add 하기
        li.append(a);

        var figure = document.createElement('figure');
        a.append(figure);

        var divImageBox = document.createElement('div');
        divImageBox.classList.add('image_box' + dataTypeFigure);
        figure.append(divImageBox);

        var imgImageBox = document.createElement('img');
        if(dataTypeFigure == "_ranking"){
            imgImageBox.src = typeData[i].bookImg; // "../img/common/bg_noImg.png";
        }else{
            imgImageBox.src = typeData[i].img; // "../img/common/bg_noImg.png";
        }
        
        divImageBox.append(imgImageBox);

        var divIconImageBox = document.createElement('div');
        divIconImageBox.classList.add('icon_image_box');
        divImageBox.append(divIconImageBox);

        waiteFreeCreate(typeData[i].waitFree, divIconImageBox, typeData[i].webToonType);
        rightBadegCreate(typeData[i].rightBadeg, divImageBox);

        var figCaption = document.createElement('figcaption');
        figCaption.classList.add('content_figcaption' + dataTypeFigure);

        figure.append(figCaption);

        figCaptionContentCreate(figCaption, typeData[i], dataTypeFigure, i);
        
    }
}

function waiteFreeCreate(waitFree, divIconImageBox, webToonType){
    if(webToonType != 0){
        if(waitFree != 0){
            var imgIconImageBox = document.createElement('img');
            if(waitFree == 1){
                imgIconImageBox.src =  "../img/common/badge_time.png";
            }else if(waitFree == 2){
                imgIconImageBox.src = "../img/common/badge_time12.png";
            }
        }
    }else{
        var imgIconImageBox = document.createElement('img');
        imgIconImageBox.src =  "../img/common/badge_webtoon.png.png";
    }

    divIconImageBox.append(imgIconImageBox);
    
}

function rightBadegCreate(rightBadeg, divImageBox){
    if(rightBadeg != 0){
        var imgRightBadeg = document.createElement('img');
        imgRightBadeg.classList.add('image_box_right_img');
    
        switch(rightBadeg){
            case 0: imgRightBadeg.src = console.log("NoneRightBadeg"); break;
            case 1: imgRightBadeg.src = "../img/common/badge_right_new.png"; break;
            case 2: imgRightBadeg.src = "../img/common/badge_right_top.png"; break;
            case 3: imgRightBadeg.src = "../img/common/badge_right_million.png"; break;
            default: break;
        }
        divImageBox.append(imgRightBadeg);
    }
}

function figCaptionContentCreate(figCaption, typeData, dataTypeFigure, listIdx){
    if(dataTypeFigure == ""){
        var pTitle = document.createElement('p');
        pTitle.classList.add('figcaption_title' + dataTypeFigure);
        figCaption.append(pTitle);

    }else{
        var figCaptionRanking = document.createElement('div');
        figCaption.append(figCaptionRanking);
        var pRank = document.createElement('p');
        pRank.classList.add('figcaption' + dataTypeFigure);
        figCaptionRanking.append(pRank);

        if(dataTypeFigure == "_ranking"){
            var spanRank = document.createElement('span');
            spanRank.innerText = listIdx+1 + "위";
            pRank.append(spanRank);
        }

        var pTitle = document.createElement('p');
        pTitle.classList.add('figcaption_title' + dataTypeFigure);
        figCaptionRanking.append(pTitle);
    }

    var stateType = [];
    stateType.push(typeData.new, typeData.update, typeData.ageLimit);
    for(var i = 0; i < stateType.length; i++){
        if(stateType[i] != 0){
            var pTitleIconImg = document.createElement('img');
            markImgCheck(pTitleIconImg, stateType[i], i); //stateNew 라는 제이슨 객체 키값으로 대체해야함
            pTitle.append(pTitleIconImg);
        }
    }
    var pTitleSpan = document.createElement('span');
    pTitleSpan.innerText = typeData.name; // "템빨";

    if(typeData.monopoly){
        // typeData.name 에서 독점 이란 단어가 있으면 패스추가해야함..
        pTitleSpan.innerText += " [독점연재]";
    }
    pTitle.append(pTitleSpan);

    var figcaptionInfo = document.createElement('div');
    figcaptionInfo.classList.add('figcaption_info' + dataTypeFigure);

    if(dataTypeFigure == ""){
        var pContent = document.createElement('p');
        pContent.classList.add('figcaption_content' + dataTypeFigure);
        figCaption.append(pContent);

        var pContentSpan = document.createElement('span');
        pContentSpan.innerText = typeData.subTitleText; // "뭐, 특별한 건 없고 템빨이죠!";
        pContent.append(pContentSpan);

        figCaption.append(figcaptionInfo);
    }else{    

        figCaptionRanking.append(figcaptionInfo);
    }

    var infoImg01 = document.createElement('img');
    infoImg01.src = "../img/common/icon_read_count.png";
    var infoP01 = document.createElement('p');
    infoP01.innerText = typeData.views + "명"; //정규표현식으로 축소해야함. // "41.3만명";

    var infoImg02 = document.createElement('img');
    infoImg02.src = "../img/common/line_hotpick.png";
    infoImg02.classList.add('fig_separator');
    var infoP02 = document.createElement('p');

    var webToonType;
    switch(typeData.webToonType){
        case 0: webToonType = "웹툰"; break;
        case 1: webToonType = "순정"; break;
        case 2: webToonType = "소년"; break;
        case 3: webToonType = "드라마"; break;
        case 4: webToonType = "BL"; break;
        case 5: webToonType = "액션무협"; break;
        default: break;
    }
    infoP02.innerText = webToonType; // "소년";
    
    var infoImg03 = document.createElement('img');
    infoImg03.src = "../img/common/line_hotpick.png";
    infoImg03.classList.add('fig_separator');
    var infoP03 = document.createElement('p');
    infoP03.innerText = typeData.writer; // "이동욱(REDICE STUDIO),Team Argo,박새날";

    figcaptionInfo.append(infoImg01, infoP01, infoImg02, infoP02, infoImg03, infoP03);

    if(dataTypeFigure == "_ranking"){
        var figcaptionRanking = document.createElement('div');
        figCaption.append(figcaptionRanking);

        var rankingImg = document.createElement('img');
        rankingImg.src = "../img/common/icon_ranking_up.png";
        figcaptionRanking.append(rankingImg);

        var spanRankChart = document.createElement('span');
        spanRankChart.innerText = "28";
        figcaptionRanking.append(spanRankChart);

    }

}
function markImgCheck(pTitleIconImg, stateType, idx){
    switch(idx){
        case 0: pTitleIconImg.src = "../img/common/icon_new.png"; break;
        case 1: pTitleIconImg.src = "../img/common/icon_up.png"; break;
        case 2: ageLimitCheck(); break;
        default: break;
    }

    function ageLimitCheck(){
        switch(stateType){
            case 1: pTitleIconImg.src = "../img/common/icon_12.png"; break;
            case 2: pTitleIconImg.src = "../img/common/icon_15.png"; break;
            case 3: pTitleIconImg.src = "../img/common/icon_19.png"; break;
            case 4: pTitleIconImg.src = "../img/common/icon_19_movie.png"; break;
            default: break;
        }
    }
}
function waiteFreeCheck(){
    //boyToon 을 포함한 여러개 서브카테고리의 길이를 다 더해서 계산.
    for(var i = 0; i < webToonData.length; i++){
        for(var j = 0; j < webToonData[i].length; j++){
            if(webToonData[i][j].waitFree >= 1){
                waitFreeToonData.push(webToonData[i][j]);
            }
        }
        
    }
}