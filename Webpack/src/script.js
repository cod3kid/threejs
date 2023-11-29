import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "pink" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
camera.position.x = 0;
camera.position.y = 1;

scene.add(camera);

const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

// Clock Class
const clock = new THREE.Clock();

const animate = () => {
  // GetElapsedTime
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime * (Math.PI / 2);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
