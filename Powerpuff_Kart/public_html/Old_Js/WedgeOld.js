/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createWedgeOld(id) {
    var iFSet = document.createElement("indexedFaceSet");
    var cPoint = document.createElement("coordinate");
    var shape = document.createElement("shape");
    var app = document.createElement("appearance");
    var mat = document.createElement("material");
    
    shape.appendChild(app);
    shape.appendChild(iFSet);
    app.appendChild(mat);
    iFSet.appendChild(cPoint);
    
    shape.setAttribute("id","W" + id + "shape");
    app.setAttribute("id", "W" + id + "appearance");
    mat.setAttribute("id", "W" + id + "material");
    
    mat.setAttribute("diffuseColor","green");
    
    cPoint.setAttribute("point","-4 4 -3, 4 4 -3, 0 4 3, -4 -4 -3, 4 -4 -3, 0 -4 3");
    
    //Dreieckseiten                  oben      vorne l     vorne r     hinten      unten
    iFSet.setAttribute("coordIndex","2 1 0 -1, 3 5 2 0 -1, 5 4 1 2 -1, 0 1 4 3 -1, 5 3 4 -1");   
    
    return shape;
}
