import * as THREE from "three";
// import { ThreeMFLoader, Wireframe } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new  THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// basic things needed are added

// Start by adding geometry and material
const geo = new THREE.IcosahedronGeometry(1.0, 3);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true
});
// glue geometry and material together
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh) // adding to the scene

// Lets add another material to the scene
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001)
mesh.add(wireMesh);

// checking for geometry and diff materials
// ##########################


// textMesh = new THREE.Mesh(geometry, )
// scene.add(textMesh)

// add light so we can view the object
// not needed from MeshBasicMaterial but needed for MeshStandardMaterial because those interact with light
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t=0) {
  requestAnimationFrame(animate);
  // mesh.scale.setScalar(Math.cos(t * 0.001) + 2.0);
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}

animate();
