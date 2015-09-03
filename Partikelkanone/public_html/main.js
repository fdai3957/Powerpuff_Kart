//Cube particles
var colorArray = new Array({color: 0xf2ff00}, {color: 0xff7200}, {color: 0xFF0000});
var colorArrayIndex = 0;
var cubeIndex = 0;

var cubeObjectArray = new Array();

function CreateCube(cubeColor) {
    size = getRandomArbitrary(0.05, 0.15)
    var cubeGeometry = new THREE.BoxGeometry(size, size, size);
    var cubeMaterial = new THREE.MeshLambertMaterial(cubeColor);
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
}

function SpawnCubes() {
    var cube = CreateCube(colorArray[colorArrayIndex]);

    cube.position.y = 3.1;
    cube.position.x = getRandomPosition();
    cube.position.z = getRandomPosition();
    cube.name = "cube" + (cubeIndex++);

    cubeObjectArray.push({
        cube: cube,
        endY: ((colorArrayIndex + 1) / 2) + cube.position.y
    });

    colorArrayIndex = (colorArrayIndex + 1) % 3;

    return cube;
}

function getRandomPosition() {
    var vorzeichen = 0;
    if (getRandomArbitrary(0, 1) > 0.5) {
        vorzeichen = 1;
    }
    else {
        vorzeichen = -1;
    }
    return getRandomArbitrary(0, 0.5) * vorzeichen;
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}




$(function () {
    var windowHeight = 600, windowWidth = 600;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 0.1, 500);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0xdddddd);
    renderer.setSize(windowWidth, windowHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    //var axis = new THREE.AxisHelper(10);
    //scene.add(axis);


    var cubeGeometry = new THREE.BoxGeometry(1, 3, 1);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff3300});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.y = 1.5;
    cube.castShadow = true;

    scene.add(cube);

    var planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;

    scene.add(plane);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(-30, 30, 50);

    scene.add(spotLight);

    cameraPivot = new THREE.Object3D();
    cameraPivot.add(camera);
    scene.add(cameraPivot);

    cameraPivot.position.x = -7;
    cameraPivot.position.y = 7;
    cameraPivot.position.z = 0;
    cameraPivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI);
    cameraPivot.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
    cameraPivot.rotateOnAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 3);
    camera.lookAt(cube.position);

    var cubeObjectCallback = function (element, index, array) {
        if (element.cube.position.y < element.endY) {
            element.cube.position.y += 0.05;
        }
        else {
            scene.remove(element.cube);
            
            cubeObjectArray.splice(index,1);
        }
    };

    render();
    function render() {
        if (cubeObjectArray.length < 200) {
            scene.add(SpawnCubes());
            scene.add(SpawnCubes());
        }

        cubeObjectArray.forEach(cubeObjectCallback);

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    $("#webGL-container").append(renderer.domElement);
    renderer.render(scene, camera);
});