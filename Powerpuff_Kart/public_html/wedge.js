/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createWegde(){
    var geo = new THREE.Geometry();
    
    geo.vertices.push(
        new THREE.Vector3(-4, 4, -3),
        new THREE.Vector3(4, 4, -3),
        new THREE.Vector3(0, 4, 3),
        new THREE.Vector3(-4, 4, -3),
        new THREE.Vector3(-4, -4, -3),
        new THREE.Vector3(0, -4, 3),
        new THREE.Vector3(0, 4, 3),
        new THREE.Vector3(0, -4, 3),
        new THREE.Vector3(4, -4, -3),
        new THREE.Vector3(-4, -4, -3),
        new THREE.Vector3(4, -4, -3),
        new THREE.Vector3(4, 4, -3)
    );
    
    var mat = new THREE.LineBasicMaterial({
        color: 0x33CC33
    });
    
    return new THREE.Line(geo, mat);
}

