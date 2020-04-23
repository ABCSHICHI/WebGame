//创造canvas
// var canvas = document.createElement("canvas");
// //获取环境的上下文
// var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
// document.body.appendChild(canvas);

canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


//更换背景
var str = "images/background.png";
//加载背景图片
var bgReady = false;
var bgImage = new Image();
bgImage.src = str;
bgImage.onload = function(){
    bgReady = true;
};
function setbg(){
    console.log("ok")  
    if(str == "images/background.png")
        str = "images/background2.jpg";
    else
        str = "images/background.png";
    bgImage.src = str;
}


// bgImage.src = "images/background.png";
//加载“兵”图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
};
heroImage.src = "images/hero.png";
//加载“贼”图像
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
};
monsterImage.src = "images/monster.png";


//游戏对象的设计
var hero = {
    speed: 256//每秒移动的像素
};
var monster = {};
var monstersCaught = 0;

//处理键盘响应
var keysDown = {};
//对网页的监听
addEventListener("keydown",function(e){
    keysDown[e.keyCode] = true;
},false);

addEventListener("keyup",function(e){
    delete keysDown[e.keyCode];//直接删除
},false);

// 抓成功后，重置游戏
var reset = function(){
    hero.x = canvas.width/2;
    hero.y = canvas.height/2;

    //随机放置“贼”
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//更新游戏对象
var update = function(modifier){
    if(hero.x-32<0)
        hero.x = 32;
    if(512-hero.x<65)
        hero.x = 447;
    if(hero.y-32<0)
        hero.y = 32;
    if(480-hero.y<65)
        hero.y = 415;
    

    if(38 in keysDown)
        hero.y -= hero.speed*modifier;
    if(40 in keysDown)
        hero.y += hero.speed*modifier;
    if(37 in keysDown)
        hero.x -= hero.speed*modifier;
    if(39 in keysDown)
        hero.x += hero.speed*modifier;
         //判断是否抓到
    if(
        hero.x <= (monster.x + 32)&&
        monster.x <= (hero.x + 32)&&
        hero.y <= (monster.y + 32)&&
        monster.y <= (hero.y + 32)
        )   {
        ++monstersCaught;
        reset();
        
    }
    // console.log(hero.x,hero.y);
    
    
};


//绘制所有对象
var render = function(){
    if(bgReady)//绘制背景
        ctx.drawImage(bgImage,0,0,512,480);
    if(heroReady)//绘制play
        ctx.drawImage(heroImage,hero.x,hero.y);
    if(monsterReady)//绘制敌人
        ctx.drawImage(monsterImage,monster.x,monster.y);
    
    //计算得分的字体
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24pz Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    //ctx.fillText(内容，x，y)
    ctx.fillText("成功抓获：" + monstersCaught,32,32);
};

//主循环
var main = function(){
    //不同浏览器的帧度不同
    //保证浏览器移动play速度近似
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);

    render();

    then = now;
    //重绘制
    requestAnimationFrame(main);
};

//多浏览器支持
var w = window;         //默认浏览器                //chrome浏览器
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame||
                        w.msRequestAnimationFrame|| w.mozRequestAnimationFrame;
                        //微软浏览器                //火狐浏览器
//开始游戏
var then = Date.now();
reset();
main();
