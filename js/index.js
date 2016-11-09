var iNow=0;
var timer=null;
var timeout=null;
var iPlay=true;
var isOpen=false;
var fx='lr';
$('#skin').change(function(){
	$('body').css('background','url(img/bg/'+$(this).val()+'.jpg)');
});
$('.content ul').on('click','li',function(){
	$('.opa div').addClass('width80');
	$('.opa div').html('<a href="javascript:;" class="prev"></a><a href="javascript:;" class="next"></a><img  src="img/dummies/'+$(this).children('img').attr('data')+'.jpg">');
	$('.opa').show();	
});
$('.opa div').hover(
	function(){
		$('.opa div  a').show();
	},
	function(){
		$('.opa div a').hide();
	}
);
$('.opa div').on('click','.prev',function(){
	iNow--;
	iNow=0>iNow?$('.content ul li').size()-1:iNow;
	$('.opa div img').attr('src','img/dummies/land-'+(iNow+1)+'.jpg');
});
$('.opa div').on('click','.next',function(){
	iNow++;
	iNow=$('.content ul li').size()-1<iNow?0:iNow;
	$('.opa div img').attr('src','img/dummies/land-'+(iNow+1)+'.jpg');
});
$('.opa .con_close').click(function(){
	$('.opa').hide();
	$('.opa div').removeClass('width80');
	$('.opa').css('zIndex','0');
	$('.opa div').html('');
});

$('.foot_open').click(
	function(){
		if(!isOpen){
			$('.foot_open').css('background','url(img/footer-close-dark.png) no-repeat');
			$('.foot_opa').hide();
			$('.foot_opa').css('height','0');
			$('.foot_content').stop().animate({height:'93%'});
		}else{
			$('.foot_open').css('background','url(img/footer-open-dark.png)');
			$('.foot_content').stop().animate({height:'0'});
		}
		isOpen=!isOpen;
	}
);
// $(document).on('wheel',function(){
// 	if(isOpen){
// 		$('.foot_open').css('background','url(img/footer-close-dark.png)');
// 		$('.foot_opa').hide();
// 		$('.foot_opa').css('height','0');
// 		$('.foot_content').stop().animate({height:'93%'});
// 	}
// 	isOpen=true;
// });
//轮播图 start
var i=0;
$('.content ul').css('width',$('.content ul li').width()*($('.content ul li').size())+$('.content ul li').size()*26+'px');
$('.opa').hover(
	function(){
		clearInterval(timer);
	},
	function(){
		timer=setInterval(setTime,2000);
	}
);
$('.content').hover(
	function(){
		clearInterval(timer);
	},
	function(){
		timer=setInterval(setTime,2000);
	}
);
function setTime(){
	if(fx=='lr'){
		i++;
	}else if(fx=='rl'){
		i--;
	}
	$('.content ul').stop().animate({left:-i*$('.content ul li').width()-i*26+'px'},500,function(){
		if(i==0){
			fx='lr';
		}else if(i==$('.content ul').find('li').size()-4){
			fx='rl';
		}
	});
};
timer=setInterval(setTime,2000);
//轮播图 end
$('.reset').click(
	function(){
		$('.foot_opa').show();
		$('.foot_opa').stop().animate({height:'40%'},1000);
	}
);
$('.foot_opa .close').click(
	function(){
		$('.foot_opa').stop().animate({height:'0%'},500);
		timeout!=null?clearTimeout(timeout):timeout=null;
		timeout=setTimeout(function(){
			$('.foot_opa').hide();
		},500);
	}
);
$('.foot_opa ul').on('click','li',function(){
	$('body').css('background','url(img/bg/'+$(this).children('img').attr('alt')+'.jpg)');
	$('.foot_content .foot_con_body').css('background','url(img/bg/'+$(this).children('img').attr('alt')+'.jpg)');
});
$('.foot_con_menu ul').on('click','li',
	function(){
		$('.foot_con_menu ul li a').removeClass('on');
		$(this).children('a').addClass('on');
		$('.con_body_text div').removeClass('active').eq($(this).index()).addClass('active');
	}
);
$('.bg_music').click(function(){
	if(iPlay){
		var str='您确定要关闭背景音乐吗？';
		showQuestion(str);
		$('.popup_title .popup_close').click(function(){
			if(!callState(false)){
				$('.popup_opa').hide();
			}
		});
		$('.popup_txt .no').click(function(){
			if(!callState(false)){
				$('.popup_opa').hide();
			}
		});
		$('.popup_txt .ok').click(function(){
			if(callState(true)){
				$('.popup_opa').hide();
				$('.bg_music audio')[0].pause();
				$('.bg_music audio')[0].currentTime=0;
				iPlay=false;
			}
		});
	}else{
		var str='您确定要开启背景音乐吗？';
		showQuestion(str);
		$('.popup_title .popup_close').click(function(){
			if(!callState(false)){
				$('.popup_opa').hide();
			}
		});
		$('.popup_txt .no').click(function(){
			if(!callState(false)){
				$('.popup_opa').hide();
			}
		});
		$('.popup_txt .ok').click(function(){
			if(callState(true)){
				$('.popup_opa').hide();
				$('.bg_music audio')[0].play();
				iPlay=true;
			}
		});
	}
});
$('.popup_title').mousedown(function(e){
	var disX=e.pageX-$(this).parent().offset().left;
	var disY=e.pageY-$(this).parent().offset().top;
	$(this).bind('mousemove',function(e){
		var left=e.pageX-disX;
		var top=e.pageY-disY;
		if(left<0){
			left=0;
		}
		if(left>$(document.body).width()-$(this).parent().width()){
			left=$(document.body).width()-$(this).parent().width();
		}
		if(top<0){
			top=0;
		}
		if(top>$(document.body).height()-$(this).parent().height()){
			top=$(document.body).height()-$(this).parent().height();
		}
		$('.popup_con').css({'left':left+'px','top':top+'px'});
	});
	$(document).mouseup(function(){
		$('.popup_title').unbind('mousemove');
	});
});
//提示框使用方法 
//	 如： 	1.showQuestion('你确定要删除吗？');
//		  	2.点击确定时，给callState(true)传入true
//			3.点击取消或者关闭时，给callState(false)传入false
//			4.使用callState(参数)相应参数返回的结果判断是否是想要得到的结果，然后做相应的操作
function showQuestion(str){
	$('.popup_opa .question').html(str);
	$('.popup_opa').show();
}
function callState(sta){
	return sta;
}