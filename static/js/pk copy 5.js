


////////////////////////////////////////////////////
const canvas = document.querySelector('#scene3d');
////////////////////////////////////////////////////





// SCENE

scene = new THREE.Scene();

// CAMERA 

camera = new THREE.PerspectiveCamera(45, scene3d.clientWidth / scene3d.clientHeight, 0.1, 100);
camera.position.x = 17;
camera.position.y = 12;
camera.position.z = 13;
// camera.rotation.x=Math.PI/4

camera.lookAt(scene.position);
// camera.aspect = scene3d.clientWidth / scene3d.clientHeight;
// camera.updateProjectionMatrix();



// GEOMETRY & MATERIALS

var cubeGeometry = new THREE.BoxGeometry(3, 3, .51);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff55ff });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
cube.position.z = 1;
cube.rotation.set(2 * Math.PI / 3, 0, 0);


// SUELO
var floorGeometry = new THREE.BoxGeometry(30, 1, 30);

var floorMaterial = new THREE.MeshBasicMaterial({ color: 0x656587 });
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);
floor.position.y = -3;

floor.receiveShadow = true;

// LIGHT

var spot1 = new THREE.SpotLight(0xffffff);
spot1.position.set(10, 100, -50);
scene.add(spot1);

// FINISH SCENE SETUP
// CONTROLS
// var controls = new OrbitControls(camera, renderer.domElement);

//  GUI MENU
var gui = new dat.GUI({ autoPlace: false });
var control = new function () {
    this.inclinacion = 30;
    this.orientacion = 0;
};
var menu = gui.addFolder('incli-orien');
menu.add(control, 'inclinacion', 0, 90);
menu.add(control, 'orientacion', -180, 180);
canvas.appendChild(gui.domElement);




// RENDERER
////////////////////////////////////////////////////
renderer = new THREE.WebGLRenderer({ canvas });
////////////////////////////////////////////////////
renderer.setClearColor(0xffffff, 1.0);

function resizeRendererToDisplaySize(renderer) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}


function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {

        // const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
}
requestAnimationFrame(render);






