$(document).ready(function () {
	/* doms*/
	$w = $(window);
	w = $w.width();
	h = $w.height();
	$zhr = $("#zhr");
	$wel = $("#wel");
	$hanrume = $("#hanrume");
	$sakura = $("#sakura");
	$background = $("#background");
	$images = $("#images");
    fontSize = h * 0.021 * 1.5;
	/* constant */
	IMG_BASIC_X = w * 0.1 + 10;
	IMG_BASIC_Y = h * 0.1 + 10;
	IMG_COUNT = 13;
	IMG_NOT_LOAD = 13;
    $hanrume.css({"font-size":"5em"});
    if (h > w) {
		$hanrume.html("请切换到横屏模式后刷新<br>使用chrome并最大化获得最佳效果")
		$hanrume.css({
			"top": (h - $hanrume.height()) * 0.4 + "px",
			"dispaly":"block",
			"left": (w - $hanrume.width()) * 0.5 + "px",
		});
		return
	}

	$hanrume.css({
		"top": (h - $hanrume.height()) * 0.4 + "px",
		"left": (w - $hanrume.width()) * 0.5 + "px",
		"display":"block",
	});
	$zhr.css({
		"top": "10px",
		"left": "20px",
		"display":"block",
	});
	$wel.css({
		"top": ($zhr.height() + 15) + "px",
		"left": "20px",
		"display":"block",
	});
	$background.css({
		"top":  h * 0.1 + "px",
		"left": w * 0.1 + "px",
	});

   	$('#text').css({
		"top":  (h * 0.1 + 10 + fontSize / 1.5) + "px",
		"left": (w * 0.9 - 10 - 10 * fontSize) + "px",
        "font-size": fontSize
	});
});
function start() {
    $hanrume.attr("onclick", "");
    setTimeout(function() {
       realStart();
	}, 250)

}


function realStart() {
	audio = document.getElementById('audio');
	audio.volume=0.05;
	audio.play();
	var audioInterval = setInterval(function(){
		var volume = audio.volume;
		if(!volume){
			return;
		}

		if(audio.volume >= 0.90){
			return;
		}

		audio.volume += 0.1;
	}, 1000);

	$sakura.fadeIn(1500);
	$background.delay(2500).fadeIn(1000);
	transition($hanrume, {
		"font-size": "2em",
		"top": (h - 64) + "px",
		"left": (w - 192) + "px",
		"color":"#fff"
	}, 2.5);
	$wel.fadeOut(1000);
	$zhr.fadeOut(1000);
    setTimeout(function() {
        initImage();
        imageBegin();
	}, 1500);
}

function initImage() {

	$images.children("div").each(function(i,el) {
		$div = $(el);
		$img = $($div.children("img")[0]);
		$img.css({
			"height": (h * 0.8 - 10) + "px",
			"boder-radius": "5px",
		});
		$div.css({
			"height":$img.height(),
			"width":$img.width(),
			"top": (h - $img.height()) * 0.5 + "px",
			"left": (w - $img.width()) * 0.5 + "px",
		})
		$img.attr("style", "max-width: 100%; max-height: 100%; vertical-align: middle;");
		$div.css({
			"opacity":1,
			"display":"none"
		})
	});

}
function imageBegin() {

    imgHeight= (h * 0.8 - 20) / 3;
	imageCount = 0;
	fadeInTime = 3000;
	fadeOutTime = 1500;
	stayTime = 1000;
	$images.children("div").each(function(i,el) {
		var $img = $(el);
		$img.delay(3500 + (fadeInTime + stayTime) * i).fadeIn(fadeInTime).delay(stayTime).fadeOut(fadeOutTime);
		setTimeout(function() {
			$img.css( {
				"height": imgHeight,
				"width": imgHeight / $img.height() * $img.width(),
				"top": IMG_BASIC_Y + imgHeight * (i % 3),
				"left":caculatLeft(i, imgHeight)
			}).fadeIn(1000);
		}, 3500 + (fadeInTime + stayTime) * (IMG_COUNT - 1) + stayTime + fadeInTime + fadeOutTime + 800 * i);
	});
	setTimeout(function() {
		shownew();
	}, 3500 + (fadeInTime + stayTime) * (IMG_COUNT - 1) + stayTime + fadeInTime + fadeOutTime + 800 * IMG_COUNT + 1000);
}
function caculatTop(index, w) {
	var top = IMG_BASIC_Y;
	var min = Math.floor(index / 4) * 4;
	var max = index;
	$images.children("div").each(function(i, el) {
		var $img = $($(el).children("img")[0])
		if(i >= min && i < max) {
			top += w / $(el).widht() * $(el).height();
		}
	});
	return top;
}

function caculatLeft(index, h) {
	var left = IMG_BASIC_X;
	var is = (index) % 3;
	$images.children("div").each(function(i, el) {
		if(i < index && (i % 3) === is) {
			var $img = $($(el).children("img")[0])
			left = left +  $(el).width();
		}
	});
	return left;
}

function transition($el, css, duration, type) {
	type = type||"all"
	duration = duration||1;
	$mock = $("<div>");
	$mock.attr("style", $el.attr("style"));
	$mock.css(css);
	$el.css({
		"transition": type + " " + duration + "s",
		"-webkit-transition": type + " " + duration + "s",
		"-o-transition": type + " " + duration + "s",
		"-ms-transition": type + " " + duration + "s",
		"-moz-transition": type + " " + duration + "s",
	});
	$el.css(css);
	$el.css($mock.attr("style"));
}

var NewsTime = 2000;
var TextTime = 150;

var newsi = 0;
var txti = 0;
var txttimer;
var newstimer;

var newstitle = [
	"我的",
	"心里都是你",
];
function shownew(){
	if (newsi == 0 && txti == 0) {
		for (i in newstitle) {
			$("#text").append("<p>");
		}
	}
	if (newsi >= newstitle.length) {
		clearInterval(txttimer);
		clearInterval(newstimer);
		return;
	}
	hwnewstr=newstitle[newsi];

	if(txti>=hwnewstr.length){
		clearInterval(txttimer);
		clearInterval(newstimer);
		newsi++;
		newstimer = setInterval("shownew()",NewsTime);
		txti = 0;
		return;
	}
	clearInterval(txttimer);
	$($("#text").children('p')[newsi]).append(hwnewstr.substring(txti,txti+1));

	txti++;
	txttimer = setInterval("shownew()",TextTime);
}
