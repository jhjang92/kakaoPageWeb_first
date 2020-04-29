window.addEventListener('DOMContentLoaded', function(){

});

//html 태그 생성 START
var topBannerBtnLeft, topBannerBtnRight, topBannerTarget, topBannerTargetList,
    slideSubBannerBoxLiTags, slideSubBannerBoxUlTag, mainSlideSpan, autoSlideInterval, mainSlideCheck = true, subSlideCheck = true, recSlideCheck = true,
    targetListData, subBannerBtnLeft, subBannerBtnRight, recBannerBtnLeft, recBannerBtnRight, recUlTag, recLiTag, recSlideSpan, downloadBtn;

//mainBannerSlide Tag
function mainSlideBanner(mainSection, mainBannerDatas){
    console.log("mainSlideBanner222");
    var slideTopBannerBox = document.createElement('div');
    slideTopBannerBox.classList.add('slide_top_banner_box');
    mainSection.append(slideTopBannerBox);

    var  slideTopBannerListBox = document.createElement('ul');
    slideTopBannerListBox.classList.add('slide_top_banner_listbox');
    slideTopBannerBox.append(slideTopBannerListBox);

    mainSlideBannerList(mainBannerDatas, slideTopBannerListBox, mainBannerDatas.length-1);
    for(var i = 0; i < mainBannerDatas.length; i++){
        mainSlideBannerList(mainBannerDatas, slideTopBannerListBox, i);
    }
    mainSlideBannerList(mainBannerDatas, slideTopBannerListBox, 0);

    var topBannerSpan = document.createElement('span');
    topBannerSpan.innerText = "1 / " + mainBannerDatas.length;

    topBannerBtnLeft = document.createElement('button');
    topBannerBtnLeft.classList.add("prev");
    topBannerBtnLeft.id = "topBtnLeft";
    topBannerBtnLeft.classList.add('top_banner_btn');
    var btnLeftImg = document.createElement('img');
    btnLeftImg.src = "../img/common/ic-banner-paging-back-nor.svg";
    btnLeftImg.alt = "previous button";
    topBannerBtnLeft.append(btnLeftImg);
    
    topBannerBtnRight = document.createElement('button');
    topBannerBtnRight.id = "topBtnRight";
    topBannerBtnRight.classList.add("next");
    topBannerBtnRight.classList.add('top_banner_btn');
    var btnRightImg = document.createElement('img');
    btnRightImg.src = "../img/common/ic-banner-paging-next-nor.svg";
    btnRightImg.alt = "next button";
    topBannerBtnRight.append(btnRightImg);

    slideTopBannerBox.append(topBannerSpan, topBannerBtnLeft, topBannerBtnRight);
    
    var slideTopBannerBox = document.querySelector('.slide_top_banner_box');
    topBannerTarget = slideTopBannerBox.querySelector('.slide_top_banner_listbox');
    topBannerTargetList = topBannerTarget.querySelectorAll('li');
    mainSlideSpan = slideTopBannerBox.querySelector('span');
    

    ListSizeCheck(slideTopBannerListBox, topBannerTargetList);
}
    
function mainSlideBannerList(mainBannerDatas, ulBox, idx){
    var slideTopBannerList = document.createElement('li');
    slideTopBannerList.classList.add('slide_top_banner_list');
    ulBox.append(slideTopBannerList);

    var ListA = document.createElement('a');
    ListA.href = "#";
    slideTopBannerList.append(ListA);

    var ListImg = document.createElement('img');
    ListImg.src = mainBannerDatas[idx].img;
    ListA.append(ListImg);
}

// sub Banner click Slide
var UlWidthPx = 0;
function subBannerSlideCreate(mainSection, subBannerDatas){
    var slideSubBannerBox = document.createElement('div');
    slideSubBannerBox.classList.add('slide_box');
    slideSubBannerBox.classList.add('sub_banner');
    mainSection.append(slideSubBannerBox);

    subBannerBtnLeft = document.createElement('button');
    subBannerBtnLeft.id = "subBtnLeft";
    slideSubBannerBox.append(subBannerBtnLeft);

    var subBannerBox = document.createElement('div');
    subBannerBox.classList.add('sub_banner_box');
    slideSubBannerBox.append(subBannerBox);

    var subBannerBoxUl = document.createElement('ul');
    subBannerBox.append(subBannerBoxUl);

    subBannerBoxListCreate(subBannerDatas, subBannerBoxUl, subBannerDatas.length-1);
    for(var i = 0; i < subBannerDatas.length; i++){
        subBannerBoxListCreate(subBannerDatas, subBannerBoxUl, i);
    }
    subBannerBoxListCreate(subBannerDatas, subBannerBoxUl, 0);

    subBannerBtnRight = document.createElement('button');
    subBannerBtnRight.id = "subBtnRight";
    slideSubBannerBox.append(subBannerBtnRight);

    slideSubBannerBoxUlTag = slideSubBannerBox.querySelector('ul');
    slideSubBannerBoxLiTags = slideSubBannerBox.querySelectorAll('li');

    
    ListSizeCheck(slideSubBannerBoxUlTag, slideSubBannerBoxLiTags);
    
}

function subBannerBoxListCreate(subBannerDatas, subBannerBoxUl, idx){
    var subBannerBoxList = document.createElement('li');
    subBannerBoxUl.append(subBannerBoxList);
    var subBannerBoxListA = document.createElement('a');
    subBannerBoxListA.href = "#";
    subBannerBoxList.append(subBannerBoxListA);
    var subBannerBoxListAImg = document.createElement('img');
    subBannerBoxListAImg.src = subBannerDatas[idx].img 
    subBannerBoxListA.append(subBannerBoxListAImg);
}

function noSlideBannerCreate(noSlideBannerDatas, num){
    var contentBox = document.querySelector('.content_box');

    var noSlideBannerBox = document.createElement('div');
    noSlideBannerBox.classList.add('no_slide_banner');
    noSlideBannerBox.style.background = noSlideBannerDatas[num].backgroundColor;
    contentBox.append(noSlideBannerBox);
    
    var noSlideBannerA = document.createElement('a');
    noSlideBannerA.href = noSlideBannerDatas[num].link;
    noSlideBannerBox.append(noSlideBannerA);

    
    var noSlideBannerAImg = document.createElement('img');
    noSlideBannerAImg.src = noSlideBannerDatas[num].img 
    noSlideBannerA.append(noSlideBannerAImg);
}

function recommendEventBannerCreate(mainDatas, recSlideBannerDatas){
    
    var contentBox = document.querySelector('.content_box');

    var recBannerArticle = document.createElement('article');
    contentBox.append(recBannerArticle);

    var h3 = document.createElement('h3');
    h3.title = mainDatas.name;
    h3.innerText = mainDatas.name;
    recBannerArticle.append(h3);

    var h3A = document.createElement('a');
    h3A.href = mainDatas.link;
    h3.append(h3A);

    var h3ASpan = document.createElement('span');
    h3ASpan.innerText = "더보기";
    h3A.append(h3ASpan);
    var h3ASpanArrow = document.createElement('span');
    h3A.append(h3ASpanArrow);

    var recDiv = document.createElement('div');
    recDiv.classList.add('slide_banner_box');
    recBannerArticle.append(recDiv);

    recUlTag = document.createElement('ul');
    recUlTag.classList.add('slide_banner_listbox');
    recDiv.append(recUlTag);

    //recBannerListCreate
    recListCreate(recUlTag, recSlideBannerDatas, recSlideBannerDatas.length-1);
    for(var i = 0; i < recSlideBannerDatas.length; i++){
        recListCreate(recUlTag, recSlideBannerDatas, i);
    }
    recListCreate(recUlTag, recSlideBannerDatas, 0);
    
    //recBanner-BtnCreate
    var recBtnBox = document.createElement('div');
    recBtnBox.classList.add('slide_indecator_button');
    recDiv.append(recBtnBox);
    
    recBannerBtnLeft = document.createElement('button');
    recBannerBtnLeft.id = "recBtnLeft";
    recBtnBox.append(recBannerBtnLeft);
    var recBtnLeftImg = document.createElement('img');
    recBtnLeftImg.src = "../img/common/icon_topBanner_prev.png";
    recBannerBtnLeft.append(recBtnLeftImg);
    
    recSlideSpan = document.createElement('span');
    recSlideSpan.innerText = "1 / " + recSlideBannerDatas.length ;
    recBtnBox.append(recSlideSpan);
    
    recBannerBtnRight = document.createElement('button');
    recBannerBtnRight.id = "recBtnRight";
    recBtnBox.append(recBannerBtnRight);
    var recBtnRightImg = document.createElement('img');
    recBtnRightImg.src = "../img/common/icon_topBanner_next.png";
    recBannerBtnRight.append(recBtnRightImg);
    
    recUlTag = document.querySelector('.slide_banner_listbox');
    recLiTag = recUlTag.querySelectorAll('.slide_banner_list');
    ListSizeCheck(recUlTag, recLiTag);
}

function recListCreate(recUlTag, recSlideBannerDatas, idx){
    var recLi = document.createElement('ll');
    recLi.classList.add('slide_banner_list');
    recUlTag.append(recLi);

    var recA = document.createElement('a');
    recA.href = recSlideBannerDatas[idx].link;
    recLi.append(recA);

    var recImg = document.createElement('img');
    recImg.src = recSlideBannerDatas[idx].img;
    recA.append(recImg);
}

function bottomAppdownloadCreate(mainSection){
    var downDiv = document.createElement('div');
    downDiv.classList.add('bottom_appdownload');
    mainSection.append(downDiv);

    downloadBtn = document.createElement('button');
    downDiv.append(downloadBtn);

    var downloadImg = document.createElement('img');
    downloadImg.src = "../img/common/headerFooter/appDownload.png";
    downloadImg.alt = "download link";
    downloadBtn.append(downloadImg);

}

//html 태그 생성 END

function ListSizeCheck(targetUl, targetList){
    console.log("targetList");
    var widthValue = 0;
    for(var i = 0; i < targetList.length; i++){
        widthValue += parseInt(window.getComputedStyle(targetList[i]).marginRight.replace("px", "")) + targetList[i].offsetWidth;
    }
    targetUl.style.width = widthValue + "px";
}