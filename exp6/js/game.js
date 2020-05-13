//转盘变量
var lottery={
    index:-1,//当前转动到那个位置，起点位置
    count:0,//总共有多少个位置
    timer:0,//setTimeout的ID，用clearTimeout清除
    speed:20,//初始转动速度
    times:0,//转动次数
    cycle:50,//转动的基本次数：及至少要转东多少次进入抽奖环节
    prize:-1,//中奖位置
    init:function(id){
        if($("#"+id).find(".lottery-unit").length>0){
            $lottery = $("#"+id);//变量名
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-"+this.index).addClass("active");
        }
    },
    roll:function(){
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-"+index).removeClass("active");
        index +=1;
        if(index>count-1){
            index =0;
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.index = index;
        return false;
    },
    stop:function(index){
        console.log("stop");
        this.prize = index;//传值中奖位置
        console.log(this.prize);
        if(this.prize == 6 || this.prize == 11){
            window.location = "test.html";
        }
        var tem = $(".lottery-unit-"+index).find("img").attr('alt');
        $('#result').html(tem);
        return false;
    }
};
//转动过程
function roll(){
    lottery.times +=1;
    lottery.roll();
    if(lottery.times>lottery.cycle+10 && lottery.prize == lottery.index){
        clearTimeout(lottery.timer);
        lottery.stop(lottery.index);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
    }else{
        if(lottery.times<lottery.cycle){
            lottery.speed -=10;

        }else if(lottery.times == lottery.cycle){
            var index = Math.random()*(lottery.count)|0;
            lottery.prize = index;
        }else{
            if(lottery.times>lottery.cycle+10 && ((lottery.prize == 0 && lottery.index==7) ||
            lottery.prize == lottery.index+1)){
                lottery.speed +=100;
            }else{
                lottery.speed +=20;
            }
        }
        if(lottery.speed<40){
            lottery.speed = 40;
        }
        lottery.timer = setTimeout(roll,lottery.speed);
    }
    return false;
}

//点击实现
var click = false;
window.onload=function(){
    lottery.init('lottery');//转盘初始化
    //增加click响应事件
    $("#lottery a").click(function(){//找到中间大表格
        if(click){
            return false;//转动过程中屏蔽按钮
        }else{
            lottery.speed = 100;
            roll();
            click = true;//转动结束后回复点击
            return false;
        }
    });
}