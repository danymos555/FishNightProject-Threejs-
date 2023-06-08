import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'

let scene, camera, renderer, moon, controls;

init();
animate();

function init(){

  scene = new THREE.Scene();

  //camara
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight,0.1,10000);
  camera.position.set(0, 50, 2500);
  camera.lookAt(scene.position);
  /*const helper = new THREE.CameraHelper(camera);
  scene.add(helper);*/
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  /*const controls = new OrbitControls(camera, renderer.domElement)
  controls.noPan = true
  controls.noZoom = true*/

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.minDistance = 500;
  controls.maxDistance = 2000;

  //Texture loaders
  const textureLoader = new THREE.TextureLoader();
  const moonTexture = textureLoader.load("img/moontexture.jpg");
  const planeTexture = textureLoader.load("img/mountains_baseColor.jpeg");

  //Scene background
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load("img/corona_ft.png");
  let texture_bk = new THREE.TextureLoader().load("img/corona_bk.png");
  let texture_up = new THREE.TextureLoader().load("img/corona_up.png");
  let texture_dn = new THREE.TextureLoader().load("img/corona_dn.png");
  let texture_rt = new THREE.TextureLoader().load("img/corona_rt.png");
  let texture_lf = new THREE.TextureLoader().load("img/corona_lf.png");

  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);

  //luces
  const directionaLight = new THREE.DirectionalLight(0xffffff, 1);
  directionaLight.position.set(0, 1, 0);
  directionaLight.castShadow = true;
  scene.add(directionaLight);

  

  //la luna
  const moonGeom = new THREE.SphereGeometry(500, 1000, 1000);
  const moonMat = new THREE.MeshBasicMaterial({map: moonTexture});
  moon = new THREE.Mesh(moonGeom, moonMat);
  moon.position.set(20, 2500, -5000);
  scene.add(moon);

  //el plano
  const planeGeometry = new THREE.PlaneGeometry(10000, 10000);
  const planeMaterial = new THREE.MeshBasicMaterial({map: planeTexture});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  //plane.position.y = - 33;
  plane.position.set(0, -500, 0);
  plane.rotation.x = - Math.PI / 2;
  scene.add(plane);

  //GLTF loader
  const loader = new GLTFLoader();
  loader.load("models/mountains.glb", function(gltfScene){
    gltfScene.scene.rotation.y = - Math.PI / 2;
    gltfScene.scene.scale.set(100, 300, 100);
    gltfScene.scene.position.set(-500, -500, -5000);
    scene.add(gltfScene.scene);
  });

  loader.load("models/mountains.glb", function(gltfScene){
    gltfScene.scene.rotation.y = - Math.PI / 2;
    gltfScene.scene.scale.set(100, 200, 100);
    gltfScene.scene.position.set(-3000, -500, -5000);
    scene.add(gltfScene.scene);
  });

  loader.load("models/mountains.glb", function(gltfScene){
    gltfScene.scene.rotation.y = - Math.PI / 2;
    gltfScene.scene.scale.set(100, 200, 100);
    gltfScene.scene.position.set(3000, -500, -5000);
    scene.add(gltfScene.scene);
  });

  loader.load("models/old_rusty_car.glb", function(gltfScene){
    gltfScene.scene.rotation.y = -25;
    gltfScene.scene.scale.set(0.5, 0.5, 0.5);
    gltfScene.scene.position.set(0, -500, 500);
    scene.add(gltfScene.scene);
  });

  loader.load("models/electricity_pole.glb", function(gltfScene){
    gltfScene.scene.rotation.y = - Math.PI / 2;
    gltfScene.scene.scale.set(250, 250, 250);
    gltfScene.scene.position.set(1000, -500, 1000);
    scene.add(gltfScene.scene);
  });

}

/*window.addEventListener(
  'resize',
  () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      // composer.setSize( window.innerWidth, window.innerHeight )
      halfWidth = window.innerWidth / 2;
      halfHeight = window.innerHeight / 2;
      composerScene.setSize( halfWidth * 2, halfHeight * 2 );
      composer1.setSize( halfWidth, halfHeight );
      renderScene.uniforms[ 'tDiffuse' ].value = composerScene.renderTarget2.texture;
      render()
  },
  false
)*/

function animate(){
  requestAnimationFrame(animate);
  moon.rotation.y += 0.005;

  render();
}

function render(){
  renderer.render(scene, camera); 
}
