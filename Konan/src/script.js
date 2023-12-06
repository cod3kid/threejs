import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//Scene
const scene = new THREE.Scene();

//Debugging
// const gui = new dat.GUI();

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const konanTexture = textureLoader.load("/textures/konan.png");
const particleTexture = textureLoader.load("/textures/alphaSnow.jpg");

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

//Mesh Paper
const geometry = new THREE.BufferGeometry();
const verticesAmount = 1000;
const positionsArray = new Float32Array(verticesAmount * 3);
for (let i = 0; i < verticesAmount * 3; i++) {
  positionsArray[i] = Math.random() - 0.5;
}
geometry.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));
const material = new THREE.PointsMaterial();
material.size = 0.02;
const mesh = new THREE.Points(geometry, material);
scene.add(mesh);

// Mesh Konan
const geometryKonan = new THREE.PlaneGeometry(0.5, 0.5);
const materialKonan = new THREE.MeshBasicMaterial({
  map: konanTexture,
});
materialKonan.side = THREE.DoubleSide;

const meshKonan = new THREE.Mesh(geometryKonan, materialKonan);
scene.add(meshKonan);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  aspect.width / aspect.height,
  0.01,
  100
);
camera.position.z = 2;
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

  // mesh.rotation.x = elapsedTime * 0.05;
  // mesh.position.y = elapsedTime * 0.05;

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
