/** 
* video-js - v0.6.1.
* https://github.com/mkay581/video.git
* Copyright 2015 Mark Kennedy. Licensed MIT.
*/

"use strict";var BaseVideo=require("./base-video"),_=require("underscore"),ElementKit=require("element-kit"),Youtube=function(t){this.initialize(t)};Youtube.prototype=_.extend({},BaseVideo.prototype,{initialize:function(t){var e=t.el||document.createDocumentFragment();this.options=_.extend({el:e,autoplay:e.getAttribute("autoplay"),width:e.getAttribute("width"),height:e.getAttribute("height"),playingCssClass:"video-playing",loadingCssClass:"video-loading",customWrapperClass:"video-wrapper"},t),BaseVideo.prototype.initialize.call(this,this.options),Youtube.prototype.players=Youtube.prototype.players||{},Youtube.prototype.players[this.vpid]=this,this.el=this.options.el,this._origParent=this.el.parentNode,this._playerVars=_.extend({autoplay:this.options.autoplay?1:0},this.getPlayerVars())},getSourceUrl:function(){var t,e,i=this.el.getElementsByTagName("source"),o=i.length;if(!this.src){for(t=0;o>t;t++)if(e=i[t],"video/youtube"===e.getAttribute("type")){this.src=e.getAttribute("src");break}this.src=this.src||""}return this.src},load:function(t){this._container=document.createElement("div"),this._container.setAttribute("id","vplayer"+this.vpid+"-container"),this._container.setAttribute("class",this.options.customWrapperClass),this._origParent&&this._origParent.contains(this.el)&&this._origParent.replaceChild(this._container,this.el),this._container.kit.classList.add(this.options.loadingCssClass),this._loadScript(function(){this._buildPlayer(function(e){this.player=e,this._container.kit.classList.remove(this.options.loadingCssClass),t&&t(e,this._container)}.bind(this))}.bind(this))},_buildPlayer:function(t){var e=function(e){t&&t(e)};this._p?e(this._p):this._p=this._createPlayer(e)},_createPlayer:function(t){var e="vplayer"+this.vpid;return this._ytEl=document.createElement("div"),this._ytEl.setAttribute("id",e),this._container.appendChild(this._ytEl),this._videoId=this.getVideoId(this.getSourceUrl()),new YT.Player(e,{height:this.options.height,width:this.options.width,playerVars:this._playerVars,videoId:this._videoId,events:{onReady:function(e){t(e.target)},onStateChange:this._onStateChange.bind(this)}})},getPlayerVars:function(){var t=this.getSourceUrl().split("?")[1]||"",e=t.split("&");if(""==e)return{};for(var i={},o=0;o<e.length;++o){var s=e[o].split("=",2);1==s.length?i[s[0]]="":i[s[0]]=decodeURIComponent(s[1].replace(/\+/g," "))}return i},getVideoId:function(t){var e=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;return t.replace(e,"$1")},_loadScript:function(t){if(Youtube.prototype._scriptLoaded)return t?t():null;if(!Youtube.prototype._script){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",e.async=!0;var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(e,i),Youtube.prototype._script=e}window.onYouTubeIframeAPIReady=function(){t?t():null,Youtube.prototype._scriptLoaded=!0}.bind(this)},_onStateChange:function(t){var e={"-1":{name:"unstarted"},0:{name:"ended",method:this.onEnd},1:{name:"playing",method:this.onPlay},2:{name:"paused",method:this.onPause},3:{name:"buffering"},5:{name:"cued"}},i=""+t.data;e[i].method&&e[i].method.call(this)},_triggerEvent:function(t){var e=document.createEvent("CustomEvent");e.initCustomEvent(t,!1,!1,null),this.el.dispatchEvent(e)},play:function(){this.getSourceUrl()?this.player&&this.player.playVideo():console.warn("youtube video error: you cannot call play() method on a video element that has no youtube source url")},onPlay:function(){this._container.classList.add(this.options.playingCssClass),this._triggerEvent("play")},pause:function(){this.player?this.player.pauseVideo():null},onPause:function(){this._container.classList.remove(this.options.playingCssClass),this._triggerEvent("pause")},stop:function(){this.player?this.player.stopVideo():null},onEnd:function(){this._container.classList.remove(this.options.playingCssClass),this._triggerEvent("ended")},destroy:function(){var t=Youtube.prototype._script,e=Youtube.prototype.players;this._container&&this._container.kit.classList.remove(this.options.loadingCssClass),delete e[this.vpid],window.onYouTubeIframeAPIReady=function(){},t&&!_.keys(e).length&&(t.parentNode.removeChild(t),Youtube.prototype._script=null,Youtube.prototype._scriptLoaded=null),this._origParent&&this._origParent.contains(this._container)&&this._origParent.replaceChild(this.el,this._container),BaseVideo.prototype.destroy.call(this)}}),module.exports=window.Video.Youtube=Youtube;