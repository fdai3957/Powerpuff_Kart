$(function () {
    $('#autoAudio1')[0].volume = 0;
    $('#autoAudio2')[0].volume = 0;
    $('#zielAudio')[0].volume *= 0.6;
    
    windowHeight = 500, windowWidth = 800;

    var scene = new THREE.Scene();
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xdddddd);
    renderer.setSize(windowWidth, windowHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    //Camera
    var camera = getCamera(scene);

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
    
    //Skybox
    addSkybox(scene);
    
    //Zäune
    SpawnFencesLinks(scene);
    SpawnFencesMitte(scene);
    SpawnFenceRechts(scene);
    
    //Zuschauer
    zuschauerOrientation = [];
    zuschauerArray = [];
    multiplySpectator(scene);
    setSpectatorPosition();

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
    
    //Render Function
    render();
    function render() {
        if(car1 !== undefined){
            moveCar(car1, 1);
        }
        if(car2 !== undefined){
            moveCar(car2, 2);
        }
        
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

function OnStartButtonClick(){
    $('#startButton').remove();
    displayCountdown = true;
    $('#countdownText').css("display","inline");
    $('#erklärung').css("display","none");
    $('#countdownAudio')[0].play();
    $('#autoAudio1')[0].play();
    $('#autoAudio2')[0].play();
}

