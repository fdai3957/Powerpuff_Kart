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

    //Camera
    var cameraTarget = getCameraTarget(scene);

    //Kartbahn
    addKartbahn(scene);

    //Start/Ziel Objekt
    addStartZiel(scene);
    
    //Bäume
    addTrees(scene);
    
    //Steine
    addStones(scene);
    
    //Brunnen
    addFountain(scene);

    //Ground
    addGround(scene);

    //Tonnen
    addBarrels(scene);
    
    //Light
    addLight(scene);

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

    camera.lookAt(cameraTarget.position);

    //Skybox
    addSkybox(scene);

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
    
    SpawnFencesLinks(scene);
    SpawnFencesMitte(scene);
    SpawnFenceRechts(scene);
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


//### PARTIKEL-TONNEN ###

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
    $('#erklärung').css("display","none");
    $('#countdownAudio')[0].play();
    $('#autoAudio1')[0].play();
    $('#autoAudio2')[0].play();
}

