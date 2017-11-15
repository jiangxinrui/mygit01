
//我的飞机
var myPlane= {
	
	//属性
	ele: null,
	difficulty: 500,  //默认子弹发射间隔
	
	
	//方法
	//初始化飞机节点
	init: function(){
		this.ele= document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		this.ele.className= "myplane";
		this.ele.style.left= (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
		this.ele.style.top= gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px";
		return this;
	},
	
	//移动
	move: function(){
		
		//拖拽
		myPlane.ele.onmousedown= function(e){
			e= e||event;
			e.preventDefault();
			var disx= e.offsetX;
			var disy= e.offsetY;
			
			document.onmousemove= function(e){
				e= e||event;
				var x= e.pageX - disx - gameEngine.ele.offsetLeft;
				var y= e.pageY - disy - gameEngine.ele.offsetTop;
				if(x<0)x=0
				else if(x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
					x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth
				}
				
				myPlane.ele.style.left= x + "px";
				myPlane.ele.style.top= y + "px";
			}
			document.onmouseup= function(){
				document.onmousemove= document.onmouseup= null;
			}
		}
		return myPlane;
	},
	
	
	//监听键盘
	listenKeybord: function(){
		
		var xspeed = 0;
		var yspeed = 0;
		
		onkeydown = function(e){
			e = e||event;
			
			if (e.keyCode == 37) { //左
				xspeed = -10;
			}
			else if (e.keyCode == 38) { //上
				yspeed = -10;
			}
			else if (e.keyCode == 39) { //右
				xspeed = 10;
			}
			else if (e.keyCode == 40) { //下
				yspeed = 10;
			}
		}
		
		onkeyup = function(e){  //松开按键时停止运动
			e = e||event;
			
			if (e.keyCode==37 || e.keyCode==39) {
				xspeed = 0;
			}
			else if (e.keyCode==38 || e.keyCode==40) {
				yspeed = 0;
			}
		}
		
		setInterval(function(){ //每隔30毫秒调用一次，按下键做到实时反馈、丝滑顺畅
			var x = myPlane.ele.offsetLeft + xspeed;
			if (x < 0) {x = 0}
			else if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) { 
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
				
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + yspeed + "px";
			
		}, 30);
	},
	
	
	//调用子弹
	fire: function(){
		this.firebullet= setInterval(function(){
			var bullet= new Bullet();
			bullet.init().move();
			
		}, this.difficulty)  //子弹创建的速度
		
		console.log(this.difficulty)
	},
	
	
	//本机碰撞检测
	boom: function(callback){
		
		clearInterval(this.firebullet);  //停止发射子弹
		
		
		var arr= ["images/me_die1.png", "images/me_die2.png", "images/me_die3.png", "images/me_die4.png"];
		var i = 0;
		var that= this;
		var planedie= setInterval(function(){
			if(i >= arr.length){
				clearInterval(planedie);
				gameEngine.ele.appendChild(that.ele);
				
				//boom效果结束后在回调后面的执行步骤
				callback();
			}
			else{
				that.ele.style.background= "url("+ arr[i++] +")";
			}
		}, 100);
		
	}
	
}
