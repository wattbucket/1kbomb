
const canvas = document.querySelector('#scene3d');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();


const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;


var control = new function () {
    this.inclinacion = 30;
    this.orientacion = 0;
};

var gui = new dat.GUI({ autoPlace: false });

var menu = gui.addFolder('incli-orien');
menu.add(control, 'inclinacion', 0, 90);
menu.add(control, 'orientacion', -180, 180);



const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = .7;
camera.position.y = .512;
camera.position.z = 2;
camera.lookAt(scene.position);


{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}



var floorGeometry = new THREE.BoxGeometry(30, 1, 30);

var floorMaterial = new THREE.MeshBasicMaterial({ color: 0x656587 });
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);
floor.position.y = -3;

floor.receiveShadow = true;


const boxWidth = 2;
const boxHeight = 1;
const boxDepth = .1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
];

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
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);
