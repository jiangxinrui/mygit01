
//游戏引擎: 对象(导演的作用)
//加载游戏
//创建我的飞机
//创建敌机
//碰撞检测
//...

//初始化: 就是把变量赋为默认值，把控件设为默认状态，把没准备的准备好。

var gameEngine= {
	
	//属性节点
	ele: null, //对象与函数区别在于对象会立马执行，当在主页上部调用js时获取不到该节点，不能在这document.getelementById("main")
	allBullets: [],  //保存页面上存在的所有子弹
	allEnemys: [],  //保存页面上存在的所有敌机
	allScore: 0,   //总成绩
	
	
	//方法//初始化
	init: function(){
		this.ele= document.getElementById("main"); //this= gameEngine，主页没加载到body时就能获取main节点
		return this;
	},
	
	//开始游戏
	start: function(){
		console.log("加载游戏");
		
		//加载游戏
		this.loadding(function(){
			console.log("正式开始游戏！");
			
			//开始游戏，调用我的飞机
			myPlane.init().move().listenKeybord();
			myPlane.fire();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//碰撞检测
			gameEngine.crash();
			
		});
		
	},
	
	
	//加载游戏
	loadding: function(callback){ //callback= this.loadding中的 function(){}
		
		let logo= document.createElement("div");
		logo.className= "logo";
		this.ele.appendChild(logo);
		
		let load= document.createElement("div");
		load.className= "load";
		this.ele.appendChild(load);
		
		//切换图片
		
		let s= 0;
		let timer= setInterval(function(){
			if(s >= 7){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//游戏加载完成后回调
				if(callback) callback();
			}
			else{
				load.style.background= "url(images/loading"+ ++s%4 +".png) no-repeat";
			}
			
		}, 600)
		
	},
	
	
	//创建敌机
	createEnemy: function(){
		
		//小型敌机
		setInterval(function(){
			let d= Math.random() > 0.3 ? true : false;
			if(d){
				let enemy= new Enemy(1);  //传参回Enemy(),以判断敌机类型
				enemy.init().fall()
			}
		}, 2000)
		
		//中型敌机
		setInterval(function(){
			let d= Math.random() > 0.5 ? true : false;
			if(d){
				let enemy= new Enemy(2);  //回传参数type回Enemy(),以判断敌机类型
				enemy.init().fall()
			}
		}, 3000)
		
		//大型敌机
		setInterval(function(){
			let d= Math.random() > 0.6 ? true : false;
			if(d){
				let enemy= new Enemy(3);  //传参回Enemy(),以判断敌机类型
				enemy.init().fall()
			}
		}, 4000)
	},
	
	
	//碰撞检测
	crash: function(){
		
		this.timer= setInterval(function(){
			for(let i=0; i<gameEngine.allEnemys.length; i++){ //遍历所有敌机对象
				for(let j=0; j<gameEngine.allBullets.length; j++){  //遍历所有子弹对象
					
					if( isCrash( gameEngine.allEnemys[i].ele, gameEngine.allBullets[j].ele) ){ //判断每个敌机节点和每个子弹节点是否有碰撞
//						console.log( isCrash( gameEngine.allBullets[i].ele, gameEngine.allEnemys[j].ele)) //ture
						
						//让子弹爆炸动画，并移除子弹节点
						gameEngine.allBullets[j].boom();
						gameEngine.allBullets.splice(j, 1);  //同步删除数组中第i个子弹对象
						
						//数组中第j个敌机受到一点伤害值，不需要在此移除敌机节点
						gameEngine.allEnemys[i].hurt();
						
					}
				}
			
				//判断敌机和我的飞机是否发生碰撞
				if( isCrash(gameEngine.allEnemys[i].ele, myPlane.ele) ){
					clearInterval(this.timer);  //清除碰撞检测
					
					myPlane.boom(function(){
						
						let myname= prompt("请创建您的昵称，你的总分为： "+ gameEngine.allScore, "admin");
						//ajax上传数据
						ajax({
							
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name: myname, score: gameEngine.allScore},
							
							success: function(data){
//								alert("提交成功："+ data)
								location.href= "paihangbang.html";
								
							},
							
							fail: function(data){
								alert(data);
							}
							
						});
						
					});
					
					break;
				}
					
				
			}
			
		}, 30)
		
		
	}
	
	
}
