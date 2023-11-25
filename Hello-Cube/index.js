// Scene
const scene = new THREE.Scene();

// Object or Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 1;
mesh.position.z = -2;
mesh.scale.x = 2;
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 1.2;
scene.add(mesh);

// Camera
const aspect = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); // By default near value is 1 and far value is 2000
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);
renderer.render(scene, camera);
