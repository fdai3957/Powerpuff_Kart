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
        new THREE.Vector3(-4, -4, -3),
        new THREE.Vector3(4, -4, -3),
        new THREE.Vector3(0, -4, 3)
    );
    
    geo.faces.push(
        new THREE.Face3(2, 1, 0), 
        new THREE.Face3(3, 5, 2),
        new THREE.Face3(3, 2, 0),
        new THREE.Face3(5, 4, 1),
        new THREE.Face3(5, 1, 2),
        new THREE.Face3(0, 1, 4),
        new THREE.Face3(0, 4, 3),
        new THREE.Face3(5, 3, 4)
    );
    
    var mat = new THREE.LineBasicMaterial({
        color: 0x33CC33
    });
    
    var mat2 = new THREE.MeshPhongMaterial({ 
        color: 0x33CC33,
        emissive: 0x000000,
        specular: 0x111111,
        shininess: 30,
        shading: THREE.FlatShading,
        
    });
    
    return new THREE.Mesh(geo, mat2);
}

