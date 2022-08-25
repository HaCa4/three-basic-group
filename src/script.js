import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

console.time("Rendering Time");
const clock = new THREE.Clock();

const textureLoader = new THREE.TextureLoader();

const sTextureOthers = textureLoader.load("/textures/1.jpg");
sTextureOthers.minFilter = THREE.NearestFilter;

const sTextureCenter = textureLoader.load("/textures/2.jpg");
sTextureCenter.minFilter = THREE.NearestFilter;

const textTexture = textureLoader.load("/textures/5.png");

//BASE

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const sepGroup = new THREE.Group();
scene.add(sepGroup);

const sCenter = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 1100),
  new THREE.MeshPhongMaterial({ map: sTextureCenter })
);
sCenter.position.x = 0;
sCenter.material.shininess = 30;
scene.add(sCenter);

const geoS = new THREE.SphereGeometry(0.5, 32, 1100);
const mat = new THREE.MeshLambertMaterial({ map: sTextureOthers });

let s1, s2, s3, s4, s5, s6;
const arr = [s1, s2, s3, s4, s5, s6];
for (let i = 0; i < 6; i++) {
  arr[i] = new THREE.Mesh(geoS, mat);
  sepGroup.add(arr[i]);
}
arr[0].position.x = -5;
arr[1].position.x = 5;
arr[2].position.y = -5;
arr[3].position.y = 5;
arr[4].position.z = -5;
arr[5].position.z = 5;

let pointColor = new THREE.Color("white");
let ambientColor = new THREE.Color("rgb(155,80,155)");

const ambientLight = new THREE.AmbientLight(ambientColor, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(pointColor, 0.8);
pointLight.position.x = -10;
pointLight.position.y = 4;
pointLight.position.z = 8;
scene.add(pointLight);

/**
 * FONT LOADER
 */

const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Planet Test - 1", {
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
  const material2 = new THREE.MeshMatcapMaterial({ matcap: textTexture });

  const text = new THREE.Mesh(textGeometry, material2);
  scene.add(text);

  const littleSphereGeometry = new THREE.SphereGeometry(0.5, 500, 1000);

  for (let i = 0; i < 500; i++) {
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
camera.position.x = 7;
camera.position.y = 5;
camera.position.z = 8;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.damping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

controls.enableDamping = true;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  sepGroup.rotation.y = -elapsedTime / 10;
  sepGroup.rotation.x = elapsedTime / 10;
  sepGroup.rotation.Z = -elapsedTime / 10;

  sCenter.rotation.y = elapsedTime / 5;
  for (let i = 0; i < 6; i++) {
    arr[i].rotation.z = elapsedTime / 3;
    arr[i].rotation.x = -elapsedTime / 3;
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
console.timeEnd("tick");
