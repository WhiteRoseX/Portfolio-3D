import "./style.css";

import * as THREE from "three";
import { Color } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.IcosahedronGeometry( 6 );
const material = new THREE.MeshNormalMaterial({});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0x4B0082);
scene.add(pointLight, ambientLight);

// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const materials = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, materials );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

  star.position.set(x, y, z)
  scene.add(star)
}
Array(200).fill().forEach(addStars)

const spaceTexture = new THREE.TextureLoader().load("./galaxie.jpeg")
scene.background = spaceTexture;

const nexus = new THREE.TextureLoader().load("./nexus.jpeg")

//carré
// const Carré = new THREE.Mesh(
//   new THREE.BoxGeometry(1,1,1),
//   new THREE.MeshBasicMaterial({map: nexus})
// )
// scene.add(Carré)
// fin de carré

//sphere 
const neptune = new THREE.TextureLoader().load('neptune.jpeg')
const normalll = new THREE.TextureLoader().load('normalmap.png')

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial( {
      map: neptune,
      normalMap: normalll
    } )
)
scene.add(sphere)

sphere.position.z = 30;
sphere.position.setX(-15);

//sphere fin

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sphere.rotation.z += 0.05;
  sphere.rotation.x += 0.075;
  sphere.rotation.y += 0.05;
  
  sphere.rotation.y += 0.01;
  sphere.rotation.y += 0.01;
  
  camera.position.z = t * -0.05;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
}


function animatee() {
  requestAnimationFrame(animatee);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  // torus.rotation.z += 0.01

  controls.update()
  renderer.render(scene, camera);
}

animatee();
document.body.onscroll = moveCamera;
