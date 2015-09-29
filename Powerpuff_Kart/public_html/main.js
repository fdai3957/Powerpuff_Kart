$(function () {
    var windowHeight = 600, windowWidth = 600;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 0.1, 500);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0xdddddd);
    renderer.setSize(windowWidth, windowHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    var cameraVictim = new THREE.Mesh();
    cameraVictim.position.x = 0;
    cameraVictim.position.y = 0.25;
    cameraVictim.position.z = 0;
    scene.add(cameraVictim);

    //Kartbahn
    var kartbahnManager = new THREE.LoadingManager();
    kartbahnManager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    var kartbahn = null;
    var kartbahnLoader = new THREE.JSONLoader(kartbahnManager);
    kartbahnLoader.load('models/KartbahnFertig1.json', function (geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0x3d3d3d});
        kartbahn = new THREE.Mesh(geometry, material);

        kartbahn.position.y += 0.1;
        kartbahn.scale.x *= 1.9;
        kartbahn.scale.z *= 1.9;

        scene.add(kartbahn);
    });

    //Car 1
    var car1Manager = new THREE.LoadingManager();
    car1Manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    var car1Geometry = new THREE.BoxGeometry(0.8, 0.4, 1.6);
    var car1Material = new THREE.MeshLambertMaterial({color: 0xff3300});
    var car1 = new THREE.Mesh(car1Geometry, car1Material);

//    var car1 = null;
    var car1Loader = new THREE.JSONLoader(car1Manager);
    car1Loader.load('models/AutoRot.json', function (geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0xff3300});
        car1 = new THREE.Mesh(geometry, material);

        car1.scale.x *= 0.2;
        car1.scale.z *= 0.2;
        car1.scale.y *= 0.2;
        car1.castShadow = true;

        scene.add(car1);
    });






    //Car 2
    var car2Manager = new THREE.LoadingManager();
    car2Manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    var car2Geometry = new THREE.BoxGeometry(0.8, 0.4, 1.6);
    var car2Material = new THREE.MeshLambertMaterial({color: 0x228B22});
    var car2 = new THREE.Mesh(car2Geometry, car2Material);

//    var car2 = null;
    var car2Loader = new THREE.JSONLoader(car2Manager);
    car2Loader.load('models/AutoGruen.json', function (geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0x228B22});
        car2 = new THREE.Mesh(geometry, material);

        car2.scale.x *= 0.2;
        car2.scale.z *= 0.2;
        car2.scale.y *= 0.2;
        car2.castShadow = true;

        scene.add(car2);
    });


    //Ground
//    var planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
//    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
//    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
//
//    plane.rotation.x = -0.5 * Math.PI;
//    plane.receiveShadow = true;
//
//    scene.add(plane);

    var tonneManager = new THREE.LoadingManager();
    tonneManager.onProgress = function(item, loaded, total){
        console.log(item, loaded, total);
    };

    var tonne = new THREE.Mesh();
    var loader = new THREE.JSONLoader(tonneManager);
    loader.load('models/Tonne.json', function (geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0x3d3d3d});
        tonne = new THREE.Mesh(geometry, material);

        tonne.position.x += 0.2;
        tonne.position.z += 0.2;

        scene.add(tonne);
    });

    var cubeObjectCallback = function (element, index, array) {
        if (element.cube.position.y < element.endY) {
            element.cube.position.y += 0.05;
        }
        else {
            scene.remove(element.cube);

            cubeObjectArray.splice(index, 1);
        }
    };

    zuschauerOrientation = [];
    zuschauerArray = [];
    multiplySpectator(scene);

    //Light
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(30, 30, 50);

    scene.add(spotLight);

    

    //Camera Position
    cameraPivot = new THREE.Object3D();
    cameraPivot.add(camera);
    scene.add(cameraPivot);

    cameraPivot.position.x = -30;
    cameraPivot.position.y = 30;
    cameraPivot.position.z = 0;
    cameraPivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI);
    cameraPivot.rotateOnAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 4);

    camera.lookAt(cameraVictim.position);

    //Skybox
    texture_placeholder = document.createElement('canvas');
    texture_placeholder.width = 128;
    texture_placeholder.height = 128;

    var skyboxContext = texture_placeholder.getContext('2d');
    skyboxContext.fillStyle = 'rgb( 200, 200, 200 )';
    skyboxContext.fillRect(0, 0, texture_placeholder.width, texture_placeholder.height);

    var skyboxMaterials = [
        loadTexture('images/skybox_px.jpg'), // right
        loadTexture('images/skybox_nx.jpg'), // left
        loadTexture('images/skybox_py.jpg'), // top
        loadTexture('images/skybox_ny.jpg'), // bottom
        loadTexture('images/skybox_pz.jpg'), // back
        loadTexture('images/skybox_nz.jpg')  // front
    ];

    var skyboxMesh = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300, 7, 7, 7), new THREE.MeshFaceMaterial(skyboxMaterials));
    skyboxMesh.scale.x = -1;
    scene.add(skyboxMesh);





    //Render Function
    render();
    function render() {
        moveCar(car1, 1);
        moveCar(car2, 2);
        
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

function loadTexture(path) {
    var texture = new THREE.Texture(texture_placeholder);
    var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});

    var image = new Image();
    image.onload = function () {
        texture.image = this;
        texture.needsUpdate = true;
    };
    image.src = path;

    return material;
}
// Zuschauer erstellen
function makeSpectator() {

    var zuschauerGeometry = new THREE.BoxGeometry(2.5, 5, 2.5);
    var zuschauerMaterial = new THREE.MeshLambertMaterial({color: 0x2E64FE});
    var zuschauer = new THREE.Mesh(zuschauerGeometry, zuschauerMaterial);

    zuschauer.position.z = 0;
    zuschauer.position.x = 0;
    zuschauer.position.y = 2.5;

    var halsGeometry = new THREE.BoxGeometry(1, 0.5, 1);
    var halsMaterial = new THREE.MeshLambertMaterial({color: 0xFFE5B2});
    var hals = new THREE.Mesh(halsGeometry, halsMaterial);

    hals.position.y = 5;


    var kopfGeometry = new THREE.BoxGeometry(2, 2, 2);
    var kopfMaterial = new THREE.MeshLambertMaterial({color: 0xFFE5B2});
    var kopf = new THREE.Mesh(kopfGeometry, kopfMaterial);

    kopf.position.y = 6.25;


    var armGeometry = new THREE.BoxGeometry(2.5, 4, 0.5);
    var armMaterial = new THREE.MeshLambertMaterial({color: 0xFFE5B2});
    var arm = new THREE.Mesh(armGeometry, armMaterial);

    arm.position.z = 1.5;
    arm.position.x = -1;
    arm.position.y = 5;


    var armlGeometry = new THREE.BoxGeometry(2.5, 4, 0.5);
    var armlMaterial = new THREE.MeshLambertMaterial({color: 0xFFE5B2});
    var arml = new THREE.Mesh(armlGeometry, armlMaterial);

    arml.position.z = -1.5;
    arml.position.x = 1;
    arml.position.y = 5;


    zuschauerObj = new THREE.Object3D();
    zuschauerObj.add(zuschauer);
    zuschauerObj.add(kopf);
    zuschauerObj.add(hals);
    zuschauerObj.add(arm);
    zuschauerObj.add(arml);
    zuschauerObj.scale.x *= 0.1;
    zuschauerObj.scale.y *= 0.1;
    zuschauerObj.scale.z *= 0.1;

    return zuschauerObj;
}

//Zuschauer vermehren 
function multiplySpectator(scene){
    
    for(var i=0; i<=40; i++){
        
        var zuschauer = makeSpectator();
        
        zuschauer.position.y = getRandomY();
        
        scene.add(zuschauer);
        
        zuschauerArray.push(zuschauer);
        
        var rnd = Math.random();
        if(rnd <= 0.5){
            zuschauerOrientation.push(true);
        }
        else{
            zuschauerOrientation.push(false);
        }
    }
}


function getRandomY(){
    return THREE.Math.randFloat(0, 1);
}

//Cube particles
var colorArray = new Array({color: 0xf2ff00}, {color: 0xff7200}, {color: 0xFF0000}, {color: 0x64FE2E}, {color: 0x0040FF});
var colorArrayIndex = 0;
var cubeIndex = 0;

var cubeObjectArray = new Array();

function CreateCube(cubeColor) {
    size = getRandomArbitrary(0.05, 0.15);
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
        endY: ((colorArrayIndex + 1) / 4) + cube.position.y
    });

    colorArrayIndex = (colorArrayIndex + 1) % 5;

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
