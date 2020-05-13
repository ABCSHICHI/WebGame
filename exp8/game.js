// 通过id获取元素getElementById，执行效率最高
var sec = document.getElementById('sec');
var myname = document.getElementById('myname');
var score = document.getElementById('score');
var back = document.getElementById('back');

// 通过类名获取元素getElementsByClassName，执行效率2
var li_1 = document.getElementsByClassName('list1')[0];

// 通过元素直接获取querySelector，执行效率3
var btn = document.querySelector('button');
var uls = document.querySelector('ul');

var z = 30.0;//时间
var level = 1;//等级
var n = 0;//分数


btn.onclick = function(){
    //计时器
    var timer = setInterval(function(){
        z -= 0.01;//每次减去0.01毫秒
        z= z.toFixed(2);//固定小数点后两位
        sec.innerHTML = z;//把z直接赋值给sec
        if(z <= 0){//游戏结束
            clearInterval(timer);//清除定时器
            if(n<8){
                alert('GAME OVER！' + ' ' + '等级：高度近视');
            }
            else if(n<12){
                alert('GAME OVER！' + ' ' + '等级：正常视力');
            }
            else if(n<20){
                alert('GAME OVER！' + ' ' + '等级：天兵天将');
            }
            else {
                alert('GAME OVER！' + ' ' + '等级：悟空转世');
            }
            back.style.display = 'block';//结束画面的display变成显示
        }
    },10);//10毫秒

    // 点击按钮。消失按钮、列表
    myname.remove();
    btn.remove();
    li_1.remove();

    app();
    function app(){
        level += 1;
        var number1 = Math.floor(Math.random()*6);
        var number2 = Math.floor(Math.random()*6);
        while(number1 == number2){
            number2 = Math.floor(Math.random()*6);
        }
        // console.log(number1)
        //按照等级生成相映的列表数，并附上图片
        for(var i=0; i<level*level; i++){
            var newLi = document.createElement('li');
            uls.appendChild(newLi);
            var newImg = document.createElement('img');
            newLi.appendChild(newImg);
            //让它规格排列，并且靠左对齐
            newLi.style.width = 100/level + '%';
            newLi.style.float = 'left';
            //显示图片，且填充100%列表
            newImg.style.display = 'block';
            newImg.style.width = 100 + '%';
            //附上图片
            newImg.src = 'img/' + number1 + '.png';
            //设置了背景色
            newLi.style.backgroundColor = 'rgb(' + rand(50,255) + ',' + rand(50,255) + ',' + rand(50,255) + ')';

        }

        var x = rand(0, level*level-1);//赋予一个随机下标
        //替换图片
        var imgsl = document.querySelectorAll('img');
        imgsl[x].src = 'img/' + number2 + '.png';
        //监听不同的那张
        var li = document.querySelectorAll('li');
        //如果找到，点击了，就删掉列表元素自身
        //分数+1, 下一轮开始
        li[x].onclick = function(){
            for(var i=0; i<level*level; i++){
                li[i].remove(this);
            }
            n += 1;
            score.innerHTML = n;
            if(level>10){
                level = 10;
            }
            app();
        } 
    }
}

//随机函数
function rand(min,max){
    return Math.round(Math.random()*(max-min) + min);
}