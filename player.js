!function e(t,o,n){function i(r,l){if(!o[r]){if(!t[r]){var a="function"==typeof require&&require;if(!l&&a)return a(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=o[r]={exports:{}};t[r][0].call(c.exports,function(e){var o=t[r][1][e];return i(o?o:e)},c,c.exports,e,t,o,n)}return o[r].exports}for(var s="function"==typeof require&&require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(e,t){function o(e){for(var t=[],o=1;o<arguments.length;o++){var i=arguments[o],s=i.init;t.push(s),delete i.init,n(e.prototype,i)}e.prototype.init=function(){t.forEach(function(e){e.call(this)}.bind(this))}}var n=e("./extend");t.exports=o},{"./extend":9}],2:[function(e,t){var o=e("./player.css"),n=e("./player.html"),i=(e("./extend"),e("./createElement")),s=e("./parseDOMByClassNames");t.exports={init:function(){var e=function(){var e=this.iframe.contentDocument.getElementsByTagName("head")[0],t=this.iframe.contentDocument.body;i("style",function(){e.appendChild(this);try{this.styleSheet.cssText=o}catch(t){this.appendChild(document.createTextNode(o))}}),i("link",{appendTo:e,href:"http://libs.cncdn.cn/font-awesome/4.3.0/css/font-awesome.min.css",rel:"stylesheet",type:"text/css"}),t.innerHTML=n,this.DOMs=s(t,["player","video","video-frame","comments","comments-btn","play","progress_anchor","buffered_anchor","fullscreen","allscreen","hd","volume_anchor","current","duration"]),this.video=this.DOMs.video}.bind(this),t=document.getElementById(this.id),r=this.iframe=i("iframe",{allowTransparency:!0,frameBorder:"no",scrolling:"no",src:"about:blank",mozallowfullscreen:"mozallowfullscreen",webkitallowfullscreen:"webkitallowfullscreen",style:{width:this.size[0]+"px",height:this.size[1]+"px",overflow:"hidden"}});t&&t.parentNode?(t.parentNode.replaceChild(r,t),e()):(document.body.appendChild(r),e(),document.body.removeChild(r))}}},{"./createElement":7,"./extend":9,"./parseDOMByClassNames":11,"./player.css":12,"./player.html":13}],3:[function(e,t){var o=(e("./createElement"),.1),n=25,i=4e3,s='bold 18px "PingHei","Lucida Grande", "Lucida Sans Unicode", "STHeiti", "Helvetica","Arial","Verdana","sans-serif"';t.exports={init:function(){setInterval(this.onCommentTimeUpdate.bind(this),80),this.lastCommnetUpdateTime=0,this.lastCommnetIndex=0,this.commentLoopPreQueue=[],this.commentLoopQueue=[],this.commentButtonPreQueue=[],this.commentButtonQueue=[],this.commentTopPreQueue=[],this.commentTopQueue=[],this.enableComment=void 0===this.comments?!1:!0,this.canvas=this.DOMs.comments.getContext("2d"),this.DOMs.player.classList.add("has-comments"),this.DOMs["comments-btn"].classList.add("enable"),this.DOMs.comments.display=this.enableComment?"block":"none"},drawText:function(e,t,o,n){this.canvas.fillStyle=n,this.canvas.strokeText(e,0|t,0|o),this.canvas.fillText(e,0|t,0|o)},drawCommentTop:function(){var e=Date.now();this.canvas.textAlign="center",this.commentTopQueue.forEach(function(t,o){void 0!=t&&(e>t.startTime+commentTopOrTopShowDuration?this.commentTopQueue[o]=void 0:this.drawText(t.text,this.canvasWidth/2,n*o,t.color))}.bind(this));for(var t;t=this.commentTopPreQueue.shift();)t={startTime:e,text:t.text,color:t.color},this.commentTopQueue.forEach(function(e,o){t&&void 0===e&&(e=this.commentTopQueue[o]=t,this.drawText(e.text,this.canvasWidth/2,n*o,e.color),t=void 0)}.bind(this)),t&&(this.commentTopQueue.push(t),this.drawText(t.text,this.canvasWidth/2,n*(this.commentTopQueue.length-1),t.color))},drawCommentBottom:function(){var e=Date.now(),t=this.video.offsetHeight+10;this.canvas.textAlign="center",this.commentButtonQueue.forEach(function(o,s){void 0!=o&&(e>o.startTime+i?this.commentButtonQueue[s]=void 0:this.drawText(o.text,this.canvasWidth/2,t-n*(s+1),o.color))}.bind(this));for(var o;o=this.commentButtonPreQueue.shift();)o={startTime:e,text:o.text,color:o.color},this.commentButtonQueue.forEach(function(e,i){o&&void 0===e&&(e=this.commentButtonQueue[i]=o,this.drawText(e.text,this.canvasWidth/2,t-n*(i+1),e.color),o=void 0)}.bind(this)),o&&(this.commentButtonQueue.push(o),this.drawText(o.text,this.canvasWidth/2,t-n*this.commentButtonQueue.length,o.color))},createLoopComment:function(e,t){return void 0===e?!1:{startTime:t,text:e.text,color:e.color,width:this.canvas.measureText(e.text).width+20}},drawCommentLoop:function(){{var e=Date.now(),t=this.video.offsetWidth,i=this.video.offsetHeight,s=this.canvasWidth;this.canvasHeight}this.canvas.textAlign="left";for(var r=i/n|0,l=-1;++l<r;){var a=this.commentLoopQueue[l];if(void 0===a&&(a=this.commentLoopQueue[l]=[]),this.commentLoopPreQueue.length>0){var c=0===a.length?void 0:a[a.length-1];if(void 0===c||(e-c.startTime)*o>c.width){var h=this.createLoopComment(this.commentLoopPreQueue.shift(),e);h&&a.push(h)}}this.commentLoopQueue[l]=a.filter(function(i){var r=(e-i.startTime)*o;return 0>r||r>i.width+t?!1:(this.drawText(i.text,s-r,n*l+20,i.color),!0)}.bind(this))}for(var d=this.commentLoopQueue.length-r;d-->0;)this.commentLoopQueue.pop()},drawComment:function(){var e=this.DOMs["video-frame"].offsetWidth,t=this.DOMs["video-frame"].offsetHeight;e!=this.canvasWidth&&(this.DOMs.comments.setAttribute("width",e),this.canvasWidth=e),t!=this.canvasHeight&&(this.DOMs.comments.setAttribute("height",t),this.canvasHeight=t),this.canvas.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.canvas.strokeStyle="black",this.canvas.lineWidth=2,this.canvas.font=s,this.drawCommentLoop(),this.drawCommentBottom()},onCommentTimeUpdate:function(){if(this.enableComment!==!1){var e=this.video.currentTime;if(Math.abs(e-this.lastCommnetUpdateTime)<=1&&e>this.lastCommnetUpdateTime){var t=0;for(this.lastCommnetIndex&&this.comments[this.lastCommnetIndex].time<=this.lastCommnetUpdateTime&&(t=this.lastCommnetIndex);++t<this.comments.length;)if(!(this.comments[t].time<=this.lastCommnetUpdateTime)){if(this.comments[t].time>e)break;switch(this.comments[t].pos){case"bottom":this.commentButtonPreQueue.push(this.comments[t]);break;case"top":this.commentTopPreQueue.push(this.comments[t]);break;default:this.commentLoopPreQueue.push(this.comments[t])}this.lastCommnetIndex=t}}try{this.drawComment()}catch(o){}this.lastCommnetUpdateTime=e}}}},{"./createElement":7}],4:[function(e,t){function o(e){return Array.prototype.slice.call(e)}function n(e,t,o,n){function i(t){var o=(t.clientX-e.parentNode.getBoundingClientRect().left)/e.parentNode.offsetWidth;return Math.min(Math.max(o,0),1)}function s(t){1==t.which&&(a=!0,e.draging=!0,r(t))}function r(e){if(1==e.which&&a===!0){var t=i(e);o(t)}}function l(t){if(1==t.which&&a===!0){var s=i(t);o(s),n(s),a=!1,delete e.draging}}var a=!1;o=o||function(){},n=n||function(){},e.parentNode.addEventListener("mousedown",s),t.addEventListener("mousemove",r),t.addEventListener("mouseup",l)}var i=(e("./createElement"),e("./delegateClickByClassName")),s=e("./timeFormat");t.exports={init:function(){var e=this.iframe.contentDocument,t=i(e);t.on("play",this.onPlayClick,this),t.on("video-frame",this.onVideoClick,this),t.on("source",this.onSourceClick,this),t.on("allscreen",this.onAllScreenClick,this),t.on("fullscreen",this.onfullScreenClick,this),t.on("normalscreen",this.onNormalScreenClick,this),t.on("comments-btn",this.oncommentsBtnClick,this),this.DOMs.player.addEventListener("mousemove",this.onMouseActive.bind(this)),n(this.DOMs.progress_anchor,e,this.onProgressAnchorWillSet.bind(this),this.onProgressAnchorSet.bind(this)),n(this.DOMs.volume_anchor,e,this.onVolumeAnchorWillSet.bind(this))},onVideoClick:function(){void 0==this.videoClickDblTimer?this.videoClickDblTimer=setTimeout(function(){this.videoClickDblTimer=void 0,this.onPlayClick()}.bind(this),300):(clearTimeout(this.videoClickDblTimer),this.videoClickDblTimer=void 0,document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement?this.onNormalScreenClick():this.onfullScreenClick())},onMouseActive:function(){this.DOMs.player.classList.add("active"),clearTimeout(this.MouseActiveTimer),this.MouseActiveTimer=setTimeout(function(){this.DOMs.player.classList.remove("active")}.bind(this),1e3)},onPlayClick:function(){this.DOMs.play.classList.contains("paused")?(this.video.play(),this.DOMs.play.classList.remove("paused")):(this.video.pause(),this.DOMs.play.classList.add("paused"))},onSourceClick:function(e){e.classList.contains("curr")||(this.video.preloadStartTime=this.video.currentTime,this.video.src=this.sourceList[0|e.getAttribute("sourceIndex")][1],o(e.parentNode.childNodes).forEach(function(t){e===t?t.classList.add("curr"):t.classList.remove("curr")}.bind(this)))},onProgressAnchorWillSet:function(e){var t=this.video.duration,o=t*e;this.DOMs.current.innerHTML=s(o),this.DOMs.duration.innerHTML=s(t),this.DOMs.progress_anchor.style.width=100*e+"%"},onProgressAnchorSet:function(e){this.video.currentTime=this.video.duration*e},onVolumeAnchorWillSet:function(e){this.video.volume=e,this.DOMs.volume_anchor.style.width=100*e+"%"},onAllScreenClick:function(){var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight;this.iframe.style.cssText=";position:fixed;top:0;left:0;width:"+e+"px;height:"+t+"px;z-index:999999;",this.allScreenWinResizeFunction=this.allScreenWinResizeFunction||function(){this.iframe.style.width=document.documentElement.clientWidth+"px",this.iframe.style.height=document.documentElement.clientHeight+"px"}.bind(this),window.removeEventListener("resize",this.allScreenWinResizeFunction),window.addEventListener("resize",this.allScreenWinResizeFunction),this.DOMs.player.classList.add("allscreen")},onfullScreenClick:function(){["webkitRequestFullScreen","mozRequestFullScreen","requestFullScreen"].forEach(function(e){this.DOMs.player[e]&&this.DOMs.player[e]()}.bind(this)),this.onMouseActive()},onNormalScreenClick:function(){window.removeEventListener("resize",this.allScreenWinResizeFunction),this.iframe.style.cssText=";width:"+this.size[0]+"px;height:"+this.size[1]+"px;",["webkitCancelFullScreen","mozCancelFullScreen","cancelFullScreen"].forEach(function(e){document[e]&&document[e]()}),this.DOMs.player.classList.remove("allscreen")},oncommentsBtnClick:function(){this.enableComment=!this.DOMs["comments-btn"].classList.contains("enable"),this.enableComment?(setTimeout(function(){this.DOMs.comments.style.display="block"}.bind(this),80),this.DOMs["comments-btn"].classList.add("enable")):(this.DOMs.comments.style.display="none",this.DOMs["comments-btn"].classList.remove("enable"))}}},{"./createElement":7,"./delegateClickByClassName":8,"./timeFormat":14}],5:[function(e,t){{var o=(e("./extend"),e("./createElement"));e("./parseDOMByClassNames")}t.exports={init:function(){var e=0;this.sourceList.forEach(function(t,n){o("li",{appendTo:this.DOMs.hd,sourceIndex:n,className:"source "+(n===e?"curr":""),innerHTML:t[0]})}.bind(this)),this.DOMs.video.src=this.sourceList[e][1]}}},{"./createElement":7,"./extend":9,"./parseDOMByClassNames":11}],6:[function(e,t){var o=e("./timeFormat");t.exports={init:function(){this.video.addEventListener("timeupdate",this.onVideoTimeUpdate.bind(this)),this.video.addEventListener("play",this.onVideoPlay.bind(this)),this.video.addEventListener("pause",this.onVideoTimePause.bind(this)),this.video.addEventListener("loadedmetadata",this.onVideoLoadedMetaData.bind(this)),setInterval(this.videoBuffered.bind(this),1e3),this.DOMs.volume_anchor.style.width=100*this.video.volume+"%"},onVideoTimeUpdate:function(){var e=this.video.currentTime,t=this.video.duration;this.DOMs.current.innerHTML=o(e),this.DOMs.duration.innerHTML=o(t),this.DOMs.progress_anchor.draging||(this.DOMs.progress_anchor.style.width=100*Math.min(Math.max(e/t,0),1)+"%")},videoBuffered:function(){var e=this.video.buffered,t=this.video.currentTime,o=0==e.length?0:e.end(e.length-1);this.DOMs.buffered_anchor.style.width=100*Math.min(Math.max(o/this.video.duration,0),1)+"%",0==o||t>=o?this.DOMs.player.classList.add("loading"):this.DOMs.player.classList.remove("loading")},onVideoPlay:function(){this.DOMs.play.classList.remove("paused")},onVideoTimePause:function(){this.DOMs.play.classList.add("paused")},onVideoLoadedMetaData:function(){this.video.preloadStartTime&&(this.video.currentTime=this.video.preloadStartTime,delete this.video.preloadStartTime)}}},{"./timeFormat":14}],7:[function(e,t){function o(e,t){var o=document.createElement(e);if("function"==typeof t)t.call(o);else for(var n in t)if(t.hasOwnProperty(n))switch(n){case"appendTo":t[n].appendChild(o);break;case"text":var i=document.createTextNode(t[n]);o.innerHTML="",o.appendChild(i);break;case"innerHTML":case"className":case"id":o[n]=t[n];break;case"style":var s=t[n];for(var r in s)s.hasOwnProperty(r)&&(o.style[r]=s[r]);break;default:o.setAttribute(n,t[n]+"")}return o}t.exports=o},{}],8:[function(e,t){function o(e){return Array.prototype.slice.call(e)}function n(e){this._eventMap={},this._rootElement=e,this._isRootElementBindedClick=!1,this._bindClickFunction=function(e){!function t(e,n){n&&n.nodeName&&(n.classList&&o(n.classList).forEach(function(t){e.trigger(t,n)}),t(e,n.parentNode))}(this,e.target)}.bind(this)}var i=e("./extend");i(n.prototype,{on:function(e,t,o){void 0===this._eventMap[e]&&(this._eventMap[e]=[]),this._eventMap[e].push([t,o]),this._isRootElementBindedClick||(_isRootElementBindedClick=!0,this._rootElement.addEventListener("click",this._bindClickFunction,!1))},off:function(e,t){if(void 0!=this._eventMap[e])for(var o=this._eventMap[e].length;o--;)if(this._eventMap[e][o][0]===t){this._eventMap[e].splice(o,1);break}for(var n in this._eventMap)break;void 0===n&&this._isRootElementBindedClick&&(_isRootElementBindedClick=!1,this._rootElement.removeEventListener("click",this._bindClickFunction,!1))},trigger:function(e,t){t=void 0===t?this._rootElement.getElementsByTagNames(e):[t],t.forEach(function(t){(this._eventMap[e]||[]).forEach(function(e){e[0].call(e[1],t)})}.bind(this))}}),t.exports=function(e){return new n(e)}},{"./extend":9}],9:[function(e,t){function o(e){for(var t,o=arguments.length,n=1;o>n;){t=arguments[n++];for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])}return e}t.exports=o},{}],10:[function(e){function t(e,t,o,n){this.id=e,this.size=t.split("x"),this.sourceList=o||[],this.comments=n,this.init()}window.MAMAPlayer=t,e("./component")(t,e("./component_build"),e("./component_event"),e("./component_video"),e("./component_source"),e("./component_comments"))},{"./component":1,"./component_build":2,"./component_comments":3,"./component_event":4,"./component_source":5,"./component_video":6}],11:[function(e,t){function o(e,t){var o={};return t.forEach(function(t){o[t]=e.getElementsByClassName(t)[0]}),o}t.exports=o},{}],12:[function(e,t){t.exports='* { margin:0; padding:0; }body { font-family: "PingHei","Lucida Grande", "Lucida Sans Unicode", "STHeiti", "Helvetica","Arial","Verdana","sans-serif"; font-size:16px;}html, body, .player { height: 100%; }.player:-webkit-full-screen { width: 100%; cursor:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==); }.player:-moz-full-screen { width: 100%; cursor:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==); }.player:full-screen { width: 100%; cursor:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==); }.player {		border-radius: 3px;	overflow: hidden;	position: relative;	cursor: default;	-webkit-user-select: none;	-moz-user-select: none;	user-select: none;}.video-frame {	box-sizing: border-box;	padding-bottom: 50px;	height: 100%;	overflow: hidden;	position: relative;}.video-frame .comments{	position: absolute;	top:0;left:0;	width:100%;	height:100%;	-webkit-transform:translateZ(0);	-moz-transform:translateZ(0);	transform:translateZ(0);}.player:-webkit-full-screen .video-frame { padding-bottom: 0px; }.player:-moz-full-screen .video-frame { padding-bottom: 0px; }.player:full-screen .video-frame{ padding-bottom: 0px; }.video {	width: 100%;	height: 100%;	background: #000000;}.controller {	position: absolute;	bottom: 0px;	left:0;	right:0;	background: #24272A;	height: 50px;}.controller .loading-icon {	display: none;	position: absolute;	width: 20px;	height: 20px;	line-height: 20px;	text-align: center;	font-size: 20px;	color: #ffffff;	top: -30px;	right: 10px;}.player.loading .controller .loading-icon {	display: block;}.player:-webkit-full-screen .controller {	-webkit-transform:translateY(50px);	-webkit-transition: -webkit-transform 0.3s ease;}.player:-moz-full-screen .controller {	-moz-transform:translateY(50px);	-moz-transition: -moz-transform 0.3s ease;}.player:full-screen .controller {	transform:translateY(50px);	transition: transform 0.3s ease;}.player.active:-webkit-full-screen {	cursor: default;}.player.active:-moz-full-screen {	cursor: default;}.player.active:full-screen {	cursor: default;}.player.active:-webkit-full-screen .controller,.player:-webkit-full-screen .controller:hover {	-webkit-transform:translateY(0);	cursor: default;}.player.active:-moz-full-screen .controller,.player:-moz-full-screen .controller:hover {	-moz-transform:translateY(0);	cursor: default;}.player.active:full-screen .controller.player:full-screen .controller:hover {	transform:translateY(0);	cursor: default;}.player.active:-webkit-full-screen .controller .progress .progress_anchor:after,.player:-webkit-full-screen .controller:hover .progress .progress_anchor:after {	height:12px;}.player.active:-moz-full-screen .controller .progress .progress_anchor:after,.player:-moz-full-screen .controller:hover .progress .progress_anchor:after {	height:12px;}.player.active:full-screen .controller .progress .progress_anchor:after,.player:full-screen .controller:hover .progress .progress_anchor:after {	height:12px;}.player:-webkit-full-screen .controller .progress .progress_anchor:after {	height:4px;}.player:-moz-full-screen .controller .progress .progress_anchor:after {	height:4px;}.player:full-screen .controller .progress .progress_anchor:after {	height:4px;}.controller .progress {	position: absolute;	top:0px;	left:0;	right:0;	border-right: 4px solid #181A1D;	border-left: 8px solid #DF6558;	height: 4px;	background: #181A1D;	z-index:1;	-webkit-transform: translateZ(0);	-moz-transform: translateZ(0);	transform: translateZ(0);}.controller .progress:after {	content:"";	display: block;	position: absolute;	top:0px;	left:0;	right:0;	bottom:-10px;	height: 10px;}.controller .progress .anchor {	height: 4px;	background: #DF6558;	position: absolute;	top:0;left:0;}.controller .progress .anchor:after {	content:"";	display: block;	width: 12px;	background: #DF6558;	position: absolute;	right:-4px;	top: 50%;	height: 12px;	box-shadow: 0 0 2px rgba(0,0,0, 0.4);	border-radius: 12px;	-webkit-transform: translateY(-50%);	-moz-transform: translateY(-50%);	transform: translateY(-50%);}.controller .progress .anchor.buffered_anchor {		position: relative;	background: rgba(255,255,255,0.1);}.controller .progress .anchor.buffered_anchor:after {	box-shadow: none;	height: 4px;	width: 4px;	border-radius: 0;	background: rgba(255,255,255,0.1);}.controller .right {	height: 50px;	position: absolute;	top:0;	left:10px;	right:10px;	pointer-events: none;}.controller .play,.controller .volume,.controller .time,.controller .hd,.controller .allscreen,.controller .normalscreen,.controller .comments-btn,.controller .fullscreen {	padding-top:4px;	height: 46px;	line-height: 50px;	text-align: center;	color: #eeeeee;	float:left;	text-shadow:0 0 2px rgba(0,0,0,0.5);	pointer-events: auto;}.controller .hd,.controller .allscreen,.controller .normalscreen,.controller .comments-btn,.controller .fullscreen {	float:right;}.controller .play {	width: 36px;	padding-left: 10px;	cursor: pointer;}.controller .play:after {	font-family: "FontAwesome";	content: "";}.controller .play.paused:after {	content: "";}.controller .volume {	min-width: 30px;	position: relative;	overflow: hidden;	-webkit-transition: min-width 0.3s ease 0.5s;	-moz-transition: min-width 0.3s ease 0.5s;	transition: min-width 0.3s ease 0.5s;}.controller .volume:hover {	min-width: 128px;}.controller .volume:before {	font-family: "FontAwesome";	content: "";	width: 36px;	display: block;}.controller .volume .progress {	width: 70px;	top: 27px;	left: 40px;}.controller .time {	font-size: 12px;	font-weight: bold;	padding-left: 10px;}.controller .time .current {	color: #DF6558;}.controller .fullscreen,.controller .allscreen,.controller .comments-btn,.controller .normalscreen {	width: 36px;	cursor: pointer;}.controller .comments-btn {	margin-right: -15px;	display: none;}.player.has-comments .controller .comments-btn {	display: block;}.controller .comments-btn:before {	font-family: "FontAwesome";	content: "";}.controller .comments-btn.enable:before {	color: #DF6558;}.controller .normalscreen {	display: none;}.player:-webkit-full-screen .controller .fullscreen,.player:-webkit-full-screen .controller .allscreen {	display: none;}.player:-webkit-full-screen .controller .normalscreen,.player.allscreen .controller .normalscreen {	display: block;}.player.allscreen .controller .allscreen {	display: none;}.controller .fullscreen:before {	font-family: "FontAwesome";	content: "";}.controller .allscreen:before {	font-family: "FontAwesome";	content: "";}.controller .normalscreen:before {	font-family: "FontAwesome";	content: "";}.controller .hd {	white-space:nowrap;	overflow: hidden;	margin-right: 10px;	text-align: right;}.controller .hd:hover li {	max-width: 300px;}.controller .hd li {	display: inline-block;	max-width: 0px;	-webkit-transition: max-width 0.8s ease 0.3s;	-moz-transition: max-width 0.8s ease 0.3s;	transition: max-width 0.8s ease 0.3s;	overflow: hidden;	font-size: 14px;	font-weight: bold;	position: relative;	cursor: pointer;}.controller .hd li:before {	content: "";	display: inline-block;	width:20px;}.controller .hd li:before {	content: "";	display: inline-block;	width:20px;}.controller .hd li.curr {	max-width: 300px;	cursor: default;	color: #DF6558;}.controller .hd li.curr:after {	content: "";	display: block;	position: absolute;	width:4px;	height:4px;	border-radius: 50%;	background: #ffffff;	left: 12px;	top: 23px;	opacity: 0;	-webkit-transition: opacity 0.5s ease 0.3s;	-moz-transition: opacity 0.5s ease 0.3s;	transition: opacity 0.5s ease 0.3s;}'},{}],13:[function(e,t){t.exports='<div class="player">	<div class="video-frame"><video class="video" autoplay="autoplay"></video><canvas class="comments"></canvas></div>	<div class="controller">		<div class="loading-icon fa fa-spin fa-circle-o-notch"></div>		<div class="progress">			<div class="anchor buffered_anchor" style="width:0%"></div>			<div class="anchor progress_anchor" style="width:0%"></div>		</div>		<div class="right">		 			 	<div class="fullscreen"></div>		 	<div class="allscreen"></div>		 	<div class="normalscreen"></div>		 	<ul class="hd"></ul>		 	<div class="comments-btn"></div>		 </div>		 <div class="left">		 	<div class="play paused"></div>		 	<div class="volume">			 	<div class="progress">			 		<div class="anchor volume_anchor" style="width:0%"></div>		 		</div>		 	</div>		 	<div class="time">		 		<span class="current">00:00:00</span> / <span class="duration">00:00:00</span>		 	</div>		 </div>	</div></div>'},{}],14:[function(e,t){function o(e,t){return(Array(t).join(0)+e).slice(-t)}function n(e){var t,n=[];return[3600,60,1].forEach(function(i){n.push(o(t=e/i|0,2)),e-=t*i}),n.join(":")}t.exports=n},{}]},{},[10]);