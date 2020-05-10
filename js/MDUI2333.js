/*---------- 全局 ----------*/
var sidebar; //侧边栏
var announcement; //公告
var Smilies; //表情框函数
var QAQTab; //表情框
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
/*---------- 鼠标特效 ----------*/
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function clickEffect(){function t(){w.width=2*window.innerWidth,w.height=2*window.innerHeight,w.style.width=window.innerWidth+"px",w.style.height=window.innerHeight+"px",v.scale(2,2),l=w.width=window.innerWidth,h=w.height=window.innerHeight,c={x:l/2,y:h/2},u={x:l/2,y:h/2}}function e(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.x,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c.y,i=0;i<t;i++)r.push(new y(e,n))}function n(t,e){return Math.floor(Math.random()*e)+t}function i(){v.fillStyle="rgba(255, 255, 255, 0)",v.clearRect(0,0,w.width,w.height);for(var t=0;t<r.length;t++){var e=r[t];e.r<0||(v.fillStyle=e.color,v.beginPath(),v.arc(e.x,e.y,e.r,0,2*Math.PI,!1),v.fill(),e.update())}1==s?d+=.2:!s&&d>=0&&(d-=.4),o(),requestAnimationFrame(i)}function o(){for(var t=0;t<r.length;t++){var e=r[t];(e.x+e.r<0||e.x-e.r>l||e.y+e.r<0||e.y-e.r>h||e.r<0)&&r.splice(t,1)}}var r=[],s=!1,a=void 0,d=0,l=void 0,h=void 0,c=void 0,u=void 0,v=void 0,f=["#F73859","#14FFEC","#00E0FF","#FF99FE","#FAF15D"],w=document.createElement("canvas");document.body.appendChild(w),w.setAttribute("style","width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");var p=document.createElement("span");p.classList.add("pointer"),document.body.appendChild(p),w.getContext&&window.addEventListener?(v=w.getContext("2d"),t(),window.addEventListener("resize",t,!1),i(),window.addEventListener("mousedown",function(t){e(n(10,20),t.clientX,t.clientY),document.body.classList.add("is-pressed"),a=setTimeout(function(){document.body.classList.add("is-longpress"),s=!0},500)},!1),window.addEventListener("mouseup",function(t){clearInterval(a),1==s&&(document.body.classList.remove("is-longpress"),e(n(50+Math.ceil(d),100+Math.ceil(d)),t.clientX,t.clientY),s=!1),document.body.classList.remove("is-pressed")},!1),window.addEventListener("mousemove",function(t){var e=t.clientX,n=t.clientY;p.style.top=n+"px",p.style.left=e+"px"},!1)):console.log("canvas or addEventListener is unsupported!");var y=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c.x,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.y;_classCallCheck(this,t),this.x=e,this.y=i,this.angle=2*Math.PI*Math.random(),this.multiplier=1==s?n(14+d,15+d):n(6,12),this.vx=(this.multiplier+.5*Math.random())*Math.cos(this.angle),this.vy=(this.multiplier+.5*Math.random())*Math.sin(this.angle),this.r=n(8,12)+3*Math.random(),this.color=f[Math.floor(Math.random()*f.length)]}return _createClass(t,[{key:"update",value:function(){this.x+=this.vx-u.x,this.y+=this.vy-u.y,u.x=-2/window.innerWidth*Math.sin(this.angle),u.y=-2/window.innerHeight*Math.cos(this.angle),this.r-=.3,this.vx*=.9,this.vy*=.9}}]),t}()}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();clickEffect(); 
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
