



//ES6 class

class Enemy {
	constructor(type) {
		this.types = type; //传来参数要用一个属性去接
		//属性
		this.ele= document.createElement("div");
		this.speed;  //设定默认值
		this.hp;
		this.dieimgs= [];
		this.score;
	}
	
	//init方法
	init(){
		gameEngine.ele.appendChild(this.ele);
		gameEngine.allEnemys.push(this);   //在页面上添加敌机的同时， 也将当前敌机对象this添加到数组allEnemys中
		
		//通过回传type，用switch语句判断敌机类型、速度、血量
		console.log(this.types)
		switch(this.types){
			//小型敌机
			case this.type_small:
				this.ele.className= "enemy-small";
				this.speed= this.speed_small;
				this.hp= 1;
				this.dieimgs= ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"];
				this.score= 100;
				break;
			//中型敌机	
			case this.type_middle:
				this.ele.className= "enemy-middle";
				this.speed= this.speed_middle;
				this.hp= 3;
				this.dieimgs= ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"];
				this.score= 200;
				break;
			//大型敌机	
			case this.type_large:
				this.ele.className= "enemy-large";
				this.speed= this.speed_large;
				this.hp= 6;
				this.dieimgs= ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"];
				this.score= 300;
				break;
		}
		
		//敌机出现的随机位置
		this.ele.style.left= parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) + "px";
		this.ele.style.top= -this.ele.offsetHeight + "px"; //-this.ele.offsetHeight + "px"
		return this;
	}
	
	//敌机下落
	fall() {

		var timer= setInterval( ()=>{ //箭头函数无作用域，可以用this
			
			if(this.ele.offsetTop > gameEngine.ele.offsetHeight){
				gameEngine.ele.removeChild(this.ele);
				clearInterval(timer);
				
				//当在页面上移除敌机节点时， 同时也将当前敌机对象从数组allEnemys中移除
				gameEngine.allEnemys.splice( gameEngine.allEnemys.indexOf(this), 1);
			}
			else{
				this.ele.style.top= this.ele.offsetTop + this.speed + "px";
			}
		}, 40)
	}
	
	//受到伤害
	hurt() {
		this.hp--;
		if(this.hp == 0){
			this.boom();
			//计算分值
			gameEngine.allScore += this.score;
			console.log(gameEngine.allScore);
		}
	}
	
	//爆炸并删除节点，移除数组中对象
	boom() {
		clearInterval(this.timer);  //停止先前敌机节点的移动定时器
		
		let i= 0;
		let dietimer= setInterval( ()=>{ //箭头函数无作用域，可以用this
			if(i >= this.dieimgs.length){
				gameEngine.ele.removeChild(this.ele);
				clearInterval(dietimer);
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(this), 1);//打爆敌机，同时敌机对象从数组中清除
			}
			else{
				this.ele.style.background= "url("+ this.dieimgs[i++] +")";
			}
			
		}, 100)
	}
	
	
}



//通过创建原形属性判断敌机的type、speed、hp
Enemy.prototype.type_small= 1;   //类型
Enemy.prototype.type_middle= 2;
Enemy.prototype.type_large= 3;

Enemy.prototype.speed_small= 5;   //速度
Enemy.prototype.speed_middle= 3;
Enemy.prototype.speed_large= 2;

Enemy.prototype.hp_small= 1;    //血量
Enemy.prototype.hp_middle= 3;
Enemy.prototype.hp_large= 6;












