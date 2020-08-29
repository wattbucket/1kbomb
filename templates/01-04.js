function init() {
    // var stats = initStats();

    // default setup
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);


    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(20,20, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -Math.PI/2;

    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(2, 8, 10);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 0;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    var panelGeometry = new THREE.BoxGeometry(.4, 8, 8);
    var panelMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var panel = new THREE.Mesh(panelGeometry, panelMaterial);

    // position the panel
    panel.position.x = 0;
    panel.position.y = 0;
    panel.position.z = 0;
    panel.rotation.z =  -Math.PI/5;
    panel.rotation.y =  Math.PI/4;

    panel.castShadow = true;
    panel.receiveShadow = true;

    // add the panel to the scene
    scene.add(panel);

    // position and point the camera to the center of the scene
    camera.position.x = -5;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    var ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-10, 20, -0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // call the render function
    var step = 0;
    renderScene();

    function renderScene() {
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }
}