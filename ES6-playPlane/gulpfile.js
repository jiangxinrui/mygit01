/*
	创建新项目，要在项目主目录下新建package.json
	项目主目录下新建gulpfile.js
	重新安装各种插件
*/

var gulp = require("gulp"); //导入gulp
var babel = require('gulp-babel'); //导入es6转es5插件
var uglify = require("gulp-uglify"); //导入js压缩插件


//任务，压缩bullet
gulp.task("jsGogogo", function(){
	gulp.src("js/bullet.js")  //指定处理的文件路径, .pipe前不能加冒号
		.pipe( babel({"presets": ["es2015"]}) )  //es6转es5, es6先转成es5才能压缩
		.pipe( uglify() )
		.pipe( gulp.dest("dest/js") );  //gulp.dest() 被处理de文件输出的路径
})
//默认任务
gulp.task("default", ["jsGogogo"]); //依赖于上面的"jsTask"任务，先执行完"jsTask"才能执行当前任务




//任务，压缩myplane
gulp.task("jsMyplane", function(){
	gulp.src("js/myPlane.js")
		.pipe( babel({"presets": ["es2015"]}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dest/js") );
})
//默认任务
gulp.task("default", ["jsMyplane"]);




//任务，压缩enemy
gulp.task("jsEnemy", function(){
	gulp.src("js/enemy.js")
		.pipe( babel({"presets": ["es2015"]}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dest/js") );
})
//默认任务
gulp.task("default", ["jsEnemy"]);




//任务，压缩gameEngine
gulp.task("jsgameEngine", function(){
	gulp.src("js/gameEngine.js")
		.pipe( babel({"presets": ["es2015"]}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dest/js") );
})
//默认任务
gulp.task("default", ["jsgameEngine"]);
































