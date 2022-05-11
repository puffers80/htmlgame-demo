var num;
var flag = false;
//转盘变量
var lottery = {
	index:-1,	//起点位置
	count:0,	//总共多少位置
	timer:0,	//setTimeout的ID用clearTimeout清除
	speed:20,	//初始转动速度
	times:0,	//转动次数
	cycle:50,	//转动基本次数
	prize:-1,	//中奖位置
	init:function(id){
		if($("#"+id).find(".lottery-unit").length>0){
			$lottery = $("#"+id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find(".lottery-unit-"+this.index).addClass("active");
		};
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(".lottery-unit-"+index).removeClass("active");
		index += 1;
		if(index > count - 1){
			index = 0;
		}
		$(lottery).find(".lottery-unit-"+index).addClass("active");
		this.index = index;
		return false;
	},
	stop:function(index){
		console.log("stop");
		this.prize = index;
		//aaa = this.prize;
		//if(this.prize == 4){
		//	window.location = "test.html";
		//}
		//var tem = $(".lottery-unit-"+index).find
		//$('#result').html(aaa);
		return false;
	}
};


//转动过程
function roll(){
	lottery.times += 1;
	lottery.roll();

	if(lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index){
		clearTimeout(lottery.timer);
		num = lottery.prize;
		flag = true;
		lottery.prize = -1;
		lottery.times = 0;
		click = false;
	}else{
		flag = false;
		if(lottery.times < lottery.cycle){
			lottery.speed -= 10;
		}else if(lottery.times == lottery.cycle){
			var index = Math.random()*(lottery.count)|0;
			lottery.prize = index;
		}else{
			if(lottery.times > lottery.cycle+10 &&
			((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)){
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}
		if(lottery.speed < 40){
			lottery.speed = 40;
		}
		lottery.timer = setTimeout(roll, lottery.speed);
	}
	console.log("prize+index "+lottery.prize, lottery.index);
	if(flag)
	{//奖品
/*var res = [[""],[""],[""],[""],
	[""],[""],,[""],[""]
	[""],[""],[""],[""]
];*/
		console.log("sdasdasd  "+num);
		switch(num)
		{
			case 0:
				document.getElementById("result").innerHTML = "久妹 B站：茜茜Akane_久妹游弟的铲屎官";
				break;
			case 1:
				document.getElementById("result").innerHTML = "花花/滑滑 B站：亮亮也是酿酿";
				break;
			case 2:
				document.getElementById("result").innerHTML = "泡芙/大货车 B站：香香软软的小泡芙";
				window.open("./puff.html");
				break;
			case 3:
				document.getElementById("result").innerHTML = "桃子/仙女 B站：饭团小夫妻";
				break;
			case 4:
				document.getElementById("result").innerHTML = "游弟 B站：茜茜Akane_久妹游弟的铲屎官";
				break;
			case 5:
				document.getElementById("result").innerHTML = "俊荣/87 B站：饭团小夫妻";
				break;
			case 6:
				document.getElementById("result").innerHTML = "豆浆/娘娘 B站：豆漿SoybeanMilk";
				window.open("./jiang.html");
				break;
			case 7:
				document.getElementById("result").innerHTML = "雪饼/饼饼 B站：饼饼子酱";
				break;
			case 8:
				document.getElementById("result").innerHTML = "亮亮/酿酿 B站：亮亮也是酿酿";
				break;
			case 9:
				document.getElementById("result").innerHTML = "小乖/丑儿子 B站：亮亮也是酿酿";
				window.open("./guai.html");
				break;
			case 10:
				document.getElementById("result").innerHTML = "饭团 B站：饭团小夫妻";
				break;
			case 11:
				document.getElementById("result").innerHTML = "LULU/海参 YouTube：크집사 (曾是CreamHero)";
				break;
		}
	}
	return false;
}

//点击事件
var click = false;
window.onload = function(){
	lottery.init('lottery');
	$("#lottery a").click(function(){	
		if(click){
			return false;
		}else{
			lottery.speed = 100;
			roll();
			click = true;		
			return false;	
		}	
	});	
}