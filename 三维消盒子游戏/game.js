var scene;//场景
var cube;
var camera;
var renderer;
var clock;//计时器
var holder;//容器
var intersects;//交互变量
var particles = [];//例子数组
var level = 1;
var totalLevels = 4;
var score = 0;
var totalTargets = 3;//第一局目标数
var speed = 0.01;
var complete = false;
var comments = ["简单", "中等", "困难", "疯狂"];
var myLevel = document.getElementById("level");
var myScore = document.getElementById("score");
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var mouseclicks = 0;
var dt = 0;
var time = 0;
//按钮
var btn1 = document.querySelector('button');
var btn2 = document.getElementById("nextlevel");
var nextround = 0;
//创建场景
function myScene(){
	//初始化场景、照相机、渲染器
	scene = new THREE.Scene();
	var light = new THREE.AmbientLight(0xffffff);
	var width = window.innerWidth;
	var height = window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
	camera.position.z = 18;
	renderer = new THREE.WebGLRenderer({
		antialias:true,
		alpha:true
	});
	renderer.setSize(width, height);
	document.getElementById("webgl-container").appendChild(renderer.domElement);
	//clock 对象的构造函数，记录时间
	clock = new THREE.Clock();
	//设置灯光
	var sLight = new THREE.SpotLight(0xffffff);
	sLight.position.set(-100,100,100);
	scene.add(sLight);
	var aLight = new THREE.AmbientLight(0xffffff);
	scene.add(aLight);
}

//箱子容器
function addHolder(){
	holder = new THREE.Object3D();
	holder.name = "holder";
	//装载若干箱子
	for(var i = 0; i < totalTargets; i++){
		var ranCol = new THREE.Color();
		ranCol.setRGB(Math.random(), Math.random(), Math.random());
		var geometry = new THREE.BoxGeometry(2, 2, 2);
		var material = new THREE.MeshPhongMaterial({
			color:ranCol,
			ambient:ranCol
		});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.x = i * 5;
		cube.name = "cubeName" + i;
		var spinner = new THREE.Object3D();
		spinner.rotation.x = i * 2.5 * Math.PI;
		spinner.name = "spinnerName" + i;
		spinner.add(cube);
		holder.add(spinner);
	}
	scene.add(holder);
}

//爆炸效果
function addExplosion(point){
	//返回 clock 类的那只时间长度，以秒为单位
	var timeNow = clock.getElapsedTime();
	//长生4个爆炸物
	for(var i = 0; i < 4; i++){
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({
			color:0x999999
		});
		var part = new THREE.Mesh(geometry, material);
		part.position.x = point.x;
		part.position.y = point.y;
		part.position.z = point.z;
		part.name = "part" + i;
		part.birthDay = timeNow;
		scene.add(part);
		particles.push(part);
	}
}

//渲染
function render(){
	console.log("speed"+speed);
	holder.children.forEach(function(elem, index, arry){
		elem.rotation.y += (speed * (6 - index));
		elem.children[0].rotation.x += 0.01;
		elem.children[0].rotation.y += 0.01;
	});
	if(particles.length > 0){
		particles.forEach(function(elem, index, arry){
			switch(elem.name){
				case "part0":
					elem.position.x += 1;
					break;
				case "part1":
					elem.position.x -= 1;
					break;
				case "part2":
					elem.position.y += 1;
					break;
				case "part3":
					elem.position.y -= 1;
					break;
				default:
					break;
			}
			if(elem.birthDay - clock.getElapsedTime() < -1){
				scene.remove(elem);
				particles.splice(index, 1);
			}
		});
	}
	renderer.render(scene, camera);
}

//鼠标响应
function onDocumentMouseDown(event){
	event.preventDefault();
	mouseclicks++;
	//如果通关
 	/* if(complete){
		complete = false;
		score = 0;
		mouseclicks = 0;
		restartScene();
		return;
	} */
	//计算鼠标坐标
	mouse.x = (event.clientX/window.innerWidth)*2-1;
	mouse.y = -(event.clientY/window.innerHeight)*2+1;	
	//映射鼠标坐标到照相机
	raycaster.setFromCamera(mouse, camera);
	if(score < totalTargets){
		holder.children.forEach(function(elem, index, arry){
			intersects = raycaster.intersectObjects(elem.children);
			if(intersects.length > 0 && intersects[0].object.visible){
				intersects[0].object.visible = false;
				addExplosion(intersects[0].point);
				score += 1;
				if(score < totalTargets){
					myScore.innerHTML="<span class='hit'>命中</span>得分："
					+score+"/"+totalTargets;
				}else{
					complete = true;
					if(level < totalLevels){
						btn2.style.display = "block";
						myScore.innerHTML="<strong>恭喜过关！</strong>点击进入第"
						+(level+1)+"&nbsp;关";						
					}else{
						dt = new Date();
						alert("你点击了"+mouseclicks+"下,共用时"+(dt-time)/1000+"秒");
						myScore.innerHTML="<strong>通关成功！</strong>点击按钮重新开始！";
						nextround = 1;
						btn1.style.display = "block";
					}
				}
			}
		});
	}
	console.log(score, mouseclicks);
}

//通关设置
function restartScene(){
	myScore.innerHTML = "";
	if(level < totalLevels){
		speed += 0.002;
		totalTargets += 1;
		level += 1;
	}else{
		speed = 0.01;
		totalTargets = 3;
		level = 1;
		mouseclicks = 0;
	}
	console.log("++++++++++"+level,speed);	
	myLevel.innerText = comments[level-1]+":第"+level+"关，共"+totalLevels+"关";	
	scene.remove(holder);
	addHolder();
}

//其他函数
document.getElementById("webgl-container").addEventListener('mousedown', onDocumentMouseDown, false);

btn2.addEventListener("click",function(){
	if(complete){
		btn1.style.display = "none";
		btn2.style.display = "none";
		complete = false;
		score = 0;	
		restartScene();	
		return;
	}
},false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

//重绘
function animate() {
    requestAnimationFrame(animate);
    render();
}

//加载函数
window.onload = function(){
	btn1.onclick=function(){
		if(nextround){
			restartScene();
			nextround=0;
		}
		if(level==1){
			time = new Date();
		}
		btn1.style.display ="none";
		myLevel.innerText = comments[level-1]+":第"+level+"关，共"+totalLevels+"关";
		myScene();
		addHolder();
		animate();
		window.addEventListener('resize', onWindowResize, false);
	}

}

