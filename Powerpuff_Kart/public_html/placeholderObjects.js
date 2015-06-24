/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function carBox(){
    var geo = new THREE.BoxGeometry(1, 0.5, 2);
    var mat = new THREE.MeshLambertMaterial({ color: 0x3333FF });
    var box = new THREE.Mesh(geo, mat);
    box.castShadow = true;
    
    return box;
}
