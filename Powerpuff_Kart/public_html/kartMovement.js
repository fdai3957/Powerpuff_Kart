var keyframesArray1 = new Array();
var keyframesArray2 = new Array();

function fillKeyframesArray() {
    keyframesArray1[0] = [1, 0, 0, 0];
    pushToKeyFramesArray1(kurvenKeyFrames(new Array(6, 0, -6), 5, Math.PI, keyframesArray1[keyframesArray1.length - 1][3], 4, true));
    pushToKeyFramesArray1(kurvenKeyFrames(new Array(6, 0, -6), 5, Math.PI / 2, keyframesArray1[keyframesArray1.length - 1][3], 4, true));
    pushToKeyFramesArray1(kurvenKeyFrames(new Array(6, 0, -6), 5, 0, keyframesArray1[keyframesArray1.length - 1][3], 4, true));
    pushToKeyFramesArray1(kurvenKeyFrames(new Array(-6, 0, 6), 7, Math.PI, keyframesArray1[keyframesArray1.length - 1][3], 4, false));
    pushToKeyFramesArray1(kurvenKeyFrames(new Array(-6, 0, 6), 7, 3 * Math.PI / 2, keyframesArray1[keyframesArray1.length - 1][3], 4, false));
    pushToKeyFramesArray1(kurvenKeyFrames(new Array(-6, 0, 6), 7, 0, keyframesArray1[keyframesArray1.length - 1][3], 4, false));
    keyframesArray2[0] = [-1, 0, 0, 0];
    pushToKeyFramesArray2(kurvenKeyFrames(new Array(6, 0, -6), 7, Math.PI, keyframesArray2[keyframesArray2.length - 1][3], 4, true));
    pushToKeyFramesArray2(kurvenKeyFrames(new Array(6, 0, -6), 7, Math.PI / 2, keyframesArray2[keyframesArray2.length - 1][3], 4, true));
    pushToKeyFramesArray2(kurvenKeyFrames(new Array(6, 0, -6), 7, 0, keyframesArray2[keyframesArray2.length - 1][3], 4, true));
    pushToKeyFramesArray2(kurvenKeyFrames(new Array(-6, 0, 6), 5, Math.PI, keyframesArray2[keyframesArray2.length - 1][3], 4, false));
    pushToKeyFramesArray2(kurvenKeyFrames(new Array(-6, 0, 6), 5, 3 * Math.PI / 2, keyframesArray2[keyframesArray2.length - 1][3], 4, false));
    pushToKeyFramesArray2(kurvenKeyFrames(new Array(-6, 0, 6), 5, 0, keyframesArray2[keyframesArray2.length - 1][3], 4, false));
}

function pushToKeyFramesArray1(array) {
    for (var i = 0; i < array.length; i++) {
        keyframesArray1.push(array[i]);
    }
}
function pushToKeyFramesArray2(array) {
    for (var i = 0; i < array.length; i++) {
        keyframesArray2.push(array[i]);
    }
}

var positionArray1 = new Array();
var positionArray2 = new Array();
var interpolationPointCount = 300;

function fillPositionArray1() {
    for (var i = 0; i < keyframesArray1.length; i++) {
        var lastKeyframe = new Array();
        var nextKeyframe = new Array();

        for (var k = 0; k < keyframesArray1[i].length; k++) {
            lastKeyframe[k] = keyframesArray1[i][k];
            nextKeyframe[k] = keyframesArray1[(i + 1) % keyframesArray1.length][k];
        }
        positionArray1.push(lastKeyframe);
        var inPC = interpolationPointCount * getKeyFrameSqrt(lastKeyframe, nextKeyframe);
        //console.log(inPC);
        for (var j = 1; j < inPC + 1; j++) {
            var x = lastKeyframe[0] + getPositionValue(lastKeyframe[0], nextKeyframe[0], inPC, j);
            var y = lastKeyframe[1] + getPositionValue(lastKeyframe[1], nextKeyframe[1], inPC, j);
            var z = lastKeyframe[2] + getPositionValue(lastKeyframe[2], nextKeyframe[2], inPC, j);
            var rot = lastKeyframe[3] + getPositionValue(lastKeyframe[3], nextKeyframe[3], inPC, j);

            positionArray1.push([x, y, z, rot]);
        }
    }
}

function fillPositionArray2() {
    for (var i = 0; i < keyframesArray2.length; i++) {
        var lastKeyframe = new Array();
        var nextKeyframe = new Array();

        for (var k = 0; k < keyframesArray2[i].length; k++) {
            lastKeyframe[k] = keyframesArray2[i][k];
            nextKeyframe[k] = keyframesArray2[(i + 1) % keyframesArray2.length][k];
        }
        positionArray2.push(lastKeyframe);
        var inPC = interpolationPointCount * getKeyFrameSqrt(lastKeyframe, nextKeyframe);
        //console.log(inPC);
        for (var j = 1; j < inPC + 1; j++) {
            var x = lastKeyframe[0] + getPositionValue(lastKeyframe[0], nextKeyframe[0], inPC, j);
            var y = lastKeyframe[1] + getPositionValue(lastKeyframe[1], nextKeyframe[1], inPC, j);
            var z = lastKeyframe[2] + getPositionValue(lastKeyframe[2], nextKeyframe[2], inPC, j);
            var rot = lastKeyframe[3] + getPositionValue(lastKeyframe[3], nextKeyframe[3], inPC, j);

            positionArray2.push([x, y, z, rot]);
        }
    }
}

function getPositionValue(lastKey, nextKey, intPC, n) {
    return (((nextKey - lastKey) / intPC) * n);
}

function getKeyFrameSqrt(keyA1, keyA2) {
    return Math.sqrt(Math.pow(keyA2[0] - keyA1[0], 2) + Math.pow(keyA2[1] - keyA1[1], 2) + Math.pow(keyA2[2] - keyA1[2], 2));
}

function kurvenKeyFrames(mittelPunkt, radius, anfangsWinkel, anfangsRotation, anzahl, clockwise) {
    var keyArray = new Array();
    var winkel = anfangsWinkel;
    var rotation = anfangsRotation;
    if (clockwise) {
        rotation += Math.PI / 2;
    }
    //console.log("Anfang: " +rotation);
    for (var i = 0; i < anzahl + 1; i++, winkel += (Math.PI / 2) / anzahl) {
        var array = new Array();
        array.push(mittelPunkt[0] + (Math.sin(winkel) * radius));
        array.push(0);
        array.push(mittelPunkt[2] + (Math.cos(winkel) * radius));
        //console.log(winkel + ", " +rotation);
        if (clockwise) {
            array.push(rotation);
            rotation -= (Math.PI / 2) / anzahl;
        }
        else {
            array.push(rotation);
            rotation -= (Math.PI / 2) / anzahl;
        }
        keyArray.push(array);

    }

    if (clockwise) {
        var finalArray = new Array();
        for (var i = keyArray.length - 1; i > -1; i--) {
            finalArray.push(keyArray[i]);
        }

        return finalArray;
    }
    return keyArray;
}

fillKeyframesArray();
fillPositionArray1();
fillPositionArray2();


//###########################################

//Zeitmessung
var startDate = new Date();
startzeit = startDate.getTime();

var runde1 = 0;
var runde2 = 0;
var lastIndex1 = 0;
var lastIndex2 = 0;


//##########################################

//current Index in positionArray
var index1 = 0;
var index2 = 0;

var carSpeed1 = 0;
var carSpeed2 = 0;

var mayDrive1 = false;
var mayDrive2 = false;

var playZielAudio = true;

carMaxSpeed = interpolationPointCount / 5;

function moveCar(car, number) {
    switch (number) {
        case 1:
            lastIndex1 = index1;

            car.position.x = positionArray1[index1][0];
            car.position.z = -positionArray1[index1][2];
            car.rotation.y = positionArray1[index1][3];

            if (Key.isDown(Key.UP) && mayDrive1) {
                index1 = (index1 + carSpeed1) % positionArray1.length;
                if (carSpeed1 < carMaxSpeed) {
                    carSpeed1++;
                }
            }
            else {
                index1 = (index1 + carSpeed1) % positionArray1.length;
                if (carSpeed1 > 0) {
                    carSpeed1--;
                }
            }
            if (lastIndex1 > positionArray1.length * 0.9 && index1 < positionArray1.length / 10) {
                runde1++;
                console.log("Runde: " + runde1);
            }
            break;
        case 2:
            lastIndex2 = index2;

            car.position.x = positionArray2[index2][0];
            car.position.z = -positionArray2[index2][2];
            car.rotation.y = positionArray2[index2][3];

            if (Key.isDown(Key.SPACE) && mayDrive2) {
                index2 = (index2 + carSpeed2) % positionArray2.length;
                if (carSpeed2 < carMaxSpeed) {
                    carSpeed2++;
                }
            }
            else {
                index2 = (index2 + carSpeed2) % positionArray2.length;
                if (carSpeed2 > 0) {
                    carSpeed2--;
                }
            }
            if (lastIndex2 > positionArray2.length * 0.9 && index2 < positionArray2.length / 10) {
                runde2++;
                console.log("Runde: " + runde2);
            }
            break;


    }

    var timeDiv1 = document.getElementById("time1");
    var timeDiv2 = document.getElementById("time2");

    if (runde1 === 3 || runde2 === 3) {
        var zeitNow = new Date();
        var zeit = zeitNow.getTime() - startzeit;
        if(runde1 === 3 && mayDrive1){
            mayDrive1 = false;
            timeDiv1.innerHTML = "Spieler Rot hatte eine Zeit von " + zeit/1000 + " sec";
            console.log("Spieler 1 hatte eine Zeit von " + zeit/1000 + " sec");
        }
        if(runde2 === 3 && mayDrive2){
            mayDrive2 = false;
            timeDiv2.innerHTML = "Spieler Grün hatte eine Zeit von " + zeit/1000 + " sec";
            console.log("Spieler 2 hatte eine Zeit von " + zeit/1000 + " sec");
        }
        if(playZielAudio){
            playZielAudio = false;
            document.getElementById("zielAudio").play();
        }
    }
    //console.log(car.rotation.x + ", " + car.rotation.y + ", " + car.rotation.z);
    //console.log(car.position.x + ", " + car.position.z);
}

//###########################################



function logPositionArray() {
    for (var i = 0; i < positionArray1.length; i++) {
        var text = "i=" + i + "; ";
        for (var j = 0; j < positionArray1[i].length; j++) {
            text += positionArray1[i][j] + ", ";
        }
        //console.log(text);
    }
}
//logPositionArray();

function logKeyArray() {
    for (var i = 0; i < keyframesArray1.length; i++) {
        var text = "i=" + i + "; ";
        for (var j = 0; j < keyframesArray1[i].length; j++) {
            text += keyframesArray1[i][j] + ", ";
        }
        //console.log(text);
    }
}
logKeyArray();
//###########################################

var Key = {
    _pressed: {},
    SPACE: 32,
    UP: 38,
    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
    },
    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
    }
};

window.addEventListener('keyup', function (event) {
    Key.onKeyup(event);
}, false);
window.addEventListener('keydown', function (event) {
    Key.onKeydown(event);
}, false);



//AUDIO
function OnCountdownEnded(){
    mayDrive1 = true;
    mayDrive2 = true;
}

var audio1playing = true;
var audio2playing = true;
function controlAutoAudio(){
    if(carSpeed1/carMaxSpeed > 0 && !audio1playing){
       $('#autoAudio1')[0].play();
    }
    if(carSpeed2/carMaxSpeed > 0 && !audio2playing){
       $('#autoAudio2')[0].play();
    }
    $('#autoAudio1')[0].volume = carSpeed1/carMaxSpeed;
    $('#autoAudio2')[0].volume = carSpeed2/carMaxSpeed;
    if(carSpeed1 === 0){
       $('#autoAudio1')[0].pause();
       audio1playing = false;
    }
    if(carSpeed2 === 0){
       $('#autoAudio2')[0].pause(); 
       audio2playing = false;
    }
}



