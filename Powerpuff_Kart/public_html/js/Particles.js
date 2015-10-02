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