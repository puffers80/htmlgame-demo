var score=0;//分数
var num=6;//消除牌的对数
var pokes={};
pokes.matchingGame={};
pokes.matchingGame.cardWidth=80;//牌宽
pokes.matchingGame.cardHeight=120;
pokes.matchingGame.deck=[
	"cardAA","cardAA",
	"cardA2","cardA2",
	"cardA3","cardA3",
	"cardA4","cardA4",
	"cardA5","cardA5",
	"cardA6","cardA6",
	"cardA7","cardA7",
	"cardA8","cardA8",
	"cardA9","cardA9",
	"cardA10","cardA10",
	"cardAJ","cardAJ",
	"cardAQ","cardAQ",
	"cardAK","cardAK",

	"cardBA","cardBA",
	"cardB2","cardB2",
	"cardB3","cardB3",
	"cardB4","cardB4",
	"cardB5","cardB5",
	"cardB6","cardB6",
	"cardB7","cardB7",
	"cardB8","cardB8",
	"cardB9","cardB9",
	"cardB10","cardB10",
	"cardBJ","cardBJ",
	"cardBQ","cardBQ",
	"cardBK","cardBK",

	"cardCA","cardCA",
	"cardC2","cardC2",
	"cardC3","cardC3",
	"cardC4","cardC4",
	"cardC5","cardC5",
	"cardC6","cardC6",
	"cardC7","cardC7",
	"cardC8","cardC8",
	"cardC9","cardC9",
	"cardC10","cardC10",
	"cardCJ","cardCJ",
	"cardCQ","cardCQ",
	"cardCK","cardCK",

	"cardDA","cardDA",
	"cardD2","cardD2",
	"cardD3","cardD3",
	"cardD4","cardD4",
	"cardD5","cardD5",
	"cardD6","cardD6",
	"cardD7","cardD7",
	"cardD8","cardD8",
	"cardD9","cardD9",
	"cardD10","cardD10",
	"cardDJ","cardDJ",
	"cardDQ","cardDQ",
	"cardDK","cardDK",
];

//随机排序扑克的函数，返回-1或1
function shuffle()
{
	return Math.random()>0.5? -1:1
}

//翻牌功能的实现
function selectCard()
{
	var $fcard=$(".card-flipped");
	//翻了两张牌后退出翻牌
	if($fcard.length>1)
	{
		return;
	}
	$(this).addClass("card-flipped");
	//若翻动了两张牌，检测一致性
	var $fcards=$(".card-flipped");
	if($fcards.length==2)
	{
		setTimeout(function(){
			checkPattern($fcards);
		},700);
	}
}

//检测2张牌是否一致
function checkPattern(cards)
{
	var pattern1=$(cards[0]).data("pattern");
	var pattern2=$(cards[1]).data("pattern");
	
	$(cards).removeClass("card-flipped");
	if(pattern1==pattern2)
	{
		$(cards).addClass("card-removed")
			.bind("webkitTransitionEnd",function(){
				$(this).remove();
			});
		score+=5;
		num--;

		document.visit.scoretext.value=score+"分";
	
		console.log("剩余牌的对数："+num);
		console.log("分数："+score);
	}
	else{
		score-=1;
		if(score<=0)
			score=0;
		document.visit.scoretext.value=score+"分";
		console.log("分数："+score);

	}

	//全部牌消除
	if(num==0)
	{
		gameOver();
	}
}

//计时器
var sec=0;
function timeAdd(){
	sec+=1;
	document.visit.scoretext.value=score+"分";
	document.visit.timetext.value=sec+" 秒";
	setTimeout("timeAdd()",1000);

	//游戏时间到
	if(sec>=30)
	{
		gameOver();
	}
}

//游戏结束响应
function gameOver()
{
	alert("游戏结束！ 你的分数是:"+score);
}
