var box = document.getElementById("box");
var startButton1 = document.getElementById("start1");
var trans = document.getElementById("trans");

//###########################################

var keyframesArray = new Array();

function fillKeyframesArray() {
    keyframesArray[0] = [0,0,0];
    keyframesArray[1] = [0,0,-9];
    keyframesArray[2] = [1,0,-11];
    keyframesArray[3] = [2,0,-12];
    keyframesArray[4] = [4,0,-13];
    keyframesArray[5] = [6,0,-13];
    keyframesArray[6] = [10,0,-12];
    keyframesArray[7] = [12,0,-10];
    keyframesArray[8] = [13,0,-6];
    keyframesArray[9] = [13,0,-4];
    keyframesArray[10] = [12,0,-2];
    keyframesArray[11] = [11,0,-1];
    keyframesArray[12] = [9,0,0];
    keyframesArray[13] = [0,0,0];
    keyframesArray[14] = [-9,0,0];
    keyframesArray[15] = [-11,0,1];
    keyframesArray[16] = [-12,0,2];
    keyframesArray[17] = [-13,0,4];
    keyframesArray[18] = [-13,0,6];
    keyframesArray[19] = [-12,0,10];
    keyframesArray[20] = [-10,0,12];
    keyframesArray[21] = [-6,0,13];
    keyframesArray[22] = [-4,0,13];
    keyframesArray[23] = [-2,0,12];
    keyframesArray[24] = [-1,0,11];
    keyframesArray[25] = [0,0,9];
}

var positionArray = new Array();
var interpolationPointCount = 20;

function fillPositionArray() {
    for(var i = 0; i < keyframesArray.length; i++){
        var lastKeyframe = new Array();
        var nextKeyframe = new Array();
        
        for(var k = 0; k < keyframesArray[i].length; k++){
            lastKeyframe[k] = keyframesArray[i][k];
            nextKeyframe[k] = keyframesArray[(i+1)%keyframesArray.length][k];
        }
        
        positionArray.push(lastKeyframe);
        for(var j = 1; j < interpolationPointCount+1; j++){
            var x = lastKeyframe[0] + getPositionValue(lastKeyframe[0],nextKeyframe[0], interpolationPointCount, j);
            var y = lastKeyframe[1] + getPositionValue(lastKeyframe[1],nextKeyframe[1], interpolationPointCount, j);
            var z = lastKeyframe[2] + getPositionValue(lastKeyframe[2],nextKeyframe[2], interpolationPointCount, j);
            
            positionArray.push([x,y,z]);
        }
    }
}

function getPositionValue(lastKey, nextKey, intPC, n){
    return (((nextKey-lastKey)/intPC)*n);
}

//###########################################

var moving = false;
var id;

startButton1.onclick = function() {
    if(moving) {
        clearInterval(id);
        moving = false;
    }
    else {
        id = setInterval(moveCar, 20);
        moving = true;
    }
};

//current Index in positionArray
var index = 0;

function moveCar(){
    var text = positionArray[index][0] + "," + positionArray[index][1] + "," + positionArray[index][2];
    trans.setAttribute("translation",text);
    index = (index + 1) % positionArray.length;
    console.log(text);
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