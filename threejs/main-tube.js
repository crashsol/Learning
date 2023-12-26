import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MockData from "./data/data";

//创建一个场景

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xb0e2ff);

//创建一个相机
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  50000
);

//点光源
var pointLine = new THREE.PointLight(0xffffff);
pointLine.position.set(5000, 5000, 5000); //点光源位置
scene.add(pointLine); //点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight();
scene.add(ambient);


//创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth-1, window.innerHeight-1);

//讲渲染器加入到dom
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(6000);
scene.add(axesHelper);

axesHelper.position.set(0, -5000, -0);

//添加控制器
const orbitControls = new OrbitControls(camera, renderer.domElement);

// //添加网格
// var gridXZ = new THREE.GridHelper(1000, 6, 0xeed5b7, 0xeed5b7);
// gridXZ.position.set(500, -1000, 500);
// scene.add(gridXZ);

// var gridXY = new THREE.GridHelper(1000, 6, 0xeed5b7, 0xeed5b7);
// gridXY.position.set(0, -1000, -4000);
// gridXY.rotation.x = Math.PI / 2;
// scene.add(gridXY);

// var gridYZ = new THREE.GridHelper(1000, 6, 0xeed5b7, 0xeed5b7);

// gridYZ.position.set(-4000, -1000, 0);
// gridYZ.rotation.z = Math.PI / 2;
// scene.add(gridYZ);

//设置相机位置
camera.position.set(3000, -2000, 3000);
camera.lookAt(0,0,0);



//创建path路径
scene.add(orbitControls)

//绘制管道
var points = MockData[0].tras.map(b => new THREE.Vector3(b[0],b[1],b[2]))
const path = new THREE.CatmullRomCurve3(points);
//使用path路径创建一条曲线
const lineGeo = new THREE.BufferGeometry();
//从路径上获得点信息
lineGeo.setFromPoints(path.getPoint(1000));
const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
const line = new THREE.Line(lineGeo, lineMat);
scene.add(line);

const tubeGeo = new THREE.TubeGeometry(path, 64, 100, 20, false);
const tubeMat = new THREE.MeshStandardMaterial({
  side: THREE.BackSide, 
  color: "#ffff00",
  transparent:true,
 //   wireframe:true
 opacity:0.2

});
const tube = new THREE.Mesh(tubeGeo, tubeMat);

//tube 2
const tubeGeo2 = new THREE.TubeGeometry(path, 64, 50, 20, false);
const tubeMat2 = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide, 
    color: "#ff0000",
    transparent:true,
   //   wireframe:true
   opacity:0.2
  
  });
const tube2 = new THREE.Mesh(tubeGeo2, tubeMat2);


scene.add(tube,tube2);

//scene.background = new THREE.Color(0x050505);
function animate() {
  //浏览器刷新动画
  requestAnimationFrame(animate);
  //调整正方体位置

  // cube.position.x += 0.01;
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }

  //重新渲染场景 、相机，讲调整的内容进行展示
  renderer.render(scene, camera);
}

//窗口变动触发的函数
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio = window.devicePixelRatio;
  renderer.render(scene, camera);
};

animate();
