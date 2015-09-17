$(function(){
    var windowHeight = 600, windowWidth = 600;
    
   var scene = new THREE.Scene();
   var camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 500);
   var renderer = new THREE.WebGLRenderer();
   
   renderer.setClearColor(0xdddddd);
   renderer.setSize(windowWidth, windowHeight);
   renderer.shadowMapEnabled = true;
   renderer.shadowMapSoft = true;
   
   //var axis = new THREE.AxisHelper(10);
   //scene.add(axis);
   
   var grid = new THREE.GridHelper(20, 1);
   var color = new THREE.Color("rgb(255,0,0)");
   grid.setColors(color, 0x000000);
   scene.add(grid);
   
   var cubeGeometry = new THREE.BoxGeometry(1, 0.5, 2);
   var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff3300});
   var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
   
   cube.position.y = 0.25;
   cube.castShadow = true;
   
   scene.add(cube);
   
   var planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
   var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
   var plane = new THREE.Mesh(planeGeometry, planeMaterial); 
   
   plane.rotation.x = -0.5*Math.PI;
   plane.receiveShadow = true;
   
   scene.add(plane);
   
   var spotLight = new THREE.SpotLight(0xffffff);
   spotLight.castShadow = true;
   spotLight.position.set(30, 30, 50);
   
   scene.add(spotLight);
   
   cameraPivot = new THREE.Object3D();
   cameraPivot.add(camera);
   scene.add(cameraPivot);
   
   cameraPivot.position.x = 0;
   cameraPivot.position.y = 40;
   cameraPivot.position.z = 0;6
   cameraPivot.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI);
   cameraPivot.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0);
   
   camera.lookAt(cube.position);
   
   render();
   function render(){
       //cube.rotation.x += 0.1;
       //cube.rotation.y += 0.1;
       //cube.rotation.z += 0.1;
        moveCar(cube);
       
       requestAnimationFrame(render);
       renderer.render(scene, camera);
   }
   
   $("#webGL-container").append(renderer.domElement);
   renderer.render(scene, camera);
});