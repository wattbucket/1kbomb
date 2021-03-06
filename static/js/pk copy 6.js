


////////////////////////////////////////////////////
const canvas = document.querySelector('#scene3d');
////////////////////////////////////////////////////




// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a render and set the size
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xffffff));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


var axes = new THREE.AxesHelper(20);
scene.add(axes);

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

// add the plane to the scene
scene.add(plane);
// create a cube and add to scene
var texture = new THREE.TextureLoader().load('textures/panel.png', render);
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();


var cubeMaterial = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
cubeMaterial.transparent = true;
// create a cube
var cubeGeometry = new THREE.BoxGeometry(.1, 8, 8);
// var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;

// position the cube
cube.position.x = 0;
cube.position.y = -0.001;
cube.position.z = 0;

// add the cube to the scene
scene.add(cube);


// position and point the camera to the center of the scene
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// add subtle ambient lighting
var ambienLight = new THREE.AmbientLight(0x353535);
scene.add(ambienLight);

// add spotlight for the shadows
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-10, 20, -5);
spotLight.castShadow = true;
scene.add(spotLight);

// add the output of the renderer to the html element
document.getElementById("scene3d").appendChild(renderer.domElement);

// call the render function
var step = 0;

var controls = new function () {
    this.inclinacion = 30;
    this.orientacion = 0;
    this.posiciona = function () {
        console.log(controls.inclinacion)
    }
};

var gui = new dat.GUI();
gui.add(controls, 'inclinacion', 0, 90).step(1);
gui.add(controls, 'orientacion', -180, 180).step(1);
gui.add(controls, 'posiciona');



// attach them here, since appendChild needs to be called first
// var trackballControls = initTrackballControls(camera, renderer);
var clock = new THREE.Clock();

render();

function render() {
    cube.rotation.z = (controls.inclinacion - 90) * Math.PI / 180;
    cube.rotation.y = -controls.orientacion * Math.PI / 180;
    // console.log(cube.rotation.z)
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}