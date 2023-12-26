import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();
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
    vertexShader:`
     void main(){

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);


     }
    `,
    //分片着色器
    fragmentShader:`
     void main() {
       gl_FragColor = vec4(1.0, 1, 0, 1.0);
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