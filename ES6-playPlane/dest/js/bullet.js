"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var l=0;l<t.length;l++){var n=t[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,l,n){return l&&e(t.prototype,l),n&&e(t,n),t}}(),Bullet=function(){function e(){_classCallCheck(this,e),this.ele=document.createElement("div")}return _createClass(e,[{key:"init",value:function(){return gameEngine.ele.appendChild(this.ele),gameEngine.allBullets.push(this),this.ele.className="bullet",this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/2-this.ele.offsetWidth/2+1+"px",this.ele.style.top=myPlane.ele.offsetTop-this.ele.offsetHeight+"px",this}},{key:"move",value:function(){var e=this;this.timer=setInterval(function(){e.ele.offsetTop<-18?(clearInterval(e.timer),gameEngine.ele.removeChild(e.ele),gameEngine.allBullets.splice(gameEngine.allBullets.indexOf(e),1)):e.ele.style.top=e.ele.offsetTop-10+"px"},30)}},{key:"boom",value:function(){var e=this;clearInterval(this.timer);var t=["images/die1.png","images/die2.png"],l=0,n=setInterval(function(){l>=t.length?(clearInterval(n),gameEngine.ele.removeChild(e.ele)):e.ele.style.background="url("+t[l++]+") no-repeat"},100)}}]),e}();