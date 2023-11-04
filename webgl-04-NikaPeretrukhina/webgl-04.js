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
// Camera Controls see: https://threejs.org/docs/#examples/en/controls/OrbitControls
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls.js'
import { Material } from "./gop/materials/Material.js";




var orbCtrl = null; // global variable for camera control
var camera = null;


// some settings that can be changed with the GUI
const controls = {
    'background': new Color(0xaaaaaa),
    'camera': 'manual', // the camera animation/movement mode
    'duration': 3, // the animation duration in seconds
};

//scene (graph)
const scene = new Object3D();
scene.background = controls.background;




function main() {

    // OOP WebGLRenderer
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(controls.background, 1.0);
    document.body.appendChild(renderer.domElement);

    //scene (graph)
    const scene = new Object3D();
    scene.background = controls.background;
    


    //Tree_correct
    const tree6 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027, specular: 'white', shininess:30}));
    tree6.position.x = -2;
    tree6.position.y = -0.69;
    tree6.position.z = -2;
    scene.add(tree6);

    const treeLeaves6 = new Mesh(new ConeGeometry(0.5), new MeshPhongMaterial({'color': 0x0b8c16, specular: 'white', shininess:30}));
    treeLeaves6.position.y = 1.4;
    tree6.add(treeLeaves6);

    //treeLeaves4

    const treeLeaves7 = new Mesh(new ConeGeometry(0.58), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30})); 
    treeLeaves7.position.y = 0.9;
    tree6.add(treeLeaves7);

    //treeLeaves5

    const treeLeaves8 = new Mesh(new ConeGeometry(0.65), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30})); 
    treeLeaves8.position.y = 0.4;
    tree6.add(treeLeaves8);



    // Tree_correct
    const tree = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027, specular:'white', shininess:30})); 
    tree.position.x = -2;
    tree.position.y = -0.69;
    tree.position.z = 2;
    scene.add(tree);

    //leaves1
    const treeLeavesSmall = new Mesh(new SphereGeometry(0.4), new MeshPhongMaterial({'color': 0x3b9131, specular:'white', shininess:30})); 
    treeLeavesSmall.position.y = 1.0;
    treeLeavesSmall.position.x = 0.3;
    tree.add(treeLeavesSmall);

    //leaves1
    const treeLeavesSmall1 = new Mesh(new SphereGeometry(0.4), new MeshPhongMaterial({'color': 0x5cb352, specular:'white', shininess:30}));
    treeLeavesSmall1.position.y = 1.0;
    treeLeavesSmall1.position.x = -0.1;
    tree.add(treeLeavesSmall1);

    //leaves1
    const treeLeaves = new Mesh(new SphereGeometry(0.5), new MeshPhongMaterial({'color': 0x68bf5e, specular:'white', shininess:30}));
    treeLeaves.position.y = 0.8;
    tree.add(treeLeaves);

   

    //tanenbaum mitte
    const tree7 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027, specular:'white', shininess:30}));
    tree7.position.x = 0;
    tree7.position.y = -0.69;
    tree7.position.z = -2;
    scene.add(tree7);

    const treeLeaves9 = new Mesh(new ConeGeometry(0.5), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30}));
    treeLeaves9.position.y = 1.4;
    tree7.add(treeLeaves9);

    //treeLeaves4

    const treeLeaves10 = new Mesh(new ConeGeometry(0.58), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30})); 
    treeLeaves10.position.y = 0.9;
    tree7.add(treeLeaves10);

    //treeLeaves4

    const treeLeaves11 = new Mesh(new ConeGeometry(0.68), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30})); 
    treeLeaves11.position.y = 0.4;
    tree7.add(treeLeaves11);



    //Tree3
    const tree3 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshPhongMaterial({'color': 0x6e6027, specular:'white', shininess:30}));
    tree3.position.x = 2;
    tree3.position.y = -0.69;
    tree3.position.z = -2;
    scene.add(tree3);

    const treeLeaves3 = new Mesh(new ConeGeometry(0.5), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30}));
    treeLeaves3.position.y = 1.4;
    tree3.add(treeLeaves3);

    //treeLeaves4

    const treeLeaves4 = new Mesh(new ConeGeometry(0.58), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30}));
    treeLeaves4.position.y = 0.9;
    tree3.add(treeLeaves4);

    //treeLeaves5

    const treeLeaves5 = new Mesh(new ConeGeometry(0.68), new MeshPhongMaterial({'color': 0x0b8c16, specular:'white', shininess:30}));
    treeLeaves5.position.y = 0.4;
    tree3.add(treeLeaves5);
    
    const road = new Mesh(new BoxGeometry(6,0.1,2.5), new MeshPhongMaterial({'color': 0x919c8f, specular:'white', shininess:30}));
    road.position.y = -1.2;
    scene.add(road);

    const gras2 = new Mesh(new BoxGeometry(6,3,6), new MeshPhongMaterial({'color': 0x9ed492, specular:'white', shininess:30}));
    gras2.position.y = -2.7;
    scene.add(gras2);

    // const gras3 = new Mesh(new BoxGeometry(6,2,6), new MeshPhongMaterial({'color': 0x9ed492, specular:'white', shininess:30}));
    // gras3.position.y = -2.9;
    // scene.add(gras3);

    // carBody
    const carBody = new Mesh(new BoxGeometry(1.7,1.1,0.9), new MeshPhongMaterial({ 'color': 0xf2d70c, specular:'0xf2d70c', shinines:30 }));
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

   
    
    //cabSmall
    const carCab = new Mesh(new BoxGeometry(0.6,0.7,0.7), new MeshPhongMaterial({ 'color':0x3a3d3d,specular:'white', shinines:30}));
    // carCab.scale.set(1.5, 1.2, 1);
    carCab.position.y = 1;
    carCab.position.x = 0.0;
    carBody.add(carCab);

    
    // Cab
    const carCabSmall = new Mesh(new BoxGeometry(0.5,0.9,0.8), new MeshPhongMaterial({ 'color': 0xb09c4d,specular:'white', shinines:30}));
    // carCabSmall.scale.set(1.2, 1.0, 1);
    carCabSmall.position.y = 1;
    carCabSmall.position.x = 0.1;
    carBody.add(carCabSmall);
    
    // Wheels
    const wheel = new Mesh(new SphereGeometry(.3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shinines:30}));
    wheel.position.y = -0.4;
    wheel.position.x = -0.5;
    wheel.position.z = 0.6;
    carBody.add(wheel);

    // Wheels
    const wheel3 = new Mesh(new SphereGeometry( .3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shinines:30}));
    wheel3.position.y = -0.4;
    wheel3.position.x = 0.6;
    wheel3.position.z = 0.6;
    carBody.add(wheel3);

    // //wheelSmall
    // const wheelSmall = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial({'color': 0x30302e}));
    // wheelSmall.position.y = -0.5;
    // wheelSmall.position.x = -0.6;
    // carBody.add(wheelSmall);

    
    const wheel2 = new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shinines:30}));
    wheel2.position.y = -0.4;
    wheel2.position.x = -0.5;
    wheel2.position.z = -0.6;
    carBody.add(wheel2);

    const wheel4 = new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({'color': 0x424239,specular:'white', shinines:30}));
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


    

    
    //a point light 
    
    const pointLight = new PointLight(0xeeeeee); 
    scene.add(pointLight);


    pointLight.update =  createSimplePositionAnimation([ //bewegung.In diesem Fall scheint das Licht zwischen den beiden Positionen (0, 2, 0) und (0, 2, 2) zu animieren.
        new Vector3(0, 2, 0),
        new Vector3(0,2,2)
    ]);

    pointLight.add(new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({color:'white', specular:'white', shininess: 10})));// fügt object zum ganze szene hinzu
    

    
    const light1 = new AmbientLight(0xffffff); //große sphere oben 
    light1.position.z = -1.5;
    light1.position.y = 5;
    scene.add(light1);
    light1.add(new Mesh(new SphereGeometry(0.3), new MeshPhongMaterial({color:'white', specular:0xffffff, shininess: 10}))); // fügt object zum ganze szene hinzu

    light1.update = function(time){ //kugel bewegung mit dem auto bewegung
        const t = pingpong(time / 1000, 1); 
    if (t < 0.5) { //wechselt licht farbe von weis bis schwarz
        this.color.setHex(0x000000); 
    } else {
        this.color.setHex(0xffffff);
    }
    }

    const light2 = new PointLight(0xff0000);//rote licht 
    light2.position.x = -1; // position auf x koordinate
    carBody.add(light2); // fügt rote licht zum auto hinzu
    light2.add(new Mesh(new SphereGeometry(0.2), new MeshPhongMaterial({color:'red', specular:'white', emissive: 'red', shininess: 70})));// fügt object zum ganze szene hinzu

    

   

    
    // camera
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); //(grad/winkel, aspect ratio, Near Plane,Far Plane)
    scene.add(camera);
    camera.position.z = 5;
    camera.position.y = 2;

    // manual camera controls
    orbCtrl = new OrbitControls(camera, renderer.domElement);

    // function for drawing the scene
    function drawScene(time = 0) {

        // simple animation
        scene.traverse((obj) => { //Methode durchläuft alle Objekte in der Szene und führt eine angegebene Funktion für jedes Objekt aus. In diesem Fall wird eine anonyme Funktion für jedes Objekt in der Szene aufgerufen.
            if (typeof obj.update === 'function') {
                obj.update(time); // Diese Funktion ist verantwortlich für die Aktualisierung des Zustands oder der Animation des jeweiligen Objekts in der Szene.
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
    // camera controls
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


function createSimplePositionAnimation(positions) {

    const _positions = positions; // eine liste von positionen wird erstllt

    return function (time) {
        const t = pingpong(time / 1000, _positions.length - 1); //Hier wird die Zeit (time) durch 1000 geteilt, um sie in Sekunden umzuwandeln
        const p0 = _positions[Math.floor(t)];//Hier werden die beiden Positionen aus der _positions-Liste ausgewählt, zwischen denen die Interpolation stattfindet. 
        const p1 = _positions[Math.ceil(t)];
        this.position.lerpVectors(p0, p1, t - Math.floor(t)); //Methode aufgerufen, um die Position des 3D-Objekts schrittweise zwischen p0 und p1 zu interpolieren
    }

}

function createSimpleRotationAnimation(rotations) {

    const _rotations = []; //Hier wird ein leeres Array _rotations erstellt, das dazu verwendet wird, die resultierenden Quaternionen für die Animation der Rotation zu speichern.
    rotations.forEach(r => { // Die Funktion durchläuft jedes Element in der übergebenen Liste rotations, wobei r jedes einzelne Element repräsentiert.
        const q = new Quaternion(); //Innerhalb der Schleife wird geprüft, ob r ein Euler-Winkel (Euler) oder ein Quaternion (Quaternion) ist. Dies wird mit den Bedingungen r.isEuler und r.isQuaternion überprüft.
        if (r.isEuler) {//Wenn r ein Euler-Winkel ist (if (r.isEuler)), wird ein neues Quaternion q erstellt, 
            q.setFromEuler(r);
        } else if (r.isQuaternion) { //Wenn r ein Quaternion ist (else if (r.isQuaternion)), wird einfach eine Kopie von r in das Quaternion q kopiert.
            q.copy(r);
        } else {
            console.error('Unknown rotation type');
        }
        q.normalize(); //Das erstellte Quaternion q wird normalisiert, um sicherzustellen, dass es eine Einheitsrotation repräsentiert. Das bedeutet, dass die Länge des Quaternionen auf 1 gesetzt wird.
        _rotations.push(q); //Das normalisierte Quaternion q wird dem _rotations-Array hinzugefügt.
    });

    return function (time) { 
        const t = pingpong(time / 1000, _rotations.length - 1);//Die Zeit time wird durch 1000 geteilt, um sie in Sekunden umzuwandeln. Der Wert t wird verwendet, um zwischen den Quaternionen in der _rotations-Liste zu interpolieren.
        const q0 = _rotations[Math.floor(t)]; //Hier werden die beiden Quaternionen aus der _rotations-Liste ausgewählt
        const q1 = _rotations[Math.ceil(t)]; //bestimmt ein index
        this.quaternion.slerpQuaternions(q0, q1, 
            smoothstep(t - Math.floor(t), 0,1)); //Hier wird die slerpQuaternions-Methode aufgerufen, um die Rotation des 3D-Objekts schrittweise zwischen den Quaternionen q0 und q1 zu interpolieren/zu berechnen. 
}

}