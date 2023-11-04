// Core & Math
import { Color } from "./gop/math/Color.js";
import { Mesh } from "./gop/objects/Mesh.js";
import { WebGLRenderer } from "./gop/renderers/WebGLRenderer.js";
import { Object3D } from "./gop/core/Object3D.js";
import { Vector3 } from "./gop/math/Vector3.js";
import { Euler } from "./gop/math/Euler.js";
import { Quaternion } from "./gop/math/Quaternion.js";
import { lerp, damp, pingpong, smoothstep, smootherstep, clamp, sinc } from './gop/math/MathUtils.js';
// Materials
import { Material } from "./gop/materials/Material.js";
import { MeshBasicMaterial } from "./gop/materials/MeshBasicMaterial.js";
import { MeshPhongMaterial } from "./gop/materials/MeshPhongMaterial.js";
// Lights
import { AmbientLight } from "./gop/lights/AmbientLight.js";
import { PointLight } from "./gop/lights/PointLight.js";
// Geometry
import { BoxGeometry } from "./gop/geometries/BoxGeometry.js";
import { SphereGeometry } from "./gop/geometries/SphereGeometry.js";
import { CylinderGeometry } from "./gop/geometries/CylinderGeometry.js";
import { ConeGeometry } from "./gop/geometries/ConeGeometry.js";
import { PlaneGeometry } from "./gop/geometries/PlaneGeometry.js";
// GUI
import GUI from './gop/lil-gui/lil-gui.module.min.js';
// Camera(s)
import { Camera } from "./gop/cameras/Camera.js";
import { PerspectiveCamera } from "./gop/cameras/PerspectiveCamera.js";
import { OrthographicCamera } from "./gop/cameras/OrthographicCamera.js";
// Textures
import { Texture } from "./gop/textures/Texture.js";
// Camera Controls see: https://threejs.org/docs/#examples/en/controls/OrbitControls
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls.js'


var orbCtrl = null; // global variable for camera control
var camera = null;


// some settings that can be changed with the GUI
const controls = {
    'background': new Color(0xaaaaaa),
    'camera': 'manual', // the camera animation/movement mode
    'duration': 3, // the animation duration in seconds
};



function main() {

    // OOP WebGLRenderer
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(controls.background, 1.0);
    document.body.appendChild(renderer.domElement);

    //scene (graph)
    const scene = new Object3D();
    scene.background = controls.background;

   
    //----TEXTUREN----
    
    const grass = new Mesh(new PlaneGeometry(6,1), new MeshPhongMaterial({color:'white', specular: 'black'}));

    grass.position.z = 2;
    grass.position.y = -.7;
    scene.add(grass);

    // const grassMaterial = new MeshPhongMaterial({ color: 'white', specular: 'black', transparent: true }); // transparent: true, // Робимо матеріал прозорим
    // const grass = new Mesh(new PlaneGeometry(6, 1), grassMaterial);
    // grass.position.z = 2;
    // grass.position.y = -0.7;
    // scene.add(grass);

    const grassImg = new Image();
    grassImg.src = './textures/grass.png';
    grassImg.onload =() =>{
        const texture = new Texture(grassImg);
        grass.material.map = texture;
        grass.material.transparent = true;
        texture.repeat.set(8,1);
        grass.update = function(time){
            this.material.map.offset.x = Math.sin(time / 1000);
        }
        
    }
    
    const grass2 = new Mesh(new PlaneGeometry(6,1), new MeshPhongMaterial({color:'white', specular: 'black'}));

    grass2.position.z = -2;
    grass2.position.y = -.7;
    grass2.rotation.y = Math.PI;
    scene.add(grass2);

    const grassImg2 = new Image();
    grassImg2.src = './textures/grass.png';
    grassImg2.onload =() =>{
        const texture = new Texture(grassImg2);
        grass2.material.map = texture;
        grass2.material.transparent = true;
        texture.repeat.set(8,1);
        grass2.update = function(time){
            this.material.map.offset.x = Math.sin(time / 1000);
        }
        
    }

    //-----THREEES------


    //Tree_correct
    const tree6 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027,specular:'white', shininess:30}));
    tree6.position.x = -2;
    tree6.position.y = -0.69;
    tree6.position.z = -2;
    scene.add(tree6);

    const treeLeaves6 = new Mesh(new ConeGeometry(0.5), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30 })); 
    treeLeaves6.position.y = 1.4;
    tree6.add(treeLeaves6);

    //treeLeaves4

    const treeLeaves7 = new Mesh(new ConeGeometry(0.58), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30 })); 
    treeLeaves7.position.y = 0.9;
    tree6.add(treeLeaves7);

    //treeLeaves5

    const treeLeaves8 = new Mesh(new ConeGeometry(0.65), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30 })); 
    treeLeaves8.position.y = 0.4;
    tree6.add(treeLeaves8);



    // Tree_correct
    const tree = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027,specular:'white', shininess:30})); 
    tree.position.x = -2;
    tree.position.y = -0.69;
    tree.position.z = 2;
    scene.add(tree);

    //leaves1
    const treeLeavesSmall = new Mesh(new SphereGeometry(0.4), new MeshPhongMaterial({'color': 0x3b9131,specular:'white', shininess:30})); 
    treeLeavesSmall.position.y = 1.0;
    treeLeavesSmall.position.x = 0.3;
    tree.add(treeLeavesSmall);

    //leaves1
    const treeLeavesSmall1 = new Mesh(new SphereGeometry(0.4), new MeshPhongMaterial({'color': 0x5cb352,specular:'white', shininess:30})); 
    treeLeavesSmall1.position.y = 1.0;
    treeLeavesSmall1.position.x = -0.1;
    tree.add(treeLeavesSmall1);

    //leaves1
    const treeLeaves = new Mesh(new SphereGeometry(0.5), new MeshPhongMaterial({'color': 0x68bf5e,specular:'white', shininess:30})); 
    treeLeaves.position.y = 0.8;
    tree.add(treeLeaves);

   

    //tanenbaum mitte
    const tree7 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027,specular:'white', shininess:30}));
    tree7.position.x = 0;
    tree7.position.y = -0.69;
    tree7.position.z = -2;
    scene.add(tree7);

    const treeLeaves9 = new Mesh(new ConeGeometry(0.5), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30})); 
    treeLeaves9.position.y = 1.4;
    tree7.add(treeLeaves9);

    //treeLeaves4

    const treeLeaves10 = new Mesh(new ConeGeometry(0.58), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30 })); 
    treeLeaves10.position.y = 0.9;
    tree7.add(treeLeaves10);

    //treeLeaves4

    const treeLeaves11 = new Mesh(new ConeGeometry(0.68), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30})); 
    treeLeaves11.position.y = 0.4;
    tree7.add(treeLeaves11);



    //Tree3
    const tree3 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027,specular:'white', shininess:30}));
    tree3.position.x = 2;
    tree3.position.y = -0.69;
    tree3.position.z = -2;
    scene.add(tree3);

    const treeLeaves3 = new Mesh(new ConeGeometry(0.5), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30})); 
    treeLeaves3.position.y = 1.4;
    tree3.add(treeLeaves3);

    //treeLeaves4

    const treeLeaves4 = new Mesh(new ConeGeometry(0.58), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30})); 
    treeLeaves4.position.y = 0.9;
    tree3.add(treeLeaves4);

    //treeLeaves5

    const treeLeaves5 = new Mesh(new ConeGeometry(0.68), new MeshPhongMaterial({'color': 0x0b8c16,specular:'white', shininess:30})); 
    treeLeaves5.position.y = 0.4;
    tree3.add(treeLeaves5);


    //---STRASSE
    
//     // Floor
//     const gras = new Mesh(new BoxGeometry(6,0,6), new MeshBasicMaterial({'color': 0x9ed492,specular:'white', shinines:30}));
//    gras.position.y = -0.7;
//     scene.add(gras);

    const road = new Mesh(new BoxGeometry(6,0.1,2.5), new MeshPhongMaterial({'color': 0x919c8f,specular: 0x919c8f, shininess:30}));
    road.position.y = -1.2;
    scene.add(road);

    const gras2 = new Mesh(new BoxGeometry(6,3,6), new MeshPhongMaterial({'color': 0x9ed492,specular:'white', shininess:30}));
    gras2.position.y = -2.7;
    scene.add(gras2);

    // const gras3 = new Mesh(new BoxGeometry(6,2,6), new MeshPhongMaterial({'color': 0x9ed492,specular:'white', shininess:30 }));
    // gras3.position.y = -2.9;
    // scene.add(gras3);



    //----CAR----


    // carBody
    const carBody = new Mesh(new BoxGeometry(1.7,1.1,0.9), new MeshPhongMaterial({ 'color': 0xf2d70c, specular: 0xf2d70c, shininess:30}));
    // carBody.scale.set(0.5, 0.5, 1);
    carBody.position.y = -0.5;
    carBody.rotation.y = - 45 * Math.PI / 180;
    scene.add(carBody);

  //pivotPoint1
  const pivotPoint1 = new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({'color': 0x262522,specular:'white', shinines:30 }));
  pivotPoint1.position.y = 0.6;
  pivotPoint1.position.x = 0.9;
  carBody.add(pivotPoint1);
  
 // Arm1
  const arm1 = new Mesh(new BoxGeometry(0.2,0.8,0.2), new MeshPhongMaterial({ 'color': 0x4f4e4c, specular:'white', shinines:30 }));
  arm1.position.y = .6;
  pivotPoint1.add(arm1);


  //pivotPoint2
  const pivotPoint2 = new Mesh(new SphereGeometry(0.29), new MeshPhongMaterial({'color': 0x262522,specular:'white', shinines:30 }));
  pivotPoint2.position.y = .6;
  arm1.add(pivotPoint2);
 
  
  //arm2

  const arm2 = new Mesh(new BoxGeometry(0.2,0.8,0.2), new MeshPhongMaterial({ 'color': 0x4f4e4c,specular:'white', shinines:30 }));
  arm2.position.y =.6;
  pivotPoint2.add(arm2);
  
  //pivotPoint3
  const pivotPoint3 = new Mesh(new SphereGeometry(0.29), new MeshPhongMaterial({'color': 0x262522,specular:'white', shinines:30}));
  pivotPoint3.position.y = .6;
  arm2.add(pivotPoint3);

  const arm3 = new Mesh(new BoxGeometry(0.2,0.8,0.2), new MeshPhongMaterial({ 'color': 0x4f4e4c,specular:'white', shinines:30}));
  arm3.position.y = .5;
  pivotPoint3.add(arm3);

  //pivotPoint4
  const pivotPoint4 = new Mesh(new SphereGeometry(0.29), new MeshPhongMaterial({'color': 0x262522,specular:'white', shinines:30}));
  pivotPoint4.position.y = .6;
  arm3.add(pivotPoint4);


  // quad at the end of the vehicle arm
  const quad = new Mesh(new BoxGeometry(0.3,0.4,0.9), new MeshPhongMaterial({ 'color': 0x42413e,specular:'white', shinines:30}));
  quad.position.y = .3;
  pivotPoint4.add(quad);
    
    //cabSmall window
    const carCab = new Mesh(new BoxGeometry(0.71,0.7,0.7), new MeshPhongMaterial({ 'color':0x96f8ff, specular:'white', shininess:30,  opacity: .5 }));
    // carCab.scale.set(1.5, 1.2, 1);
    carCab.position.y = 1;
    carCab.position.x = 0.0;
    carBody.add(carCab);

    
    // Cab
    const carCabSmall = new Mesh(new BoxGeometry(0.5,0.9,0.8), new MeshPhongMaterial({ 'color': 0xb09c4d,specular:'white', shininess:30}));
    // carCabSmall.scale.set(1.2, 1.0, 1);
    carCabSmall.position.y = 1;
    carCabSmall.position.x = 0.1;
    carBody.add(carCabSmall);
    
    // Wheels
    const wheel = new Mesh(new SphereGeometry(.3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shininess:30}));
    wheel.position.y = -0.4;
    wheel.position.x = -0.5;
    wheel.position.z = 0.6;
    carBody.add(wheel);

    // Wheels
    const wheel3 = new Mesh(new SphereGeometry( .3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shininess:30}));
    wheel3.position.y = -0.4;
    wheel3.position.x = 0.6;
    wheel3.position.z = 0.6;
    carBody.add(wheel3);

    // //wheelSmall
    // const wheelSmall = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial({'color': 0x30302e}));
    // wheelSmall.position.y = -0.5;
    // wheelSmall.position.x = -0.6;
    // carBody.add(wheelSmall);

    
    const wheel2 = new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shininess:30}));
    wheel2.position.y = -0.4;
    wheel2.position.x = -0.5;
    wheel2.position.z = -0.6;
    carBody.add(wheel2);

    const wheel4 = new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shininess:30}));
    wheel4.position.y = -0.4;
    wheel4.position.x = 0.6;
    wheel4.position.z = -0.6;
    carBody.add(wheel4);


    
    //Animation

    carBody.update = function(time){
        carBody.position.x = Math.sin(time / 1000);
        carBody.position.z = Math.sin(time/1000 * controls.duration);

        carBody.rotation.y = Math.sin(time/1000 * controls.duration);
        const maxRotation = Math.PI / 4; 
        const quarterRotation = -maxRotation / 2; 
        pivotPoint1.rotation.z = Math.min(Math.sin(time / 500 ), quarterRotation);
        pivotPoint2.rotation.z = Math.min(Math.sin(time / 500 ), quarterRotation);
        pivotPoint3.rotation.z = Math.min(Math.sin(time / 500 ), quarterRotation);
        pivotPoint4.rotation.z = Math.min(Math.sin(time / 500 ), quarterRotation);
        
    }



    // camera
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);
    camera.position.z = 5;
    camera.position.y = 2;

    // manual camera controls
    orbCtrl = new OrbitControls(camera, renderer.domElement);
    
    //--LIGHT--
    
    //a point light
    
    const pointLight = new PointLight(0xeeeeee);// neue object, neue grosse kugel welche bewegt sich zusamen mit dem auto
    pointLight.intensity = 1;
    scene.add(pointLight);

    pointLight.update =  createSimplePositionAnimation([ 
        new Vector3(0, 2, 0),
        new Vector3(0,2,2)
    ]);

    pointLight.add(new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({color:'white', specular:'white', shininess: 70, emissive:'white'})));


    //AmbientLight
    
    const light1 = new AmbientLight(0xffffff);
    light1.position.z= -1.5;
    light1.position.y =5;
    scene.add(light1);
    light1.add(new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({color:'white', specular:'white', shininess: 70})));// zeigt ein kegel oben --moon--
    
   

    const light2 = new PointLight(0xff0000); // rote kugel/licht
    light2.intensity = 1; //intensity 
    light2.position.set(-1, 0, 0); // licht position
    scene.add(light2);
    carBody.add(light2); // zeigt rote kugel auf dem auto

    light2.add(new Mesh(new SphereGeometry(0.2), new MeshPhongMaterial({color: 0xff0000, specular: 0xff0000, emissive:'red', shininess: 90}))); // roteslicht optionen

    light1.update = function(time){
        const t = pingpong(time / 1000, 1); 
    if (t < 0.5) { // wechselt lichtfarbe
        this.color.setHex(0x000000); 
    } else {
        this.color.setHex(0xffffff);
    }

    }

    const imgStreet = new Image();
    imgStreet.src = './textures/stone.jpg';
    imgStreet.onload = () => {
        const texture = new Texture(imgStreet);
        road.material.map = texture;
        texture.repeat.set(1,2);
    }


   
    //----LIGHT-----

    // a point light
    // const light = new PointLight(0xffffff);
    // scene.add(light);

    // light.update = createSimplePositionAnimation([
    //     new Vector3(0, 2, 0),
    //     new Vector3(0, 2, 3),
    // ]);

    // add debug helper for light 
    // light.add(new Mesh(new SphereGeometry(.05),
    //     new MeshPhongMaterial({ emissive: light.color })));// kleine kugel in der mitte


    
    // an ambient light
    const ambientLight = new AmbientLight(0x333333); // wenn ich das weg tu es blinkt
    scene.add(ambientLight);
    


    //--ANIMATION--

    // function for drawing the scene
    function drawScene(time = 0) {

        // simple animation
        scene.traverse((obj) => {
            if (typeof obj.update === 'function') {
                obj.update(time);
            }
        });

        // render everything!
        renderer.render(scene, camera);
        // ask the browser to schedule an animation frame
    requestAnimationFrame(drawScene);
    }


     // this gets called as callback from the GUI when you change the Camera Animation
     function changeCameraAnimation(mode = 'manual') {

        console.log(`changeCameraAnimation: switching camera into ${mode} mode`);

        // Todo: Copy your code from webgl-03.js here
    }
    changeCameraAnimation();


    requestAnimationFrame(drawScene); // draw the scene once

    // ------------------------------------------------------------------------------------
    // GUI below (ignore it | no changes needed)
    // ------------------------------------------------------------------------------------
    var gui = new GUI();
    gui.addColor(controls, 'background').name('Background Color').onChange(() => {
        renderer.setClearColor(controls.background, 1.0);
    });

    gui.add(controls, 'duration', 1, 15).listen().name('Animation Duration');

    gui.add(controls, 'camera', ['manual', 'path_A', 'path_B', 'path_C'])
        .onChange(changeCameraAnimation).name('Camera Animation');

    /*diese teil wird immer in browser window gezeigt werden*/
    if (typeof camera !== 'undefined' && camera.isCamera) {
        const folder = gui.addFolder("Camera Transformation");
        const translFolder = folder.addFolder('position');
        translFolder.add(camera.position, 'x', -10, 10).listen();
        translFolder.add(camera.position, 'y', -10, 10).listen();
        translFolder.add(camera.position, 'z', -10, 10).listen();
        folder.add(camera.rotation, 'x', -Math.PI, Math.PI).listen().name('rotation x');
        folder.add(camera.rotation, 'y', -Math.PI, Math.PI).listen().name('rotation y');
        folder.add(camera.rotation, 'z', -Math.PI, Math.PI).listen().name('rotation z');
        folder.close();
    }

    // light controls
    let lightsFolder = null;
    if (typeof scene !== 'undefined' && scene.isObject3D) {
        scene.traverse((obj) => {
            if (obj.isLight) {

                if (lightsFolder === null) {
                    // create on folder for all lights!
                    lightsFolder = gui.addFolder('Lights');
                }

                const folder = lightsFolder.addFolder(`${obj.type}`);

                // display position (if not an ambient light) and color
                if (obj.isAmbientLight !== true) {
                    const translFolder = folder.addFolder('position');
                    translFolder.add(obj.position, 'x', -10, 10).listen();
                    translFolder.add(obj.position, 'y', -10, 10).listen();
                    translFolder.add(obj.position, 'z', -10, 10).listen();
                }
                folder.addColor(obj, 'color').listen().name('color');
                folder.close();
            }
        });

    }
}

main(); // start everything!

// the two animation factories from last week.
// If you used improved versions, copy them here.
function createSimplePositionAnimation(positions) {

    const _positions = positions;

    return function (time) {
        const t = pingpong(time / 1000, _positions.length - 1);
        const p0 = _positions[Math.floor(t)];
        const p1 = _positions[Math.ceil(t)];
        this.position.lerpVectors(p0, p1, t - Math.floor(t));
    }

}

function createSimpleRotationAnimation(rotations) {

    const _rotations = [];
    rotations.forEach(r => {
        const q = new Quaternion();
        if (r.isEuler) {
            q.setFromEuler(r);
        } else if (r.isQuaternion) {
            q.copy(r);
        } else {
            console.error('Unknown rotation type');
        }
        q.normalize();
        _rotations.push(q);
    });

    return function (time) {
        const t = pingpong(time / 1000, _rotations.length - 1);
        const q0 = _rotations[Math.floor(t)];
        const q1 = _rotations[Math.ceil(t)];
        this.quaternion.slerpQuaternions(q0, q1,
            smoothstep(t - Math.floor(t), 0,1));
}

}