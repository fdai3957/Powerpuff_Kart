var camera, scene, renderer;
	var geometry, material, mesh;
	var target = new THREE.Vector3();

	var lon = 90, lat = 0;
	var phi = 0, theta = 0;

	var touchX, touchY;

	init();
	animate();

	function init() {

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

            scene = new THREE.Scene();

            var sides = [
		{
		url: 'images/skybox_px.jpg',
		position: [ -512, 0, 0 ],
		rotation: [ 0, Math.PI / 2, 0 ]
		},
		{
		url: 'images/skybox_nx.jpg',
		position: [ 512, 0, 0 ],
		rotation: [ 0, -Math.PI / 2, 0 ]
		},
		{
		url: 'images/skybox_py.jpg',
		position: [ 0,  512, 0 ],
		rotation: [ Math.PI / 2, 0, Math.PI ]
		},
		{
		url: 'images/skybox_ny.jpg',
		position: [ 0, -512, 0 ],
		rotation: [ - Math.PI / 2, 0, Math.PI ]
		},
		{
		url: 'images/skybox_pz.jpg',
		position: [ 0, 0,  512 ],
		rotation: [ 0, Math.PI, 0 ]
		},
		{
		url: 'images/skybox_nz.jpg',
		position: [ 0, 0, -512 ],
		rotation: [ 0, 0, 0 ]
		}
		];

            for ( var i = 0; i < sides.length; i ++ ) {

                var side = sides[ i ];

                var element = document.createElement( 'img' );
                element.width = 1026; // 2 pixels extra to close the gap.
                element.src = side.url;

                var object = new THREE.CSS3DObject( element );
                object.position.fromArray( side.position );
                object.rotation.fromArray( side.rotation );
                scene.add( object );

            }

            renderer = new THREE.CSS3DRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );
                
            //window.addEventListener( 'resize', onWindowResize, false );
        }
                
        //function onWindowResize() {

        //camera.aspect = window.innerWidth / window.innerHeight;
        //camera.updateProjectionMatrix();

        //renderer.setSize( window.innerWidth, window.innerHeight );

        //}
                
        function animate() {

				

				lon +=  0.1;
				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );

				target.x = Math.sin( phi ) * Math.cos( theta );
				target.y = Math.cos( phi );
				target.z = Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( target );

				renderer.render( scene, camera );

			}
