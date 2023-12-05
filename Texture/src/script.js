import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

// Dat GUI

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("/texture/color.jpg");

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.SphereGeometry(15, 32, 32);
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});

// material.map = colorTexture
// material.wireframe = true
// material.transparent = true;
// material.opacity = 0.6;
// material.color = "blue";
// material.side = THREE.DoubleSide;
// material.visible=false

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 30;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
