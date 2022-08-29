import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const clock = new THREE.Clock();

const textureLoader = new THREE.TextureLoader();

const sTextureOthers = textureLoader.load("/textures/1.jpg");
sTextureOthers.minFilter = THREE.NearestFilter;

const sTextureCenter = textureLoader.load("/textures/2.jpg");
sTextureCenter.minFilter = THREE.NearestFilter;

//BASE

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const sepGroup = new THREE.Group();
scene.add(sepGroup);

const sCenter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 1100),
  new THREE.MeshPhongMaterial({ map: sTextureOthers })
);
sCenter.position.x = 0;
sCenter.material.shininess = 1;
sCenter.receiveShadow = true;
sCenter.castShadow = true;
scene.add(sCenter);

const geoS = new THREE.SphereGeometry(0.3, 32, 1100);
const mat = new THREE.MeshLambertMaterial({ map: sTextureCenter });

let s1, s2, s3, s4, s5, s6;
const arr = [s1, s2, s3, s4, s5, s6];
for (let i = 0; i < 6; i++) {
  arr[i] = new THREE.Mesh(geoS, mat);
  arr[i].castShadow = true;
  arr[i].receiveShadow = true;
  sepGroup.add(arr[i]);
}

arr[0].position.x = 4.5;
arr[1].position.x = -4.5;
arr[2].position.y = 4.5;
arr[3].position.y = -4.5;
arr[4].position.z = 4.5;
arr[5].position.z = -4.5;

let pointColor = new THREE.Color("white");
let ambientColor = new THREE.Color("rgb(155,80,155)");

const ambientLight = new THREE.AmbientLight(ambientColor, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(pointColor, 4);
pointLight.position.set(10, 0, 0);
pointLight.castShadow = true;
pointLight.shadow.camera.far = 15;
pointLight.shadow.camera.near = 5;
pointLight.shadow.mapSize.set(1024, 1024);

scene.add(pointLight);

/**
 * FONT LOADER
 */

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Planet                     Test - 1", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 30,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelOffset: 0.01,
    bevelSegments: 2,
  });

  const material = new THREE.MeshMatcapMaterial({ color: 0xffff00 });
  const material2 = new THREE.MeshMatcapMaterial({ color: new THREE.Color("orange") });

  const text = new THREE.Mesh(textGeometry, material2);
  scene.add(text);

  const littleSphereGeometry = new THREE.SphereGeometry(0.3, 500, 1000);

  for (let i = 0; i < 150; i++) {
    const littleSphere = new THREE.Mesh(littleSphereGeometry, material);

    littleSphere.position.x = (Math.random() - 0.5) * 1000;
    littleSphere.position.y = (Math.random() - 0.5) * 1000;
    littleSphere.position.z = (Math.random() - 0.5) * 1000;

    scene.add(littleSphere);
  }
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(12, 2, 6);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.damping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
controls.enableDamping = true;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  sepGroup.rotation.y = -elapsedTime / 10;
  sepGroup.rotation.z = -elapsedTime / 10;
  sCenter.rotation.y = elapsedTime / 25;
  for (let i = 0; i < 6; i++) {
    arr[i].rotation.x = elapsedTime / 5;
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
