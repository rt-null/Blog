/*---------- 全局 ----------*/
var sidebar; //侧边栏
var announcement; //公告
var Smilies; //表情框函数
var QAQTab; //表情框
//百毒的自动推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
function animatecss(element,animationName,speed,callback){ //Animate.css动画
	const node=document.querySelector(element);
	node.classList.add('animated',animationName);
	$(element).css('animation-duration',speed);
	function handleAnimationEnd(){
		node.classList.remove('animated',animationName);
		node.removeEventListener('animationend',handleAnimationEnd);
		if (typeof callback==='function') callback();
	}
	node.addEventListener('animationend',handleAnimationEnd);
}
function mduisnackbar(data){ //MDUI-Snackbar（覆盖公告）
	if (announcement!=null) announcement.close();mdui.snackbar(data);
}

/*---------- 初始化 ----------*/
function globallistener(){ //全局监听
	$('#gototop').click(function(){$('html,body').animate({scrollTop:'0px'},'normal');});
	$(window).scroll(function(){
		if ($(window).scrollTop()>200) $('#gototop').removeClass('mdui-fab-hide');
		else $('#gototop').addClass('mdui-fab-hide');
	});
	sidebar=new mdui.Drawer('#sidebar',{overlay:true});
	$('#togglesidebar').on('click',function(){sidebar.toggle();});
}
function ExSearchCall(item){ //ExSearch插件PJAX跳转
	if (item&&item.length){
		$('.ins-close').click();let url=item.attr('data-url');
		$.pjax({url:url,container:'#pjax-container',fragment:'#pjax-container',timeout:8000});
	}
}
function showannouncement(msg,pos){ //显示公告
	if (msg!=null && pos!=null) announcement=mdui.snackbar({message:msg,position:pos,closeOnOutsideClick:false,buttonText:'OK',timeout:0});
}
function highlightinit(mode){ //代码高亮初始化
	if (mode=='highlightjs') hljs.initHighlightingOnLoad();
}

/*---------- 重载 ----------*/
function showoverlay(){ //显示PJAX加载遮罩
	$('#pjax-overlay').css('display','block');
	$('#pjax-progress').css('display','block');
}
function closeoverlay(){ //隐藏PJAX加载遮罩
	animatecss('#pjax-overlay','fadeOut','0.5s',function(){$('#pjax-overlay').css('display','none');});
	animatecss('#pjax-progress','fadeOut','0.5s',function(){$('#pjax-progress').css('display','none');});
}
function changetitle(){ //更新副标题
	var title=$(document).attr("title");var pos=title.lastIndexOf(' - ');
	var header=(pos>=0?title.substring(0,pos):'首页');$('#header-title').text(header);
}
function showposttoc(opt){ //生成文章目录
	if (opt==true){
		$(".post-container").headIndex({
			articleWrapSelector:'.post-container',
			indexBoxSelector:'#post-toc'
		});
	}
}
function codelinenumber(element){ //代码行号
	$(element).find('pre code').each(function(){
		var lines=$(this).text().split('\n').length;
		var numbering=$('<ul/>').addClass('pre-numbering');
		for(var i=1;i<=lines;i++) numbering.append($('<li/>').text(i));
		$(this).addClass('has-numbering').parent().prepend(numbering);
	});
}
function mathjaxreload(element){ //MathJax重载
	MathJax.Hub.Typeset(document.getElementById(element));
}
function highlightreload(mode,element){ //代码高亮重载
	if (mode=='highlightjs'){
		document.querySelectorAll(element+' pre code').forEach((block) => {hljs.highlightBlock(block);});
	} else {
		document.querySelectorAll(element+' pre code').forEach((block) => {Prism.highlightElement(block);});
	}
}

/*---------- 评论区函数 ----------*/
function typechocomment(respondId){ //typecho评论函数
	window.TypechoComment = {
		dom : function (id) {return document.getElementById(id);},
		create : function (tag, attr) {
			var el = document.createElement(tag);			
			for (var key in attr) {el.setAttribute(key, attr[key]);}
			return el;
		},
		reply : function (cid, coid) {
			var comment = this.dom(cid), parent = comment.parentNode,
				response = this.dom(respondId), input = this.dom('comment-parent'),
				form = 'form' == response.tagName ? response : response.getElementsByTagName('form')[0],
				textarea = response.getElementsByTagName('textarea')[0];
			if (null == input) {
				input = this.create('input', {
					'type' : 'hidden',
					'name' : 'parent',
					'id'   : 'comment-parent'
				});
				form.appendChild(input);
			}
			input.setAttribute('value', coid);
			if (null == this.dom('comment-form-place-holder')) {
				var holder = this.create('div', {
					'id' : 'comment-form-place-holder'
				});
				response.parentNode.insertBefore(holder, response);
			}
			comment.appendChild(response);
			this.dom('cancel-comment-reply-link').style.display = '';
			if (null != textarea && 'text' == textarea.name) {textarea.focus();}
			return false;
		},
		cancelReply : function () {
			var response = this.dom(respondId),
			holder = this.dom('comment-form-place-holder'), input = this.dom('comment-parent');
			if (null != input) {input.parentNode.removeChild(input);}
			if (null == holder) {return true;}
			this.dom('cancel-comment-reply-link').style.display = 'none';
			holder.parentNode.insertBefore(response, holder);
			return false;
		}
	};
}
function smiliesreload(){ //表情框函数
	Smilies={
		dom:function(id) {return document.getElementById(id);},
		grin:function(tag){
			tag=' '+tag+' ';myField=this.dom('commenttextarea');
			document.selection?(myField.focus(),sel=document.selection.createRange(),sel.text=tag,myField.focus()):this.insertTag(tag);
		},
		insertTag:function(tag){
			myField=Smilies.dom('commenttextarea');
			myField.selectionStart || myField.selectionStart=='0'?(
				startPos=myField.selectionStart,endPos=myField.selectionEnd,cursorPos=startPos,
				myField.value=myField.value.substring(0,startPos)+tag+myField.value.substring(endPos,myField.value.length),
				cursorPos+=tag.length,myField.focus(),myField.selectionStart=cursorPos,myField.selectionEnd=cursorPos
			):(myField.value+=tag,myField.focus());
		}
	}
}
function QAQTABreload(){ //表情框监听重载
	QAQTab=new mdui.Tab('#QAQTab');
	$('#QAQ').on('open.mdui.dialog',function(){QAQTab.handleUpdate();});
}
function smoothscroll(element){ //平滑移动监听重载
	$(element).click(function(){if (location.hostname==this.hostname && location.pathname==this.pathname){var target=$(this.hash);if (target.length) {$('html,body').animate({scrollTop:target.offset().top},'fast');return false;}}});
}
function visitorfunction(opt,gravatarurl){ //评论者为访客时的函数
	if (opt==false){
		$('#emailavatar').attr('src',gravatarurl+md5($("input#mail").val())+'?s=100&d=mystery');
		$('input#mail').blur(function(){$('#emailavatar').attr('src',gravatarurl+md5($("input#mail").val())+'?s=100&d=mystery');});
		$('input[name="receiveMail"]').change(function(){
			var status=$('input[name="receiveMail"]').is(':checked');
			if (!status) {$('#receiveMailicon').html('&#xe7f6;');$('#receiveMailicon').addClass('mdui-text-color-grey');$('#receiveMailicon').removeClass('mdui-text-color-theme-accent');}
			else {$('#receiveMailicon').html('&#xe7f7;');$('#receiveMailicon').addClass('mdui-text-color-theme-accent');$('#receiveMailicon').addClass('mdui-text-color-grey');}
		});
	}
}
function ajaxcomment(options){ //AJAX评论
	var highlightmode=options.highlightmode;var commentsuccess=options.commentsuccess;
	$('#comment-form').submit(function(){
		var commentdata=$(this).serializeArray();
		$.ajax({
			url:$(this).attr('action'),
			type:$(this).attr('method'),
			data:commentdata,
			beforeSend:function() {$('#commentsumbit').css('display','none');$('#commenting').css('display','block');},
			error:function() {mdui.alert('发生了未知错误','评论失败');$('#commenting').css('display','none');$('#commentsumbit').css('display','block');},
			success:function(data){
				$('#commenting').css('display','none');$('#commentsumbit').css('display','block');
				var error=/<title>Error<\/title>/;
				if (error.test(data)){
					var text=data.match(/<div(.*?)>(.*?)<\/div>/is);
					var str='发生了未知错误';if (text!=null) str=text[2];
					mdui.alert(str,'评论失败');
				} else {
					$('#commenttextarea').val('');$('#commenttextarea').css('height','');
					if ($('#cancel-comment-reply-link').css('display')!='none') $('#cancel-comment-reply-link').click();
					var target='#comments',parent=true,latest=-19260817;
					$.each(commentdata,function(i,field) {if (field.name=='parent') parent=false;});
					if (!parent || !$('div.page-navigator .prev').length){
						$('#comments .mdui-panel',data).each(function(){
							var id=$(this).attr('id'),coid=parseInt(id.substring(8));
							if (coid>latest) {latest=coid;target='#'+id;}
						});
					}
					$('#recentcomment').html($('#recentcomment',data).html());
					$('#commentsnumber').html($('#commentsnumber',data).html());
					$('#commentcontent').html($('#commentcontent',data).html());
					mathjaxreload('commentcontent');codelinenumber('#commentcontent');
					highlightreload(highlightmode,'#commentcontent');smoothscroll('.haveat a');mdui.mutation();
					$('html,body').animate({scrollTop:$(target).offset().top},'fast');
					mduisnackbar({message:commentsuccess,position:'right-bottom'});
				}
			}
		});
		return false;
	});
}
<!-- 鼠标点击 -->
function clickEffect() {
    let balls = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);

    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        window.addEventListener('resize', updateSize, false);
        loop();
        window.addEventListener("mousedown", function(e) {
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function() {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        window.addEventListener("mouseup", function(e) {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }, false);
        window.addEventListener("mousemove", function(e) {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }, false);
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }


    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }
    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();
            if (longPressed == true) {
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                this.multiplier = randBetween(6, 12);
            }
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            this.r = randBetween(8, 12) + 3 * Math.random();
            this.color = colours[Math.floor(Math.random() * colours.length)];
        }
        update() {
            this.x += this.vx - normal.x;
            this.y += this.vy - normal.y;
            normal.x = -2 / window.innerWidth * Math.sin(this.angle);
            normal.y = -2 / window.innerHeight * Math.cos(this.angle);
            this.r -= 0.3;
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }

    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }

    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.r < 0) continue;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();
            b.update();
        }
        if (longPressed == true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        requestAnimationFrame(loop);
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}
clickEffect();//调用
<!-- 鼠标点击 -->
