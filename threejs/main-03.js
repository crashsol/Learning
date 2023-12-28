import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333); //背景颜色

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, });
renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);

document.body.appendChild(renderer.domElement);

// const geometry = new THREE.PlaneGeometry(50,50);
// const geometry = new THREE.BoxGeometry(30, 30, 30);
const geometry = new THREE.SphereGeometry(40,32,16);

const material = new THREE.ShaderMaterial(
  {
    //给vetex 和  fragment 传值
    uniforms: {
      time: { value: 0.2 },
      color:{ value: new THREE.Color("orange")}
      
    },

    // transparent:true, 
    side: THREE.DoubleSide,
    //顶点着色器
    vertexShader:/* glsl */`
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
     uniform float time;
     uniform vec3  color;

     void main() {     

        //设置中心点 uv 0->1
        vec2 center = vec2(0.5,0.5);    
        
        vec2 pos = mod(vUv * 5.0,1.0);    

        //uv离中心点的距离
        float d =  distance(pos,center);

        float mask = step(d,0.25 +  sin(time + vUv.x * 2.0 ) *0.15);

        vec3 fragColor = mix(color , vec3(1.0), mask);

    
        gl_FragColor = vec4(fragColor,1.0); //从小到大的变化的 圆圈
    }
    `

  }
);
const cube = new THREE.Mesh(geometry, material);



const orb = new OrbitControls(camera, renderer.domElement);


scene.add(cube);
scene.add(orb);

//cube.rotation.x =  -Math.PI/6
camera.position.z = 100;

function animate(time) {

  material.uniforms.time.value += 0.03;
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();