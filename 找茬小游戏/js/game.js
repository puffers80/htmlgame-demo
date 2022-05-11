var btn=document.querySelector('button');
var z=30.00;
var sec=document.getElementById('sec');
var uls=document.querySelector('ul');
var li_1=document.getElementsByClassName('list1')[0];
var score=document.getElementById('score');
var level=1;
var n=0;
var back=document.getElementById('back');
var a = rand(1,3);
console.log(a);
btn.onclick=function(){
	//计时器
	var timer=setInterval(function(){
		z-=0.01;
		z=z.toFixed(2);
		sec.innerHTML=z;
		if(z<=0){
			clearInterval(timer);
			if(n<8){
				alert('GAME OVER!'+' '+n+'分 等级：高度近视');
			}else if(n<=12){
				alert('GAME OVER!'+' '+n+'分 等级：正常视力');
			}else if(n<=20){
				alert('GAME OVER!'+' '+n+'分 等级：天兵天将');
			}else{
				alert('GAME OVER!'+' '+n+'分 等级：悟空转世');
			}
			back.style.display='block';
		}
	},10);
	//点击按钮消失，第一个li消失
	btn.remove();
	li_1.remove();
	//app函数定义
	
	app();
	function app(){
		level+=1;
		for(var i=0;i<level*level;i++){
			var newLi=document.createElement('li');
			uls.appendChild(newLi);
			var newImg=document.createElement('img');
			newLi.appendChild(newImg);
			newLi.style.width=100/level+'%';
			newLi.style.float='left';
			newImg.style.display='block';
			newImg.style.width=100+'%';
			if(a==1){
				newImg.src='img/1.png';
				console.log("1");
			}else if(a==2){
				newImg.src='img/3.png';
				console.log("3");
			}else{
				newImg.src='img/5.png';
				console.log("5");
			}
			newLi.style.backgroundColor='rgb('+rand(50,255)+','+rand(50,255)+','+rand(50,255)+')';
		}
		var x=rand(0,level*level-1);
		var imgs1=document.querySelectorAll('img');
		if(a==1){
			imgs1[x].src='img/2.png';
			console.log("2");
		}else if(a==2){
			imgs1[x].src='img/4.png';
			console.log("4");
		}else{
			imgs1[x].src='img/6.png';
			console.log("6");
		}
		var li=document.querySelectorAll('li');
		li[x].onclick=function(){
			for(var i=0;i<level*level;i++){
				li[i].remove(this);
			}
			n+=1;
			score.innerHTML=n;
			if(level>10){level=10};
			app();
		}
		a = rand(1,3);
		console.log(a);
	}
}
//random
function rand(min,max){
	return Math.round(Math.random()*(max-min)+min);
}