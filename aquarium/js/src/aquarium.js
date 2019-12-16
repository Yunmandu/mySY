(function($){
  const wrap = $('#wrap');
  const mainBox =  wrap.find('#mainBox');
  const contentBox = mainBox.find('.contentBox');
  const cBox = contentBox.find('.c_box');
  const cPicArea = cBox.find('.c_pic_area');
  const menuArea = cBox.find('.menu_area');
 
  const cPicUl = cPicArea.children('ul');
  const cPicList = cPicUl.children('li');
  const gnbDdH = $('.gnb').find('dd').eq(0).outerHeight();
  console.log('gnbDdH:', gnbDdH);
  // $('.gnb').find('dd').css('')

$('.gnb').on('mouseenter', function(){
  $(this).find('dd').stop().slideDown();
  $(this).addClass('view');
  $('.navBox').css({backgroundColor:'rgba(1,1,1,0.8)'});
});
$('.gnb').on('mouseleave', function(){
  $(this).find('dd').stop().slideUp();
  $(this).removeClass('view');
  $('.navBox').css({backgroundColor:'rgba(1,1,1,0.3)'});
});

$('.gnb').find('dt').children('a').on('focus', function(e){
  e.preventDefault();
  $('.gnb').find('dd').stop().slideDown();
  $('.navBox').css({backgroundColor:'rgba(1,1,1,0.8)'})
 $(this).parents('.gnb').addClass('view');

});

$('.gnb').find('dd').find('li').children('a').eq(-1).on('blur',function(e){
 e.preventDefault();
 $('.gnb').find('dd').stop().slideUp();
 $('.gnb').removeClass('view');
 $('.navBox').css({backgroundColor:'rgba(1,1,1,0.3)'})
});


let mob=480, tab=768, pc=1280, laptop=1366, pcfull

let nowDevice =$(window).outerWidth(true);

const DeviceCheck = function(w){
if(w <= mob){nowDevice = mob;}
else if(w > mob && w <= tab){nowDevice = tab;}
else if(w > tab && w <= pc){nowDevice = pc;}
else if(w > pc && w <=laptop){nowDevice = laptop;}
else{nowDevice = pcfull;}
return nowDevice;
}; //DeviceCheck();

const win = $(window);
let winWidth = win.outerWidth();
let beforeDevice = DeviceCheck(winWidth);

win.on('resize',function(){
  let nowWinW = win.outerWidth();
  let afterDevice = DeviceCheck(nowWinW);
  if(winWidth !== nowWinW && beforeDevice !== afterDevice){
    location.reload();
  }
})




//-----------------------------------------------------------------

/*   for(let i=0; i < cPicList.length; i++){
    cPicList.eq(i).css({zIndex:cPicList.length - i});
  } */

  cPicList.eq(0).show();
  cPicList.eq(0).siblings().hide();

  menuArea.css({zIndex:cPicList.length*2});


  const menuUl = menuArea.children('ul');
  const menuList = menuUl.children('li');
  const menuLink = menuList.children('a');

//menu------------------------------------------------------------------

  menuLink.on('mouseenter focus',function(e){
    // e.preventDefault();
    // console.log('on!!!!!!');
    let i = $(this).parents('li').index();
    cPicList.eq(i).siblings().css({zIndex:0});
    cPicList.eq(i).stop().siblings().fadeOut();
    cPicList.eq(i).css({zIndex:cPicList.length+1});
    cPicList.eq(i).stop().fadeIn();
    $(this).parents('li').siblings().removeClass('act');
    $(this).parents('li').addClass('act');
  });

  menuLink.on('mouseleave blur',function(){
    $(this).parents('li').removeClass('act');
  })

//slide------------------------------------------------------------------

  const adBox = $('.adBox');
  const slideForm = $('.ad_zone');
  const slideUl = slideForm.children('ul');
  const slideLi = slideUl.children('li');
  const slideLiLink = slideLi.children('a');
  const indicator = adBox.find('.indicator');
  const indiLi = indicator.children('li');
  const indiLink = indiLi.children('a');


  let winW = $(window).outerWidth();
  indiLi.eq(0).addClass('action');

  for(let i=0; i< slideLiLink.length; i++){
    let liname = 'ad_pic_'+(i+1);
    slideLiLink.eq(i).addClass(liname);
  }

 let n = 0;
  if(winW >= 1280){
      
    slideLi.eq(n).addClass('action');
    indiLi.on('click focus',function(e){
      e.preventDefault();
      n = $(this).index();
      indiLi.eq(n).addClass('action');
      indiLi.eq(n).siblings().removeClass('action');
      slideUl.animate({left:-100*n+'%'});
      slideLi.eq(n).addClass('action');
      slideLi.eq(n).siblings().removeClass('action');
    });
  }else{
    
    let harf = Math.floor(indiLi.length/2);
    indiLi.eq(harf).nextAll().prependTo(indicator);
    slideLi.eq(n - harf - 1).addClass('action');

    indiLi.on('click',function(e){
      e.preventDefault();
      n = $(this).index() - harf;
      console.log(n);
      indiLi.eq(n).addClass('action');
      indiLi.eq(n).siblings().removeClass('action');
      slideUl.animate({left:-100*n+'%'});
      slideLi.eq(n - harf - 1).addClass('action');
      slideLi.eq(n - harf - 1).siblings().removeClass('action');

    // if(n < harf){
            
    // }
  });
}  
//-----------------------------------------------------------------

const navBox = $('.navBox');
const navMenu = navBox.children('a');
const popUp = $('.navPop_up');
const close = popUp.find('.close');

navMenu.on('click',function(e){
e.preventDefault();
 popUp.fadeIn();
});

close.on('click',function(e){
  e.preventDefault();
  popUp.fadeOut();
});


  
})(jQuery);
