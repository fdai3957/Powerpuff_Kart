$(function () {
    $('#autoAudio1')[0].volume = 0;
    $('#autoAudio2')[0].volume = 0;
    $('#zielAudio')[0].volume *= 0.6;
    var windowHeight = 500, windowWidth = 800;

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

    var kartbahn = new THREE.Mesh();
    var kartbahnLoader = new THREE.JSONLoader(kartbahnManager);
    kartbahnLoader.load('models/KartbahnFertig1.json', function (geometry) {
        var tex = new THREE.ImageUtils.loadTexture('models/KartbahnFertig2.png');
        var material = new THREE.MeshBasicMaterial({map:tex});
        kartbahn = new THREE.Mesh(geometry, material);

        kartbahn.position.y += 0.1;
        kartbahn.scale.x *= 1.9;
        kartbahn.scale.z *= 1.9;

        scene.add(kartbahn);
    });

    //Start/Ziel Objekt
    var startZielManager = new THREE.LoadingManager();
    startZielManager.onProgress = function(item, loaded, total){
        console.log(item, loaded, total);
    };
    
    var startZiel = new THREE.Mesh();
    var startZielLoader = new THREE.JSONLoader(startZielManager);
    startZielLoader.load('models/StartZiel.json',function(geometry){
        var tex = new THREE.ImageUtils.loadTexture('models/StartZielTextur_1.png');
        var material = new THREE.MeshBasicMaterial({ map : tex} );
        startZiel = new THREE.Mesh(geometry, material); 
             
        
        startZiel.position.x = -0.5;
        startZiel.position.y += 6;
        startZiel.position.z = -5.5;
        startZiel.scale.x *= 0.3;
        startZiel.scale.y *= 0.3;
        startZiel.scale.z *= 0.3;
        startZiel.rotation.y = -0.5 * Math.PI;
        scene.add(startZiel);
    });

    //Car 1
    var car1Manager = new THREE.LoadingManager();
    car1Manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    var car1 = new THREE.Mesh();
    var car1Loader = new THREE.JSONLoader(car1Manager);
    car1Loader.load('models/AutoRot_v03.json', function (geometry, materials) {
        car1 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));

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

    var car2 = new THREE.Mesh();
    var car2Loader = new THREE.JSONLoader(car2Manager);
    car2Loader.load('models/AutoGruen_v03.json', function (geometry, materials) {
        car2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));

        car2.scale.x *= 0.2;
        car2.scale.z *= 0.2;
        car2.scale.y *= 0.2;
        car2.castShadow = true;

        scene.add(car2);
    });
 
    //Baum1
    var baum1Manager = new THREE.LoadingManager();
    baum1Manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
    };
    
    var baum1 = new THREE.Mesh();
    var loader = new THREE.JSONLoader(baum1Manager);
    loader.load('models/Baum1.json', function(geometry, materials) {
        baum1 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        
          baum1.position.x +=13;
          baum1.position.z +=11;
          baum1.position.y +=0;
          
          baum1.scale.x *= 0.8;
          baum1.scale.y *= 0.8;
          baum1.scale.z *= 0.8;
        
        scene.add(baum1);
    });
    
    
    //Baum2
    var baum2Manager = new THREE.LoadingManager();
    baum2Manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
    };
    
    var baum2 = new THREE.Mesh();
    var loader = new THREE.JSONLoader(baum2Manager);
    loader.load('models/Baum2.json', function(geometry, materials) {
        baum2 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        
          baum2.position.x -=13;
          baum2.position.z +=2;
          baum2.position.y +=0;
          
          baum2.scale.x *= 0.4;
          baum2.scale.y *= 0.4;
          baum2.scale.z *= 0.4;
        
        scene.add(baum2);
    });
    
    
    //Baum22
    var baum22Manager = new THREE.LoadingManager();
    baum22Manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
    };
    
    var baum22 = new THREE.Mesh();
    var loader = new THREE.JSONLoader(baum22Manager);
    loader.load('models/Baum2.json', function(geometry, materials) {
        baum22 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        
          baum22.position.x +=4;
          baum22.position.z -=12;
          baum22.position.y +=0;
          
          baum22.scale.x *= 0.4;
          baum22.scale.y *= 0.4;
          baum22.scale.z *= 0.4;
        
        scene.add(baum22);
    });
    
    
    //Baum3
    var baum3Manager = new THREE.LoadingManager();
    baum3Manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
    };
    
    var baum3 = new THREE.Mesh();
    var loader = new THREE.JSONLoader(baum3Manager);
    loader.load('models/Baum3.json', function(geometry, materials) {
        baum3 = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        
          baum3.position.x -=6;
          baum3.position.z -=9;
          baum3.position.y +=0;

          baum3.scale.x *= 0.8;
          baum3.scale.y *= 0.8;
          baum3.scale.z *= 0.8;
          
        baum3.rotation.y = 0.5*Math.PI;
        
        scene.add(baum3);
    });
    
    //SteinDunkel
    var steinManager = new THREE.LoadingManager();
    steinManager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
    };
    
    var steinDunkel = new THREE.Mesh();
    var loader = new THREE.JSONLoader(steinManager);
    loader.load('models/SteinDunkel.json', function(geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0x363636});
        steinDunkel = new THREE.Mesh(geometry, material);
        
        steinDunkel.position.x -= 5;
        steinDunkel.position.z -= 8;
        steinDunkel.position.y +=0;
        
        steinDunkel.scale.x *= 0.3;
        steinDunkel.scale.y *= 0.3;
        steinDunkel.scale.z *= 0.3;
        
        scene.add(steinDunkel);
    });
    
    //SteinHell
    var steinHellManager = new THREE.LoadingManager();
    steinHellManager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
    };
    
    var steinHell = new THREE.Mesh();
    var loader = new THREE.JSONLoader(steinHellManager);
    loader.load('models/SteinHell.json', function(geometry, materials) {
        steinHell = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        
          steinHell.position.x +=3;
          steinHell.position.z -=5;
          steinHell.position.y +=0;

          steinHell.scale.x *= 0.3;
          steinHell.scale.y *= 0.3;
          steinHell.scale.z *= 0.3;
        
        scene.add(steinHell);
    });
    
    
    //SteinMittel
    var steinMittelManager = new THREE.LoadingManager();
    steinMittelManager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
    };
    
    var steinMittel = new THREE.Mesh();
    var loader = new THREE.JSONLoader(steinHellManager);
    loader.load('models/SteinMittel.json', function(geometry, materials) {
        steinMittel = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        
          steinMittel.position.x -=12;
          steinMittel.position.z +=0;
          steinMittel.position.y +=0;

          steinMittel.scale.x *= 0.3;
          steinMittel.scale.y *= 0.3;
          steinMittel.scale.z *= 0.3;
        
        scene.add(steinMittel);
    });
    

    //Ground
    var planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0x4B8A08});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;

    scene.add(plane);
    
    var planeGrauGeometry = new THREE.PlaneGeometry(10, 10, 10);
    var planeGrauMaterial = new THREE.MeshLambertMaterial({color: 0x585858});
    var planeGrau = new THREE.Mesh(planeGrauGeometry, planeMaterial);
    
    planeGrau.rotation.x = -0.5 * Math.PI;
    planeGrau.receiveShadow = true;
    planeGrau.position.x = -9;
    planeGrau.position.z = 8;
    planeGrau.position.y = 0.1;
    scene.add(planeGrau);

    var tonne1Manager = new THREE.LoadingManager();
    tonne1Manager.onProgress = function(item, loaded, total){
        console.log(item, loaded, total);
    };

    var tonne1 = new THREE.Mesh();
    var tonne1loader = new THREE.JSONLoader(tonne1Manager);
    tonne1loader.load('models/Tonne.json', function (geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0x3d3d3d});
        tonne1 = new THREE.Mesh(geometry, material);

        tonne1.position.x += 3.5;
        tonne1.position.z += 3;
        
        tonne1.scale.x *= 0.5;
        tonne1.scale.y *= 0.5;
        tonne1.scale.z *= 0.5;

        scene.add(tonne1);
    });
    
    var tonne2Manager = new THREE.LoadingManager();
    tonne2Manager.onProgress = function(item, loaded, total){
        console.log(item, loaded, total);
    };

    var tonne2 = new THREE.Mesh();
    var tonne2loader = new THREE.JSONLoader(tonne2Manager);
    tonne2loader.load('models/Tonne.json', function (geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0x3d3d3d});
        tonne2 = new THREE.Mesh(geometry, material);

        tonne2.position.x -= 3.5;
        tonne2.position.z += 3;
        
        tonne2.scale.x *= 0.5;
        tonne2.scale.y *= 0.5;
        tonne2.scale.z *= 0.5;

        scene.add(tonne2);
    });

    var cubeObjectCallbackLeft = function (element, index, array) {
        if (element.cube.position.y < element.endY) {
            element.cube.position.y += 0.05;
        }
        else {
            scene.remove(element.cube);

            cubeObjectArrayLeft.splice(index, 1);
        }
    };
    
    var cubeObjectCallbackRight = function (element, index, array) {
        if (element.cube.position.y < element.endY) {
            element.cube.position.y += 0.05;
        }
        else {
            scene.remove(element.cube);

            cubeObjectArrayRight.splice(index, 1);
        }
    };

    zuschauerOrientation = [];
    zuschauerArray = [];
    multiplySpectator(scene);
    setSpectatorPosition();

    //Light
    var spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.castShadow = true;
    spotLight.position.set(-1.7,40, -30);

    scene.add(spotLight);

    

    //Camera Position
    cameraPivot = new THREE.Object3D();
    cameraPivot.add(camera);
    scene.add(cameraPivot);

    cameraPivot.position.x = -1.7;
    cameraPivot.position.y = 15;
    cameraPivot.position.z = -30;
    cameraPivot.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/2.05);
    cameraPivot.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/1.6);
    cameraPivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI/40);

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

    countdownStart = null;
    displayCountdown = false;
    var setTime = false;
    var updateCountdownText  = function()
    {
        if(!setTime){
            countdownStart = new Date();
            setTime = true;
        }
        var now = new Date();
        if(now.getTime() - countdownStart < 1000){
            $('#countdownText').text("3");
        }
        else if(now.getTime() - countdownStart < 2000){
            $('#countdownText').text("2");
        }
        else if(now.getTime() - countdownStart < 3000){
            $('#countdownText').text("1");
        }
        else{
            $('#countdownText').css("display","none");
            displayCountdown = false;
        }
    };

    resetButtonDisplayed = false;

    SpawnFences(scene);
    
    //Render Function
    render();
    function render() {
        moveCar(car1, 1);
        moveCar(car2, 2);
        
        movementSpectator();
        
        if (cubeObjectArrayLeft.length < 200 && spawnCubes) {
            scene.add(SpawnCubesLeft());
            scene.add(SpawnCubesLeft());
        }
        
        if (cubeObjectArrayRight.length < 200 && spawnCubes) {
            scene.add(SpawnCubesRight());
            scene.add(SpawnCubesRight());
        }
        
        if(displayCountdown){
            updateCountdownText();
        }
        
        controlAutoAudio();
        
        cubeObjectArrayLeft.forEach(cubeObjectCallbackLeft);
        cubeObjectArrayRight.forEach(cubeObjectCallbackRight);
        
        if(!resetButtonDisplayed && car1Finished && car2Finished){
            $('#resetButton').css("display","inline");
        }
        
        
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


    var armGeometry = new THREE.BoxGeometry(1, 4, 0.5);
    var armMaterial = new THREE.MeshLambertMaterial({color: 0xFFE5B2});
    var arm = new THREE.Mesh(armGeometry, armMaterial);

    arm.position.z = 1.5;
    arm.position.x = 0;
    arm.position.y = 5;


    var armlGeometry = new THREE.BoxGeometry(1, 4, 0.5);
    var armlMaterial = new THREE.MeshLambertMaterial({color: 0xFFE5B2});
    var arml = new THREE.Mesh(armlGeometry, armlMaterial);

    arml.position.z = -1.5;
    arml.position.x = 0;
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
    zuschauerObj.position.x = -5;
    zuschauerObj.position.z = 5;
    zuschauerObj.rotation.y = Math.PI/2;

    return zuschauerObj;
}

//Zuschauer vermehren 
function multiplySpectator(scene){
    
    for(var i=0; i<81; i++){
        
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

function setSpectatorPosition(){
    var locationArray = [];
    for(var i = -5; i > -14;i--){
        for(var j = 4; j < 13; j++){
            locationArray.push([i,j]);
        }
    }
    
    for(var i = 0; i < zuschauerArray.length;i++){
        zuschauerArray[i].position.x = locationArray[i][0];
        zuschauerArray[i].position.z = locationArray[i][1];
    }
}

//zufälliger Y-Wert für Zuschauerposition
function getRandomY(){
    return THREE.Math.randFloat(0, 0.5);
}

//Zuschauer Bewegung
function movementSpectator(){
    if(!spawnCubes){
        var jumpSpeed = 0.05;
        var maxY = 0.5;
    }
    else{
        var jumpSpeed = 0.075;
        var maxY = 0.75;
    }
    
    for( var i=0; i < zuschauerArray.length; i++){
        
        //true = up, false = down
        if(zuschauerOrientation[i]){
            zuschauerArray[i].position.y += jumpSpeed;
            if(zuschauerArray[i].position.y >= maxY){
                zuschauerOrientation[i] = false;
            }
        }
        else{
            zuschauerArray[i].position.y -= jumpSpeed;
            if(zuschauerArray[i].position.y <= 0){
                zuschauerOrientation[i] = true;
            }
        }
    }
}




//### PARTIKEL-TONNEN ###>

//Cube particles
var colorArray = new Array({color: 0xf2ff00}, {color: 0xff7200}, {color: 0xFF0000}, {color: 0x64FE2E}, {color: 0x0040FF});
var colorArrayIndex = 0;
var cubeLeftIndex = 0;
var cubeRightIndex = 0;

var cubeObjectArrayLeft = new Array();
var cubeObjectArrayRight = new Array();

spawnCubes = false;

function CreateCube(cubeColor) {
    size = getRandomArbitrary(0.05, 0.15);
    var cubeGeometry = new THREE.BoxGeometry(size, size, size);
    var cubeMaterial = new THREE.MeshLambertMaterial(cubeColor);
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
}

function SpawnCubesLeft() {
    var cube = CreateCube(colorArray[colorArrayIndex]);

    cube.position.y = 1.3;
    cube.position.x = 3.5 + getRandomPosition();
    cube.position.z = 3 + getRandomPosition();
    cube.name = "cube" + (cubeLeftIndex++);

    cubeObjectArrayLeft.push({
        cube: cube,
        endY: ((colorArrayIndex + 1) / 4) + cube.position.y
    });

    colorArrayIndex = (colorArrayIndex + 1) % 5;

    return cube;
}

function SpawnCubesRight() {
    var cube = CreateCube(colorArray[colorArrayIndex]);

    cube.position.y = 1.3;
    cube.position.x = -3.5 + getRandomPosition();
    cube.position.z = 3 + getRandomPosition();
    cube.name = "cube" + (cubeRightIndex++);

    cubeObjectArrayRight.push({
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
    return getRandomArbitrary(0, 0.35) * vorzeichen;
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function OnStartButtonClick(){
    $('#startButton').remove();
    displayCountdown = true;
    $('#countdownText').css("display","inline");
    $('#countdownAudio')[0].play();
    $('#autoAudio1')[0].play();
    $('#autoAudio2')[0].play();
}

function makeFence(){
    
    var balkenGeometry = new THREE.BoxGeometry(0.5, 1, 7);
    var balkenMaterial = new THREE.MeshLambertMaterial({color: 0x3B240B});
    var balken = new THREE.Mesh(balkenGeometry, balkenMaterial);
    
    balken.position.y = 10;
    
    
    var balken1Geometry = new THREE.BoxGeometry(0.5, 1, 7);
    var balken1Material = new THREE.MeshLambertMaterial({color: 0x3B240B});
    var balken1 = new THREE.Mesh(balken1Geometry, balken1Material);
    
    balken1.position.y = 8;
    
    
    var balken2Geometry = new THREE.BoxGeometry(0.5, 7, 1);
    var balken2Material = new THREE.MeshLambertMaterial({color: 0x3B240B});
    var balken2 = new THREE.Mesh(balken2Geometry, balken2Material);
    
    balken2.position.z = -2;
    balken2.position.y = 8;
    
    
    var balken3Geometry = new THREE.BoxGeometry(0.5, 7, 1);
    var balken3Material = new THREE.MeshLambertMaterial({color: 0x3B240B});
    var balken3 = new THREE.Mesh(balken3Geometry, balken3Material);
    
    balken3.position.z = 2;
    balken3.position.y = 8;
    
    
    fence = new THREE.Object3D();
    
    fence.add(balken);
    fence.add(balken1);
    fence.add(balken2);
    fence.add(balken3);
   
    fence.position.y = 0;
    fence.position.z = 13;
    fence.scale.x *= 0.12;
    fence.scale.y *= 0.12;
    fence.scale.z *= 0.12;
    fence.rotation.y = Math.PI/2; 
    
    return fence;
}

function SpawnFences(scene){
    var startX = 13.9;
    for(var i = 0; i < 32; i++){
        var fence = makeFence();
        fence.position.x = startX;
        
        scene.add(fence);
        
        startX -= 0.9;
    }
}

