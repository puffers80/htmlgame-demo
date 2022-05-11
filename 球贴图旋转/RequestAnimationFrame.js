/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}

//变量定义
var renderer = null,
	scene = null,
	camera = null,
	cube = null,
	animating = 0;
//加载函数
function onLoad(){
	var container = document.getElementById("container");
	//创建 three.js 渲染器, add in div
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	container.appendChild(renderer.domElement);
	//创建一个新的Three.js场景
	scene = new THREE.Scene();
	//创建相机
	camera = new THREE.PerspectiveCamera(45, 
		container.offsetWidth/container.offsetHeight, 1, 4000);
	camera.position.set(0, 0, 3);
	//创建平行光照射到物体
	var light = new THREE.DirectionalLight(0xffffff, 1.5);
	light.position.set(0, 0, 1);
	scene.add(light);
	//创建带有纹理映射的立方体
	var mapUrl = "monster.jpg";
	var map = THREE.ImageUtils.loadTexture(mapUrl);
	var material = new THREE.MeshLambertMaterial({map:map});
	//var geometry = new THREE.CubeGeometry(1, 1, 1);
	var geometry = new THREE.SphereGeometry(1, 60, 60);
	//立方体和纹理放到网格里
	cube = new THREE.Mesh(geometry, material);
	//设置网格在场景中的朝向
	cube.rotation.x = Math.PI/5;
	cube.rotation.y = Math.PI/5;
	//添加网格到场景
	scene.add(cube);
	//鼠标处理
	addMouseHandler();
	run();
}
//渲染循环
function run(){
	renderer.render(scene, camera);
	if(animating==0){
		cube.rotation.y = 0;
	}
	if(animating==1){
		cube.rotation.y -= 0.01;
	}
	else if(animating==2){
		cube.rotation.y -= 0.03;
	}
	else if(animating==3){
		cube.rotation.y -= 0.06;
	}
	else if(animating==4){
		cube.rotation.y = 0;
		animating = 0;
	}
	requestAnimationFrame(run);
}
//鼠标处理
function addMouseHandler(){
	var dom = renderer.domElement;
	dom.addEventListener( 'mouseup', onMouseUp, false);
}
function onMouseUp(){
	event.preventDefault();
	animating++;
}






