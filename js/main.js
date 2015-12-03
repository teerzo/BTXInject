// Three.js 
// Kyle McArthur

var mirrorSphereCamera;
var mirror_sphere;
var skybox_object;		


// Loaded object array 
var object_list = [];		
var meshes = [];
var json_object_list;	
// Raycaster variables
var mouse = new THREE.Vector2();	
var raycaster;		
var INTERSECTED;		
var SELECTED;	
var offset = new THREE.Vector3();
var raycast_timer = 0.0;

// touch flag variables for use intead of preventdefault event 
var touch_start = false;
var touch_move = false;
var touch_end = false;
var background_press = false;
var plane_moved = false;

// $$$ unused varibles delete if not implemented later 
var bool_click;		
var bool_drag;	

// Global button variables 
var bool_select_all = true;
var bool_display_all = true;
var bool_lock_all = true;

// Rotate camera 
var rotate_camera = false;
var camera_old_position = new THREE.Vector3();
var camera_old_target = new THREE.Vector3();
var rotate_timer = 0.0;
var rotate_speed = 0.5;

// Rotate light 
var rotate_light = false;
var light_old_position = new THREE.Vector3();
var light_old_target = new THREE.Vector3();
var lightHelper;

var x_offset;
var y_offset;

// BTX INJECT SPECIFIC

var injection_lines = [];
var injection_sprites = [];
var injection_points = [];
var injection_count  = 10;

var inject_input;
var inject_value;

function ObjectLoad(object, index, self ) {
	object.traverse(function(child) 
	{
		if(child instanceof THREE.Mesh) {
		// set mesh name and material
			child.material = object_list[index].material;
			child.name = json_object_list[index].name;
			object.mesh = child;
		}
	});	
	// Sets object3d name and object
	object.name = json_object_list[index].name;
	object.userData = { is_selected: false, is_visible: true, is_locked: false };
	object_list[index].object = object;

	self.scene.add( object );
	meshes.push(object.mesh);
	
	//AddObjectButtons(index);
}
function ObjectLoadCallBack(  index, self ) {
	return function(object)	{
		ObjectLoad(object, index, self);
	}	
}

var Engine = { 
	// Threejs core
	scene: null, camera: null, renderer: null, controls: null, clock: null, stats: null, 
	// Dom elements 
	container:null, div_ui:null, div_target: null, 
	// lights
	directional_light:null, ambient_light:null, 
	// timers 
	delta_time:null,
	// screen variables
	screenWidth: 0, screenHeight: 0, 
	// engine wide bools
	isLoaded:null, isInitalized : false, isActive : false, isResizeEnabled: true, 
	isLightEnabled: true,
	// ui buttons 
	buttonOpacity:null, opacityValue: 0,
	// Camera Variables
	cameraDefaultPosition: null,  cameraDefaultTargetPosition: null,
	cameraUpdateSpeed:0, cameraLerpPosition:null, isCameraLerping: false,
	// Camera Rotate Variables
	isCameraRotate: false, timerCameraRotate: 0.0,  cameraRotateSpeed: 0.5,
	cameraLastPosition: null, cameraLastTarget: null,
	cameraTargetPosition:null,

	// Inject code 
	inject_mode: false,	inject_sphere: null,

	Init : function() { 

		this.isLoaded = false;
		this.isInitalized = false;
		this.isActive = false;
		// Scene
		//this.container = document.getElementById("container");
		this.container = document.createElement('div');
		document.body.appendChild(this.container);

		this.container.style.zIndex = 0;
		this.container.style.position = "absolute";
		this.container.style.top = "29.5%";
		this.container.style.left  = "60.4%";

		this.scene = new THREE.Scene();
		x_offset = 0.35;
		//x_offset = 0.5;
		this.screenWidth = window.innerWidth * x_offset;
		y_offset = 0.65;
		//y_offset = 0.5;
		this.screenHeight =window.innerHeight * y_offset;

		// Camera
		var VIEW_ANGLE = 45;
		var ASPECT = this.screenWidth/this.screenHeight;
		var NEAR = 0.1;
		var FAR = 10000;
		this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);
		this.scene.add(this.camera);
		this.camera.position.set(0,5,5)
		this.camera.lookAt(new THREE.Vector3(0,20,0));
		
		// Renderer
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		this.renderer.setSize(this.screenWidth,this.screenHeight);
		this.renderer.setClearColor(0xffffff);
		this.renderer.setPixelRatio( window.devicePixelRatio );

		// html container		
		//this.container = document.createElement('div');
		
		//document.getElementById("container");
		//this.container.id = "container"
		//document.body.appendChild(this.container);
		this.container.appendChild(this.renderer.domElement);

		// shadow map
		//this.renderer.shadowMapEnabled = true;
		//this.renderer.shadowMapSoft = true;

		// Time/Clock
		this.clock = new THREE.Clock();

		// Stats / fps counter
		stats = new Stats();
		stats.setMode(0);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = this.container.style.left;
		stats.domElement.style.top = this.container.style.top;	
		//document.body.appendChild( stats.domElement );

		// Controls
		this.controls = new THREE.OrbitControls(this.camera, this.container);
		this.controls.target = new THREE.Vector3(0,0,0);

		// Lights
		//ambient_light = new THREE.AmbientLight( 0xffffff ); // soft white light
		ambient_light = new THREE.AmbientLight( 0x404040 ); // soft white light
		this.scene.add( ambient_light );
		this.directional_light = new THREE.DirectionalLight(0xffffff, 1);
		this.directional_light.position.set(0,5,10);
		this.scene.add(this.directional_light);

		// Helpers
		lightHelper = new THREE.DirectionalLightHelper(this.directional_light, 2); // 50 is helper size
		//this.scene.add(lightHelper);		
		var axisHelper = new THREE.AxisHelper(800);
		//this.scene.add(axisHelper);

		// Raycaster
		raycaster = new THREE.Raycaster();


		this.opacityValue = 0;
		// Camera Variables
		this.cameraDefaultPosition = new THREE.Vector3(0,0,10);
		this.cameraDefaultTargetPosition = new THREE.Vector3(0,2,0);
		this.cameraUpdateSpeed = 1.0;
		this.cameraLerpPosition = new THREE.Vector3();
		this.isCameraLerping = false;
	// Camera Rotate Variables
		this.isCameraRotate = false; 
		this.timerCameraRotate = 0.0;
		this.cameraRotateSpeed = 1.0;
		this.cameraLastPosition = new THREE.Vector3();
	 	this.cameraLastTarget = new THREE.Vector3();
		this.cameraTargetPosition = new THREE.Vector3();


	 	this.controls.enabled = true;
		this.isCameraRotate = false;
		this.container.style.cursor = 'auto';

		this.cameraTargetPosition.copy( this.cameraDefaultTargetPosition );
		this.camera.position.copy( this.cameraDefaultPosition );
		this.controls.target.copy( this.cameraTargetPosition );	

		// Cubemap/skybox for reflections 
		var cubemap_path = [
		'textures/posx.jpg',
		'textures/negx.jpg',
		'textures/posy.jpg',
		'textures/negy.jpg',
		'textures/posz.jpg',
		'textures/negz.jpg',
		];
		var cubemap = THREE.ImageUtils.loadTextureCube(cubemap_path);
		var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"];
		test_cubemap = [ ];
		for(var i =0;i < 6; i++) {
			test_cubemap.push(
				new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture( 'textures/'+directions[i]+'.jpg'),
					side: THREE.BackSide
				}));
		}			
		material = new THREE.MeshFaceMaterial(test_cubemap);
		skybox_object = new THREE.Mesh( new THREE.BoxGeometry( 6000, 6000, 6000 ), material );
		//this.scene.add( skybox_object );		

		// Texture loading
		var grid_diff = THREE.ImageUtils.loadTexture('textures/grid.png');	
		
		// Materials
		var grid_mat = new THREE.MeshPhongMaterial({map:grid_diff });
		var sphere_mat = new THREE.MeshLambertMaterial({color: 0xeeff00 });
		
		// Reflection Mirror sphere	
		mirrorSphereCamera = new THREE.CubeCamera( 0.1, 5000, 512 );
		//this.scene.add( mirrorSphereCamera );
		var mirror_sphere_mat = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget } );
		
		// Mesh Loading 
		var mirror_sphere_geo = new THREE.SphereGeometry( 5, 32, 32 );
		mirror_sphere = new THREE.Mesh( mirror_sphere_geo, mirror_sphere_mat );
		//mirror_sphere.position.x = 10;
		//this.scene.add( mirror_sphere );
		//meshes.push( mirror_sphere);

	

		var grid_plane = new THREE.PlaneGeometry(10,10, 1,1);
		grid = new THREE.Mesh(grid_plane, grid_mat );
		grid.position.y = -1;
		grid.rotation.x = -Math.PI / 2;
		grid.receiveShadow = true;
		//this.scene.add(grid);
		//meshes.push( grid);
		
		plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
		plane.lookAt( this.camera.position );			
		//plane.visible = false;
		//this.scene.add( plane );


		
		var sphere_geo = new THREE.SphereGeometry( 0.02, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		this.inject_sphere = new THREE.Mesh( sphere_geo, material );
		this.scene.add( this.inject_sphere );

		var path = "obj/head/";
		var texture_skull = THREE.ImageUtils.loadTexture(path + "SkullTexture.png");	
		var texture_eye = THREE.ImageUtils.loadTexture(path + "EyeBallTexture.jpg" );	
		var texture_brain = THREE.ImageUtils.loadTexture(path + "brainTexture.png");
		var texture_bodyMuscles = THREE.ImageUtils.loadTexture(path + "muscles_bodyTexture.png");
		var texture_muscles =  THREE.ImageUtils.loadTexture(path + "muscles.png");

		// Loading obj from js file 
		json_object_list = LoadObjectList();
		
		var loader = new THREE.OBJLoader();
		///var loader = new THREE.OBJMTLLoader();
		var self = this;
		for( var i = 0; i < json_object_list.length; i++ )
		{
			// Object structure 
			object_list.push( {	object : null, diffuse: null, material: null } );
			if( json_object_list[i].diffuse == "muscles.png" )
			{
				object_list[i].diffuse = texture_muscles;
			}	
			else if( json_object_list[i].diffuse == "SkullTexture.png" )
			{
				object_list[i].diffuse = texture_skull;
			}
			else if( json_object_list[i].diffuse == "brainTexture.png" )
			{
				object_list[i].diffuse = texture_brain;
			}	
			else if( json_object_list[i].diffuse == "EyeBallTexture.jpg" )
			{
				object_list[i].diffuse = texture_eye;
			}	
			else if( json_object_list[i].diffuse == "muscles_bodyTexture.png" )
			{
				object_list[i].diffuse = texture_bodyMuscles;
			}	

			object_list[i].material = new THREE.MeshLambertMaterial({map:object_list[i].diffuse });
			// if .obj file 
			//loader.load( json_object_list[i].path  + ".obj", json_object_list[i].mtl + ".mtl" , ObjectLoadCallBack( i, self) ); 	
			loader.load( path + json_object_list[i].name + ".obj", ObjectLoadCallBack( i, self) ); 	
		}
		var cube_geo = new THREE.BoxGeometry(0.1,0.1,0.1);
		var head_offset = new THREE.Vector3(0,0,0.5);
		//var injection_count;
		// for( var i = 0; i < injection_count; i++ )
		// {
		// 	var cube = new THREE.Mesh(cube_geo, new THREE.MeshBasicMaterial() );
		// 	cube.position.set( Math.sin( i * 1 ) * 4, 1 , Math.cos(i * 1) * 4 );
		// 	this.scene.add(cube);
		// 	injection_points.push( cube.mesh );			
		// }

			this.isInitalized = true;
			this.isActive = true;
	},
	Update : function() {
		if( this.isInitalized === true && this.isActive === true )
		{
			// Update internal timers and clock
			stats.begin();
			var timer = Date.now() * 0.000025;
			this.delta_time = this.clock.getDelta();

		this.controls.update(this.clock.getDelta());	
		raycast_timer += this.delta_time;
		rotate_timer += this.delta_time;

		if( rotate_camera )	{
			this.camera.position.x = Math.sin(rotate_timer * rotate_speed) * 5;
			this.camera.position.z = Math.cos(rotate_timer * rotate_speed) * 5;
			this.camera.position.y = 1.3;
			this.controls.target = new THREE.Vector3(0,1.3,0);
		}		
		else if( this.inject_mode )
		{
			if( this.inject_sphere)
			{
				//this.inject_sphere.position.copy( this.controls.target);
			}
		}
		else
		{
			if( this.inject_sphere)
			{
				//this.inject_sphere.position.set(0,0,0);
			}
			//this.controls.target = new THREE.Vector3(0,1,0);
		}
		lightHelper.update();

		if( this.buttonOpacity)
		{
			this.opacityValue = this.buttonOpacity.value;
		}
		for( var i = 0; i < object_list.length; i++) {
			if( object_list[i].object )
			{
				var r = 0.0;
				var g = 0.0;
				var b = 0.0;
				object_list[i].object.visible = object_list[i].object.userData.is_visible;				
				if( object_list[i].object.userData.is_locked ) {
					r += 0.5;
					g += 0.5;
				}
				if( object_list[i].object.userData.is_selected ) {
					b += 0.5;
				}				
				object_list[i].material.emissive.setRGB(r,g,b);

				if( this.buttonOpacity)
				{
					object_list[i].material.opacity = this.opacityValue;
				}
			}
		}
		if( rotate_light )
		{
			//  $$$ Hook values to ui buttons 
			this.directional_light.position.x = Math.sin(timer * 5) * 20;
			this.directional_light.position.z = Math.cos(timer * 5) * 20;
			this.directional_light.position.y = 20;
			this.directional_light.target.position.set(0,0,0);
		}
		
			// Set Directiona Light
			this.directional_light.position.copy( this.camera.position);
			this.directional_light.target.position.set(0,0,0);
				
	
		
		stats.end();
	}
	},
	Draw : function() {
		if( this.isInitalized === true && this.isActive === true ) {
			if(this.renderer) {
				this.renderer.render(this.scene,this.camera);
			}
		}	
	}
}

function Loop() {	
	requestAnimationFrame(Loop);
	Update();
	Draw();
}
function Update() {
	Engine.Update();
}
function Draw() {
	Engine.Draw();
}
function Initialize() {	
	Engine.Init();
	window.addEventListener( 'resize', onWindowResize, false );
	//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	//document.addEventListener( 'touchend', onDocumentTouchEnd, false );
	Engine.container.addEventListener( 'mousedown', onDocumentMouseDown, true );
	//Engine.renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	Engine.container.addEventListener( 'mousemove', onDocumentMouseMove, false );
	//Engine.renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	Engine.container.addEventListener( 'mouseup', onDocumentMouseUp, false );
	//document.addEventListener( 'mouseup', onDocumentMouseUp, false );

	Engine.renderer.domElement.addEventListener( 'onscroll', onDocumentScroll, false ); 
	
	AddButtons();
	Loop();
	ResetCamera();
}

function ResetCamera() {
	Engine.controls.enabled = true;
	Engine.camera.position.set(0, 1.3, 5);
	//Engine.camera.lookAt(new THREE.Vector3(0,1,0));
	Engine.controls.target = new THREE.Vector3(0,1.3,0);

}
function ResetLight() {
	Engine.directional_light.position.set(0,5,10);
	Engine.directional_light.target.position.set(0,0,0);
}
function ResetScene(){
	ResetCamera();
	ResetLight();

	SELECTED = null;
	for( var i = 0; i < object_list.length; i++) {
		ResetObject(i);
	}
	SelectMuscle(-1);
	inject_mode = false;
	rotate_camera = false;
	Engine.controls.enabled = true;
	for( var i = 0; i < injection_points.length; i++ )
	{
		Engine.scene.remove( injection_points[i] );
	}
	injection_points = [];
	for( var i = 0; i < injection_sprites.length; i++ )
	{
		Engine.scene.remove( injection_sprites[i] );
	}
	injection_sprites = [];
	for( var i = 0; i < injection_lines.length; i++ )
	{
		Engine.scene.remove( injection_lines[i] );
	}
	injection_lines = [];
	Engine.container.style.cursor = 'auto';

}

function FullScreen() {
	var active = THREEx.FullScreen.activated();
	if(active) {
		THREEx.FullScreen.cancel();
	}
	else {
		THREEx.FullScreen.request();
	}
}

function onWindowResize() {
	windowHalfX = (window.innerWidth * x_offset) / 2;
	windowHalfY = (window.innerHeight* y_offset) / 2;
	Engine.camera.aspect = (window.innerWidth* x_offset) / (window.innerHeight* y_offset);
	Engine.camera.updateProjectionMatrix();
	// Resize cubemap/skybox camera
	//cameraCube.aspect = window.innerWidth / window.innerHeight;
	//cameraCube.updateProjectionMatrix();
	Engine.renderer.setSize( (window.innerWidth* x_offset), (window.innerHeight* y_offset) );
}
function onDocumentScroll( event )
{
	event.preventDefault();
	// disable body scrolling 
}


function onDocumentTouchStart( event ) {
	//event.preventDefault();	// if called, disables default browser mouse functions ]
	touch_start = true;
	if( !rotate_camera ) {
		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;
		background_press = true;
		plane_moved = false;

			mouse.x = (( event.clientX - Engine.container.offsetLeft  )/ Engine.container.clientWidth) * 2 - 1;
			mouse.y = -(( event.clientY - Engine.container.offsetTop   )/ Engine.container.clientHeight) * 2 + 1;
			//mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			//mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			//RayCastFromMouse();
			var raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse, Engine.camera);	
			// Mouse Click on mesh
			var intersects = raycaster.intersectObjects( meshes );
			if ( intersects.length > 0 ) {
				if( !intersects[0].object.userData.is_locked)
				{
					if( INTERSECTED )
					{
						INTERSECTED.parent.userData.is_selected = false;
					}
					INTERSECTED = intersects[ 0 ].object;
					INTERSECTED.parent.userData.is_selected = true;

					plane.position.copy( INTERSECTED.position );
					plane.lookAt( Engine.camera.position );
					//select_cube.position.copy(INTERSECTED.position);

					

					background_press = false;
					Engine.container.style.cursor = 'pointer';
					Engine.controls.enabled = false;
				}
			}
			if( INTERSECTED )
			{
				var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( Engine.camera );
				//raycaster.setFromCamera(Engine.camera.position, vector.sub( Engine.camera.position ).normalize() );
				var raycaster = new THREE.Raycaster( Engine.camera.position, vector.sub( Engine.camera.position ).normalize() );
				var intersects = raycaster.intersectObjects(meshes);
				if ( intersects.length > 0 ) {
					SELECTED = intersects[ 0 ].object;
					if(SELECTED){
			 		SELECTED.parent.userData.is_selected = true;
	 				var intersects = raycaster.intersectObject( plane );
	 				offset.copy( intersects[ 0 ].point ).sub( plane.position );
			 		//container.style.cursor = 'move';
			 		plane_moved = true;
					}
				}
			}
			else 
			{
				INTERSECTED = null;
				SELECTED = null;
			}
			
		
	}
}
function onDocumentTouchMove(event) {
	event.preventDefault(); // if called, disables default browser mouse functions 
	touch_move = true;
	if( !rotate_camera ) {
		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		mouse.x = (( event.clientX - Engine.container.offsetLeft  )/ Engine.container.clientWidth) * 2 - 1;
		mouse.y = -(( event.clientY - Engine.container.offsetTop   )/ Engine.container.clientHeight) * 2 + 1;

		if( plane_moved )
		{

			if( SELECTED && SELECTED.parent.userData.is_locked == false )
			{		
				var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( Engine.camera );
				var raycaster = new THREE.Raycaster( Engine.camera.position, vector.sub( Engine.camera.position ).normalize() );
				var intersects = raycaster.intersectObject(plane);
			 	SELECTED.position.copy(intersects[0].point.sub(offset));

				return;			
			}
		}
	}
}
function onDocumentTouchEnd( event ) {
	//event.preventDefault();	// if called, disables default browser mouse functions
	touch_end = true;
	if( !rotate_camera ) {
		if( INTERSECTED ) {
				plane.position.copy( INTERSECTED.position );			
			}	
			if( SELECTED ) {
				SELECTED.parent.userData.is_selected = false;
				
				
			}	
			SELECTED = null;
			Engine.container.style.cursor = 'auto';
			Engine.controls.enabled = true;
			background_press = false;
			plane_moved = false;
	}
}
function onDocumentMouseDown( event ) {
	//event.preventDefault();
	if( !touch_start ) {
		if( !rotate_camera ) {	
			
				

			var ele = getPosition( Engine.renderer.domElement );

			mouse.x = (( event.clientX - ele.x  )/ Engine.renderer.domElement.clientWidth) * 2 - 1;
			mouse.y = -(( event.clientY - ele.y )/ Engine.renderer.domElement.clientHeight) * 2 + 1;

			if( Engine.inject_mode )
			{		
				if( Engine.inject_sphere )
				{
					var raycaster = new THREE.Raycaster();
					raycaster.setFromCamera(mouse, Engine.camera);	
					// Mouse Click on mesh
					var intersects = raycaster.intersectObjects( meshes );
					if ( intersects.length > 0 ) {
						
						Engine.inject_sphere.position.copy( intersects[ 0 ].point );
									
						AddInjectPoint( intersects[ 0 ].point );
					}
				}
			}
			else 
			{
				// background_press = true;	
				// var raycaster = new THREE.Raycaster();
				// raycaster.setFromCamera(mouse, Engine.camera);	
				// // Mouse Click on mesh
				// var intersects = raycaster.intersectObjects( meshes );
				// if ( intersects.length > 0 ) {
				// 	if( !intersects[0].object.userData.is_locked)
				// 	{
				// 		if( INTERSECTED )
				// 		{
				// 			INTERSECTED.parent.userData.is_selected = false;
				// 		}
				// 		INTERSECTED = intersects[ 0 ].object;
				// 		INTERSECTED.parent.userData.is_selected = true;
				// 		plane.position.copy( INTERSECTED.position );
				// 		plane.lookAt( Engine.camera.position );
				// 		//select_cube.position.copy(INTERSECTED.position);

				// 		background_press = false;
				// 		Engine.container.style.cursor = 'pointer';
				// 		Engine.controls.enabled = false;
				// 	}
				// }
				// if( INTERSECTED )
				// {
				// 	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( Engine.camera );
				// 	//raycaster.setFromCamera(Engine.camera.position, vector.sub( Engine.camera.position ).normalize() );
				// 	var raycaster = new THREE.Raycaster( Engine.camera.position, vector.sub( Engine.camera.position ).normalize() );
				// 	var intersects = raycaster.intersectObjects(meshes);
				// 	if ( intersects.length > 0 ) {
				// 		SELECTED = intersects[ 0 ].object;
				// 		if(SELECTED){
				//  		SELECTED.parent.userData.is_selected = true;
		 	// 			var intersects = raycaster.intersectObject( plane );
		 	// 			offset.copy( intersects[ 0 ].point ).sub( plane.position );
				//  		//container.style.cursor = 'move';
				// 		}
				// 	}
				// }
				// else 
				// {
				// 	INTERSECTED = null;
				// 	SELECTED = null;
				// }
			}
			
			
		}
	}
	touch_start = false;
}
function onDocumentMouseMove(event) {
	//event.preventDefault();
	if( !touch_move ) {
		if( !rotate_camera ) {

			var ele = getPosition( Engine.renderer.domElement );

	mouse.x = (( event.clientX - ele.x  )/ Engine.renderer.domElement.clientWidth) * 2 - 1;
	mouse.y = -(( event.clientY - ele.y )/ Engine.renderer.domElement.clientHeight) * 2 + 1;
	//console.log( mouse.x, mouse.y);
	if( Engine.inject_mode )
	{
		if( Engine.inject_sphere )
		{
			var raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse, Engine.camera);	
			// Mouse Click on mesh
			var intersects = raycaster.intersectObjects( meshes );
			if ( intersects.length > 0 ) {
				Engine.inject_sphere.position.copy( intersects[ 0 ].point );
			}
		}
	}
	else 
	{
			if( SELECTED && SELECTED.parent.userData.is_locked == false )
			{		
				var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( Engine.camera );
				var raycaster = new THREE.Raycaster( Engine.camera.position, vector.sub( Engine.camera.position ).normalize() );
				var intersects = raycaster.intersectObject(plane);
			 	SELECTED.position.copy(intersects[0].point.sub(offset));
			 	
				// var raycaster = new THREE.Raycaster();		
				// raycaster.setFromCamera(mouse,Engine.camera);			
				// 	var intersects = raycaster.intersectObject(plane);
			 	// 	SELECTED.position.copy(intersects[0].point.sub(offset));
					return;			
			}

			// if mouse button not down 
			if( !background_press )
			{
				var raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse, Engine.camera);	
			// Mouse Click on mesh
			var intersects = raycaster.intersectObjects( meshes );
			if ( intersects.length > 0 ) {
				if( !intersects[0].object.userData.is_locked)
				{
					if( INTERSECTED )
					{
						INTERSECTED.parent.userData.is_selected = false;
					}
					INTERSECTED = intersects[ 0 ].object;
					INTERSECTED.parent.userData.is_selected = true;
					plane.position.copy( INTERSECTED.position );
					plane.lookAt( Engine.camera.position );
					Engine.inject_sphere.position.copy( intersects[ 0 ].point );


					//INTERSECTED.material.color.setHex( Math.random() * 0xffffff );
					//select_cube.position.copy(INTERSECTED.position);


					Engine.container.style.cursor = 'pointer';
					//Engine.controls.enabled = false;
					}
				}
				else
				{
					if( INTERSECTED )
			 		{
		 	 			INTERSECTED.parent.userData.is_selected = false;
		 			}
			 	//INTERSECTED = null;
				}
			}
		}

			
		}
	}
	touch_move = false;
}
	
function onDocumentMouseUp( event ) {
	//event.preventDefault();
	if(!touch_end) {
		if( !rotate_camera ) {
			if( !Engine.inject_mode ){


			if( INTERSECTED ) {
				plane.position.copy( INTERSECTED.position );			
			}	
			if( SELECTED ) {
				SELECTED.parent.userData.is_selected = false;
				
				
			}	
			SELECTED = null;
			Engine.container.style.cursor = 'auto';
			//Engine.controls.enabled = true;
			background_press = false;
		}
	}
		}
	touch_end = false;
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function SetCameraToPoint( x,y,z )
{
	if( Engine.renderer )
	{
		var position = new THREE.Vector3(x,y,z);
	// normal from position to center
		distance = position.sub( new THREE.Vector3(0,1,0) );
	// set camera pos to normal * 4
	// distance.setLength(1);
		distance.normalize();
		Engine.camera.position = distance * 10;
	}
}

function ToggleOrbitCamera() {
	rotate_camera = !rotate_camera;
	if( rotate_camera )	{
		rotate_timer = 0.0;
		camera_old_position = Engine.camera.position;
		camera_old_target = Engine.camera.target;
	} 
	else {
		Engine.camera.position = camera_old_position;
		Engine.camera.target = camera_old_target;
	}
}

function ResetObject(index) {
	if( object_list[index].object ) {
		// $$$ reset code here]
		// Reset Mesh aswell as object3D
		//object_list[index].object.position.set(0,0,0);
		object_list[index].object.mesh.position.set(0,0,0);
	}
}

function AddButtons() {

	var ui_div  = document.createElement("div");
	ui_div.id = "ui_div";
	ui_div.style.position = "absolute";
	ui_div.style.top = "26.5%";
	ui_div.style.left = "60.3%";
	ui_div.style.zIndex = "1";
	ui_div.style.width = "30%";

	// Create Global button div'
	var button_div = document.createElement("div");
	button_div.id = "button_div";
	//button_div.style.width = "10%"
	// button_div.style.position = "absolute";
	// button_div.style.top = "31.5%";
	// button_div.style.left = "53%";
	// button_div.style.zIndex = "1";

	// Add select all etc buttons  
	// Create Local button div 
	var object_div = document.createElement("div");
	object_div.id = "object_div";
	//object_div.style.position = "absolute";
	//object_div.style.width = "20%";
	//object_div.style.left = "5px";
	object_div.style.bottom = "50%";
	object_div.style.zIndex = "1";


		// wait for object load then append to div 

	document.body.appendChild( ui_div);
	//Engine.container.appendChild(ui_div);
	ui_div.appendChild(button_div);
	ui_div.appendChild(object_div);	

	// Reset All
	var btn_reset_all = document.createElement('button');
	var txt_reset_all = document.createTextNode('Reset');
	btn_reset_all.addEventListener('click', function() { ResetScene(); }, false);
	btn_reset_all .appendChild(txt_reset_all);
	button_div.appendChild(btn_reset_all);

	var btn_rotate_camera = document.createElement("button");
	var t_rotate_camera = document.createTextNode("Toggle Camera");
	btn_rotate_camera.addEventListener("click", function() { ToggleOrbitCamera(); },false );
	btn_rotate_camera.appendChild(t_rotate_camera);
	button_div.appendChild(btn_rotate_camera);

	var btn_inject = document.createElement("button");
	var t_inject = document.createTextNode("Inject");
	btn_inject.addEventListener('click', function(){ ToggleMode(); }, false );
	btn_inject.appendChild(t_inject);
	button_div.appendChild(btn_inject);

	inject_input = document.createElement('input');
	inject_input.setAttribute("type", "number");
	button_div.appendChild(inject_input);
	inject_input.defaultValue = 0;
	

}
function ToggleMode(){
	Engine.inject_mode = !Engine.inject_mode;

	if( Engine.inject_mode )
	{
		inject_value = inject_input.value;
		console.log( inject_value);
		rotate_camera = false;
		Engine.container.style.cursor = 'crosshair';
		Engine.controls.enabled = false;
	}
	else 
	{
		Engine.controls.enabled = true;
		Engine.container.style.cursor = 'auto';
	}

}
function AddInjectPoint( position )
	{
		var distance = new THREE.Vector3();
		distance.copy(position);
		distance.x *= 1.3;
		distance.y *= 1.1;
		distance.z *= 1.3;

		var sphere_geo = new THREE.SphereGeometry( 0.02, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
		var sphere = new THREE.Mesh( sphere_geo, material );
		sphere.position.copy(position);	
		Engine.scene.add( sphere );
		injection_points.push( sphere );		

		var geo = new THREE.Geometry();
		geo.vertices.push(position);
		geo.vertices.push(distance);

		var line = new THREE.Line(geo,new THREE.LineBasicMaterial({color:0xff0000}));
		Engine.scene.add(line);
		injection_lines.push( line);

		var text = Create2DSprite( inject_value+"u", 
		{ fontsize: 16, borderColor: {r:255, g:255, b:255, a:1.0} } );
		text.position.copy(distance.add(offset));
		Engine.scene.add( text );
		injection_sprites.push( text );

		//text.scale.set(2.0,0.8,1.0);

	}
function Create2DSprite(message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:1.0, g:1.0, b:1.0, a:1.0 };

	//var spriteAlignment = THREE.SpriteAlignment.topLeft;
		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = 200;
	canvas.height = 200;
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";
	//context.fillRect(0,0,200,200);
	
	context.lineWidth = borderThickness;
	//roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(255, 255, 1.0, 1.0)";

//context.fillText( message, borderThickness, fontsize + borderThickness);
	context.fillText( message, 100, 100 );
	//context.textAllign = "center";
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false } );
	var sprite = new THREE.Sprite( spriteMaterial );
	return sprite;	
}
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}
function SelectMuscle( index )
{
	if( index == -1)
		return;
	else
	{
		//console.log( "Muscle Selected " + index );
		for( var i = 0; i < object_list.length; i++ )
		{
			if( object_list[i] )
			{
				if( i == index)
				{
					object_list[i].material.emissive.setRGB(0,0,0.5);
					Engine.camera.position.copy( object_list[i].position);
					//Engine.controls.target.copy(object_list[i].target);
				}
				else 
				{
					object_list[i].material.emissive.setRGB(0,0,0);
				}
			}
		}
	}
}


if(window.addEventListener )
{
	window.addEventListener('load', Initialize, false);
}
else if (window.attachEvent)	
{
	window.attachEvent('onload', Initialize);
}
else
{	
	window.onload = Initialize;
}
