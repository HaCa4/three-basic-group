import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const textureLoader = new THREE.TextureLoader();

const sTexture1 = textureLoader.load("/1.jpg");
sTexture1.minFilter = THREE.NearestFilter;

const sTexture2 = textureLoader.load("/2.jpg");
sTexture1.minFilter = THREE.NearestFilter;

const sTexture3 = textureLoader.load("/3.jpg");
sTexture1.minFilter = THREE.NearestFilter;

const sTexture4 = textureLoader.load("/4.jpg");
sTexture1.minFilter = THREE.NearestFilter;

const sTexture5 = textureLoader.load("/5.jpg");
sTexture1.minFilter = THREE.NearestFilter;

//BASE

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const sepGroup = new THREE.Group();
scene.add(sepGroup);

const s1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 1100),
  new THREE.MeshLambertMaterial({ map: sTexture1 })
);

const s2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 1100),
  new THREE.MeshLambertMaterial({ map: sTexture2 })
);

const s3 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 1100),
  new THREE.MeshLambertMaterial({ map: sTexture3 })
);

const s4 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 1101),
  new THREE.MeshLambertMaterial({ map: sTexture4 })
);

const s5 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 1100),
  new THREE.MeshLambertMaterial({ map: sTexture5 })
);

s1.position.x = -5;
s1.position.z = 2;
s2.position.x = 5;
s2.position.z = 2;
s3.position.x = 0;
s3.position.z = -3;
s4.position.y = 5;
s5.position.y = -5;
s5.position.z = -6;

sepGroup.add(s1);
sepGroup.add(s2);
sepGroup.add(s3);
sepGroup.add(s4);
sepGroup.add(s5);

const ambientLight = new THREE.AmbientLight(0xff0, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff00ff, 1);
pointLight.position.x = 8;
pointLight.position.y = 8;
pointLight.position.z = 0;
scene.add(pointLight);

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
camera.position.z = 11;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

controls.damping = true;

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  sepGroup.rotation.y = -elapsedTime / 10;
  sepGroup.rotation.x = elapsedTime / 15;
  sepGroup.rotation.Z = -elapsedTime / 10;

  s1.rotation.y = elapsedTime / 3;
  s2.rotation.y = elapsedTime / 4;
  s3.rotation.y = elapsedTime / 5;
  s4.rotation.y = elapsedTime / 4;
  s5.rotation.y = elapsedTime / 3;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

/* 

****************GUI EXAMPLE CODE*****************

var gui = new dat.GUI({ load: getPresetJSON(), preset: 'Preset1' });

var object1 = {
	type1_boolean: false,
  type2_string: 'string',
  type3_number: 0,
  type4_function: function () {
  	alert('This is a function.');
  }
};

var object2 = {
	string1: 'string1',
  string2: 'string2'
};

var object3 = {
	color0: "#ffae23", // CSS string
  color1: [ 0, 128, 255 ], // RGB array
  color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
  color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};
// dat.GUI will modify colors in the format defined by their initial value.

// saveValues: gui.remember must be executed before gui.add
gui.remember(object1);
gui.remember(object2);

// setController: boolean, string, number, function
gui.add(object1, 'type1_boolean');
gui.add(object1, 'type2_string');

var folder1 = gui.addFolder('FolderNameA');
folder1.add(object1, 'type3_number', -5, 5);
folder1.add(object1, 'type4_function');

// collapse folder1
folder1.close();

var folder2 = gui.addFolder('FolderNameB');
folder2.add(object2, 'string1', {
	'key1': 'string_1',
  'key2': 'string_2',
  'key3': 'string_3'
});
folder2.add(object2, 'string2', [
	'string_1', 'string_2', 'string_3'
]);

var folder3 = gui.addFolder('FolderNameC');
folder3.addColor(object3, 'color0');
folder3.addColor(object3, 'color1');
folder3.addColor(object3, 'color2');
folder3.addColor(object3, 'color3');

// expand folder3
folder3.open();

// presetJSON: created from pressing the gear.
function getPresetJSON() {
	return {
    "preset": "Default",
    "closed": false,
    "remembered": {
      "Default": {
        "0": {
          "type1_boolean": false,
          "type2_string": "string",
          "type3_number": 0
        },
        "1": {
          "string1": "string1",
          "string2": "string2"
        }
      },
      "Preset1": {
        "0": {
          "type1_boolean": true,
          "type2_string": "string123",
          "type3_number": -2.2938689217758985
        },
        "1": {
          "string1": "string_2",
          "string2": "string_3"
        }
      }
    },
    "folders": {
      "FolderNameA": {
        "preset": "Default",
        "closed": false,
        "folders": {}
      },
      "FolderNameB": {
        "preset": "Default",
        "closed": false,
        "folders": {}
      },
      "FolderNameC": {
        "preset": "Default",
        "closed": false,
        "folders": {}
      }
    }
  };
}

*/
