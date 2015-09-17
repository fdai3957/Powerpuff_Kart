var keyframesArray = new Array();

function fillKeyframesArray() {
    keyframesArray[0] = [0,0,0,0];
    pushToKeyFramesArray(kurvenKeyFrames(new Array(4, 0, -9), 4, Math.PI, keyframesArray[keyframesArray.length-1][3], 4, true));
    pushToKeyFramesArray(kurvenKeyFrames(new Array(6, 0, -6), 7, Math.PI/2, keyframesArray[keyframesArray.length-1][3], 4, true));
    pushToKeyFramesArray(kurvenKeyFrames(new Array(9, 0, -4), 4, 0, keyframesArray[keyframesArray.length-1][3], 4, true));
    pushToKeyFramesArray(kurvenKeyFrames(new Array(-9, 0, 4), 4, Math.PI, keyframesArray[keyframesArray.length-1][3], 4, false));
    pushToKeyFramesArray(kurvenKeyFrames(new Array(-6, 0, 6), 7, 3*Math.PI/2, keyframesArray[keyframesArray.length-1][3], 4, false));
    pushToKeyFramesArray(kurvenKeyFrames(new Array(-4, 0, 9), 4, 0, keyframesArray[keyframesArray.length-1][3], 4, false));
}

function pushToKeyFramesArray(array){
    for(var i = 0; i < array.length; i++){
        keyframesArray.push(array[i]);
    }
}

var positionArray = new Array();
var interpolationPointCount = 200;

function fillPositionArray() {
    for(var i = 0; i < keyframesArray.length; i++){
        var lastKeyframe = new Array();
        var nextKeyframe = new Array();
        
        for(var k = 0; k < keyframesArray[i].length; k++){
            lastKeyframe[k] = keyframesArray[i][k];
            nextKeyframe[k] = keyframesArray[(i+1)%keyframesArray.length][k];
        }
        
        positionArray.push(lastKeyframe);
        var inPC = interpolationPointCount*getKeyFrameSqrt(lastKeyframe, nextKeyframe);
        //console.log(inPC);
        for(var j = 1; j < inPC+1; j++){
            var x = lastKeyframe[0] + getPositionValue(lastKeyframe[0],nextKeyframe[0], inPC, j);
            var y = lastKeyframe[1] + getPositionValue(lastKeyframe[1],nextKeyframe[1], inPC, j);
            var z = lastKeyframe[2] + getPositionValue(lastKeyframe[2],nextKeyframe[2], inPC, j);
            var rot = lastKeyframe[3] + getPositionValue(lastKeyframe[3], nextKeyframe[3], inPC, j);
            
            positionArray.push([x,y,z, rot]);
        }
    }
}

function getPositionValue(lastKey, nextKey, intPC, n){
    return (((nextKey-lastKey)/intPC)*n);
}

function getKeyFrameSqrt(keyA1, keyA2){
    return Math.sqrt(Math.pow(keyA2[0]-keyA1[0],2)+Math.pow(keyA2[1]-keyA1[1],2)+Math.pow(keyA2[2]-keyA1[2],2));
}

function kurvenKeyFrames(mittelPunkt, radius, anfangsWinkel, anfangsRotation, anzahl, clockwise){
    var keyArray = new Array();
    var winkel = anfangsWinkel;
    var rotation = anfangsRotation;
    if(clockwise) {
        rotation += Math.PI/2;
    }
    //console.log("Anfang: " +rotation);
    for(var i = 0; i < anzahl+1; i++, winkel += (Math.PI/2)/anzahl){
        var array = new Array();
        array.push(mittelPunkt[0]+(Math.sin(winkel)*radius));
        array.push(0);
        array.push(mittelPunkt[2]+(Math.cos(winkel)*radius));
        //console.log(winkel + ", " +rotation);
        if(clockwise) {
            array.push(rotation);
            rotation -= (Math.PI/2)/anzahl;
        } 
        else{
            array.push(rotation);
            rotation -= (Math.PI/2)/anzahl;
        }
        keyArray.push(array);
        
    }
    
    if(clockwise) {
        var finalArray = new Array();
        for(var i = keyArray.length-1; i > -1; i--){
            finalArray.push(keyArray[i]);
        }

        return finalArray;
    }
    return keyArray;
}


//###########################################


//current Index in positionArray
var index = 0;

var carSpeed = 0;

function moveCar(car){
    car.position.x = positionArray[index][0];
    car.position.z = -positionArray[index][2];
    car.rotation.y = positionArray[index][3];
    
    if(Key.isDown(Key.UP) || Key.isDown(Key.SPACE)){
        index = (index + carSpeed) % positionArray.length;
        if(carSpeed < interpolationPointCount/5){
            carSpeed++;
        }
    }
    else {
        index = (index + carSpeed) % positionArray.length;
        if(carSpeed > 0){
            carSpeed--;
        }
    }
    
    //console.log(car.rotation.x + ", " + car.rotation.y + ", " + car.rotation.z);
    //console.log(car.position.x + ", " + car.position.z);
}

//###########################################

fillKeyframesArray();
fillPositionArray();

function logPositionArray() {
    for(var i = 0; i < positionArray.length; i++){
        var text = "i=" + i + "; ";
        for(var j = 0; j < positionArray[i].length; j++){
            text += positionArray[i][j] + ", ";
        }
        console.log(text);
    }
}
//logPositionArray();

function logKeyArray() {
    for(var i = 0; i < keyframesArray.length; i++){
        var text = "i=" + i + "; ";
        for(var j = 0; j < keyframesArray[i].length; j++){
            text += keyframesArray[i][j] + ", ";
        }
        console.log(text);
    }
}
logKeyArray();
//###########################################

var Key = {
    _pressed: {},

    SPACE: 32,
    UP: 38,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);




