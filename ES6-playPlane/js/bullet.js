


//ES6  Class



class Bullet {
	constructor() {
		this.ele= document.createElement("div");
	}
	
	//初始化init
	init(){
		gameEngine.ele.appendChild(this.ele);
		gameEngine.allBullets.push(this);  //在页面上添加子弹的同时，也将当前子弹对象this添加到数组allBullets中
		//console.log( gameEngine.allBullets);
		
		this.ele.className= "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + 1 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	}
	
	//子弹发射出去
	move(){
		this.timer = setInterval( ()=>{
			if (this.ele.offsetTop < -18){
				clearInterval(this.timer); //关闭定时器
				gameEngine.ele.removeChild(this.ele); //移除子弹节点
				
				////在页面上移除子弹节点的同时， 也要将该子弹对象从数组allBullets中移除(爆炸时另在for循环中移除)
				gameEngine.allBullets.splice( gameEngine.allBullets.indexOf(this), 1)
			}
			else {
				this.ele.style.top = this.ele.offsetTop - 10 + "px";
			}
		}, 30);  //子弹飞行的速度
	}
	
	//子弹爆炸并消失
	boom(){
		
		clearInterval(this.timer);  //停止先前子弹节点的移动定时器
//		this.ele.className= "bullet-die";  //一碰撞就先更改样式
		
		var arr= ["images/die1.png", "images/die2.png"];
		var i = 0; 
		
		var die_timer= setInterval( ()=>{  //控制爆炸图片切换一次定时器
			if(i >= arr.length){
				clearInterval(die_timer);
				gameEngine.ele.removeChild(this.ele);
//				gameEngine.allBullets.splice( gameEngine.allBullets.indexOf(that), 1);
			}
			else{
				this.ele.style.background= "url("+ arr[i++] +") no-repeat";  //i数组下标
			}
		}, 100)
	}
	
}


