import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();
scene.background =new THREE.Color(0x333333); //背景颜色

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true,});
renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
document.body.appendChild(renderer.domElement);
const orbitControls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneGeometry(50,50);
const material = new THREE.ShaderMaterial(
  {
    color: 0x00ff00,
    side:THREE.DoubleSide,
    //顶点着色器
    vertexShader:/*glsl*/`
     //自定义变量传递给 fragment 
     varying vec3 vPosition;
     varying vec2 vUv;
     void main(){             

      //变量赋值
       vUv =  uv;
       vPosition =  position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      

     }
    `,
    //分片着色器
    fragmentShader:/*glsl*/`
     //用变量接受传递过来的 vUv 和vPosition
     varying vec2 vUv;
     varying vec3 vPosition;
     void main() {
       //使用 uv 的x 值变化 0 -》 1
       //gl_FragColor = vec4(vUv.x,0,0, 1.0);

       //使用 uv 的x 值变化 1 -》 0
       //gl_FragColor = vec4(vUv.y,0,0, 1.0);

       //黑白灰
       //gl_FragColor = vec4(vec3(vUv.x), 1.0);

       //uv 赋值给 R G ,B为0 
       //gl_FragColor = vec4(vUv,0, 1.0);

       //uv 赋值给 R G ,B为1
       //gl_FragColor = vec4(vUv,1, 1.0);
      

       //颜色突变
       //我们可以结合 GLSL 的内置函数做出颜色突变的效果，借助 step(edge, x) 函数，其会返回0.0或1.0数值，如果 x<edge 返回0.0，如果 x>edge 返回1.0
       //float color =  step(0.5,vUv.x);
       //gl_FragColor = vec4(vec3(color), 1.0);
       
       //调整渐变的位置 调整 step 的比较值
       //float color =  step(0.7,vUv.x);
       //gl_FragColor = vec4(vec3(color), 1.0);
       
       //颜色互换
       //float color =  step(vUv.x,0.5);
       //gl_FragColor = vec4(vec3(color), 1.0);

       //重复效果、条纹效果
       //当我们想实现重复效果时，可以通过对 vUv 乘以一定倍数放大，比如0.0-1.0放大3倍变成0.0-3.0，
       //然后用 fract() 函数取小数使得数值在 0.0-1.0 里循环重复，比如1.1、2.1取小数后都变回0.1，再将该数值转换成 vec3 再设置到颜色上，就会产生重复的黑白渐变效果
       //float repeatX3 = vUv.x * 5.0;
       //gl_FragColor = vec4(vec3(fract(repeatX3)), 1.0);


       // step 加 fract 形成突变的条线样式
       float repeatX3 = vUv.x * 2.0;      
       gl_FragColor = vec4(vec3(step(0.5,fract(repeatX3))), 1.0);

    }
    `
    
  }
);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(orbitControls);

//cube.rotation.x =  -Math.PI/6
camera.position.z = 100;

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();