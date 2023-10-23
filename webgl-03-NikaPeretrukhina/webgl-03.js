// Core & Math
import { Color } from "./gop/math/Color.js";
import { MeshBasicMaterial } from "./gop/materials/MeshBasicMaterial.js";
import { Mesh } from "./gop/objects/Mesh.js";
import { WebGLRenderer } from "./gop/renderers/WebGLRenderer.js";
import { Object3D } from "./gop/core/Object3D.js";
import { Vector3 } from "./gop/math/Vector3.js";
import { Euler } from "./gop/math/Euler.js";
import { Quaternion } from "./gop/math/Quaternion.js";
import { lerp, damp, pingpong, smoothstep, smootherstep, clamp, sinc } from './gop/math/MathUtils.js';
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


var orbCtrl = null; // global variable for camera control

// some settings that can be changed with the GUI
const controls = { //Steuerungsoptionen
    'background': new Color(0xffffff),
    'camera': 'manual', // the camera animation/movement mode
    'duration': 3, // Der Standardwert ist 3 Sekunden, was bedeutet, dass Animationen standardmäßig über einen Zeitraum von 3 Sekunden ablaufen
};

// function createPositionAnimation(positions, camera, carBody) {
//     camera.lookAt(carBody)
//     const _positions = positions;
//     return function positionAnimation(time = 0) {
//     const t = pingpong(time / 1000, _positions.length - 1);
//     const p0 = _positions[Math.floor(t)];
//     const p1 = _positions[Math.ceil(t)];
//     this.position.lerpVectors(p0, p1, smoothstep(-Math.floor(t) + t, 0, 1));
//     };
// }


function main() {

    // OOP WebGLRenderer
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //scene (graph)
    const scene = new Object3D();

    // //background
    // const background = new Mesh(new BoxGeometry(6,10), new MeshBasicMaterial({'color': 0xb1f7fc })); 
    // scene.add(background);



    //Tree_correct
    const tree6 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshBasicMaterial({'color': 0x6e6027 }));
    tree6.position.x = -2;
    tree6.position.y = -0.69;
    tree6.position.z = -2;
    scene.add(tree6);

    const treeLeaves6 = new Mesh(new ConeGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves6.position.y = 1.4;
    tree6.add(treeLeaves6);

    //treeLeaves4

    const treeLeaves7 = new Mesh(new ConeGeometry(0.58), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves7.position.y = 0.9;
    tree6.add(treeLeaves7);

    //treeLeaves5

    const treeLeaves8 = new Mesh(new ConeGeometry(0.65), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves8.position.y = 0.4;
    tree6.add(treeLeaves8);



    // Tree_correct
    const tree = new Mesh(new CylinderGeometry(0.1,0.1), new MeshBasicMaterial({'color': 0x6e6027 })); 
    tree.position.x = -2;
    tree.position.y = -0.69;
    tree.position.z = 2;
    scene.add(tree);

    //leaves1
    const treeLeavesSmall = new Mesh(new SphereGeometry(0.4), new MeshBasicMaterial({'color': 0x3b9131 })); 
    treeLeavesSmall.position.y = 1.0;
    treeLeavesSmall.position.x = 0.3;
    tree.add(treeLeavesSmall);

    //leaves1
    const treeLeavesSmall1 = new Mesh(new SphereGeometry(0.4), new MeshBasicMaterial({'color': 0x5cb352 })); 
    treeLeavesSmall1.position.y = 1.0;
    treeLeavesSmall1.position.x = -0.1;
    tree.add(treeLeavesSmall1);

    //leaves1
    const treeLeaves = new Mesh(new SphereGeometry(0.5), new MeshBasicMaterial({'color': 0x68bf5e})); 
    treeLeaves.position.y = 0.8;
    tree.add(treeLeaves);

   

    //tanenbaum mitte
    const tree7 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshBasicMaterial({'color': 0x6e6027 }));
    tree7.position.x = 0;
    tree7.position.y = -0.69;
    tree7.position.z = -2;
    scene.add(tree7);

    const treeLeaves9 = new Mesh(new ConeGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves9.position.y = 1.4;
    tree7.add(treeLeaves9);

    //treeLeaves4

    const treeLeaves10 = new Mesh(new ConeGeometry(0.58), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves10.position.y = 0.9;
    tree7.add(treeLeaves10);

    //treeLeaves4

    const treeLeaves11 = new Mesh(new ConeGeometry(0.68), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves11.position.y = 0.4;
    tree7.add(treeLeaves11);


    // //Tree2
    // const tree2 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshBasicMaterial({'color': 0x6e6027 }));
    // tree2.position.x = 2;
    // tree2.position.y = -0.69;
    // tree2.position.z = 2;
    // scene.add(tree2);

    // //leaves2
    // const treeLeavesSmall2 = new Mesh(new SphereGeometry(0.4), new MeshBasicMaterial({'color': 0x3b9131 })); 
    // treeLeavesSmall2.position.y = 1;
    // treeLeavesSmall2.position.x = 0.3;
    // tree2.add(treeLeavesSmall2);
    // //leaves2
    // const treeLeavesSmall3 = new Mesh(new SphereGeometry(0.4), new MeshBasicMaterial({'color': 0x5cb352 })); 
    // treeLeavesSmall3.position.y = 0.9;
    // treeLeavesSmall3.position.x = -0.2;
    // tree2.add(treeLeavesSmall3);

    // //leaves2
    // const treeLeaves2 = new Mesh(new SphereGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    // treeLeaves2.position.y = 0.8;
    // tree2.add(treeLeaves2);



    //Tree3
    const tree3 = new Mesh(new CylinderGeometry(0.1,0.1), new MeshBasicMaterial({'color': 0x6e6027 }));
    tree3.position.x = 2;
    tree3.position.y = -0.69;
    tree3.position.z = -2;
    scene.add(tree3);

    const treeLeaves3 = new Mesh(new ConeGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves3.position.y = 1.4;
    tree3.add(treeLeaves3);

    //treeLeaves4

    const treeLeaves4 = new Mesh(new ConeGeometry(0.58), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves4.position.y = 0.9;
    tree3.add(treeLeaves4);

    //treeLeaves5

    const treeLeaves5 = new Mesh(new ConeGeometry(0.68), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves5.position.y = 0.4;
    tree3.add(treeLeaves5);
    
//     // Floor
//     const gras = new Mesh(new BoxGeometry(6,0,6), new MeshBasicMaterial({'color': 0x9ed492 }));
//    gras.position.y = -0.7;
//     scene.add(gras);

    const road = new Mesh(new BoxGeometry(6,0.1,2.5), new MeshBasicMaterial({'color': 0x919c8f }));
    road.position.y = -1.2;
    scene.add(road);

    const gras2 = new Mesh(new BoxGeometry(6,3,6), new MeshBasicMaterial({'color': 0x9ed492 }));
    gras2.position.y = -2.7;
    scene.add(gras2);

    // const gras3 = new Mesh(new BoxGeometry(6,2,6), new MeshBasicMaterial({'color': 0x9ed492 }));
    // gras3.position.y = -2.9;
    // scene.add(gras3);

    // carBody
    const carBody = new Mesh(new BoxGeometry(1.7,1.1,0.9), new MeshBasicMaterial({ 'color': 0xf2d70c }));
    // carBody.scale.set(0.5, 0.5, 1);
    carBody.position.y = -0.5;
    carBody.rotation.y = - 45 * Math.PI / 180;
    scene.add(carBody);

   // Arm
    const arm1 = new Mesh(new BoxGeometry(0.2,0.8,0.2), new MeshBasicMaterial({ 'color': 0x4f4e4c }));
    arm1.position.y = .6;
    arm1.position.x = .95;
    carBody.add(arm1);

    
    //armBodyCircle3
    const armCircle3 = new Mesh(new SphereGeometry(0.3), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle3.position.y = 0.6;
    armCircle3.position.x = 0.9;
    carBody.add(armCircle3);


    // //armCircleSmal
    // const armSmalCircle3 = new Mesh(new SphereGeometry(0.23), new MeshBasicMaterial({'color': 0x54534e }));
    // armSmalCircle3.position.y = 0.5;
    // armSmalCircle3.position.x = 0.8;
    // carBody.add(armSmalCircle3);


   
    //arm2

    const arm2 = new Mesh(new BoxGeometry(0.2,0.8,0.2), new MeshBasicMaterial({ 'color': 0x4f4e4c }));
    arm2.position.y =.9;
    arm2.position.x = .20;
    arm2.rotation.z = -3;
    arm1.add(arm2);


    //armCircle
    const armCircle = new Mesh(new SphereGeometry(0.29), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle.position.y = 0.6;
    armCircle.position.x = -0.0;
    arm1.add(armCircle);

    
    //armCircleSmal
    const armSmalCircle = new Mesh(new SphereGeometry(0.20), new MeshBasicMaterial({'color': 0x54534e }));
    armSmalCircle.position.y = 0.6;
    arm1.add(armSmalCircle);

   

    const arm3 = new Mesh(new BoxGeometry(0.2,0.8,0.2), new MeshBasicMaterial({ 'color': 0x4f4e4c }));
    arm3.position.y = .8;
    arm3.position.x = .20;
    arm3.rotation.z = -.10;
    arm2.add(arm3);

   

    //armCircle1
    const armCircle1 = new Mesh(new SphereGeometry(0.29), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle1.position.y = 0.5;
    arm2.add(armCircle1);
    
    //armCircleSmal
    const armSmalCircle1 = new Mesh(new SphereGeometry(0.20), new MeshBasicMaterial({'color': 0x54534e }));
    armSmalCircle1.position.y = 0.5;
    arm2.add(armSmalCircle1);
    

    // quad at the end of the vehicle arm
    const quad = new Mesh(new BoxGeometry(0.3,0.4,0.9), new MeshBasicMaterial({ 'color': 0x42413e}));
    quad.position.y = .8;
    quad.position.x = .1;
    quad.rotation.z = -.7;
    arm3.add(quad);

    //armCircle2
    const armCircle2 = new Mesh(new SphereGeometry(0.25), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle2.position.y = 0.4;
    arm3.add(armCircle2);

    //armCircleSmal2
    const armSmalCircle2 = new Mesh(new SphereGeometry(0.17), new MeshBasicMaterial({'color': 0x54534e }));
    armSmalCircle2.position.y = 0.4;
    arm3.add(armSmalCircle2);
    
    //cabSmall
    const carCab = new Mesh(new BoxGeometry(0.6,0.7,0.7), new MeshBasicMaterial({ 'color':0x3a3d3d  }));
    // carCab.scale.set(1.5, 1.2, 1);
    carCab.position.y = 1;
    carCab.position.x = 0.0;
    carBody.add(carCab);

    
    // Cab
    const carCabSmall = new Mesh(new BoxGeometry(0.5,0.9,0.8), new MeshBasicMaterial({ 'color': 0xb09c4d }));
    // carCabSmall.scale.set(1.2, 1.0, 1);
    carCabSmall.position.y = 1;
    carCabSmall.position.x = 0.1;
    carBody.add(carCabSmall);
    
    // Wheels
    const wheel = new Mesh(new SphereGeometry(.3), new MeshBasicMaterial({'color': 0x424239}));
    wheel.position.y = -0.4;
    wheel.position.x = -0.5;
    wheel.position.z = 0.6;
    carBody.add(wheel);

    // Wheels
    const wheel3 = new Mesh(new SphereGeometry( .3), new MeshBasicMaterial({'color': 0x424239}));
    wheel3.position.y = -0.4;
    wheel3.position.x = 0.6;
    wheel3.position.z = 0.6;
    carBody.add(wheel3);

    // //wheelSmall
    // const wheelSmall = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial({'color': 0x30302e}));
    // wheelSmall.position.y = -0.5;
    // wheelSmall.position.x = -0.6;
    // carBody.add(wheelSmall);

    
    const wheel2 = new Mesh(new SphereGeometry(0.3), new MeshBasicMaterial({'color': 0x424239}));
    wheel2.position.y = -0.4;
    wheel2.position.x = -0.5;
    wheel2.position.z = -0.6;
    carBody.add(wheel2);

    const wheel4 = new Mesh(new SphereGeometry(0.3), new MeshBasicMaterial({'color': 0x424239}));
    wheel4.position.y = -0.4;
    wheel4.position.x = 0.6;
    wheel4.position.z = -0.6;
    carBody.add(wheel4);

    // //wheelSmall
    // const wheelSmall2 = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial({'color': 0x30302e}));
    // wheelSmall2.position.y = -0.5;
    // wheelSmall2.position.x = 0.6;
    // carBody.add(wheelSmall2);

    //camera
    // const camera = new PerspectiveCamera(50, 1, 0.1, 100);
    // camera.position.set(0,0,5);
    // camera.lookAt(0,0,0);

    let camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;        
    camera.lookAt(scene.position);
    scene.add(camera);


    //carBody.add(camera);
    //camera.scale.set(4,4,4);

    // orbCtrl = new OrbitControls( camera, renderer.domElement );
    orbCtrl = new OrbitControls(camera, renderer.domElement);
    orbCtrl.update();

    // const camera2 = new Camera();
    // scene.add(camera2);

    // Draw the scene.
    function drawScene(time = 0) {

        scene.traverse((object) => {
            if (object.update) {
                object.update(time);
            }
        });

        //Animation
        carBody.position.x = Math.sin(time/1000 / (controls.duration / 6));
        carBody.position.z = Math.sin(time/1000 / (controls.duration / 6));
        const maxRotation = Math.PI / 4; 
        const quarterRotation = -maxRotation / 2; 
        arm1.rotation.z = Math.min(Math.sin(time / 500 / (controls.duration / 6)), quarterRotation);
        arm2.rotation.z = Math.min(Math.sin(time / 500 / (controls.duration / 6)), quarterRotation);
        arm3.rotation.z = Math.min(Math.sin(time / 500 / (controls.duration / 6)), quarterRotation);
        wheel.rotation.z = time / 500 / (controls.duration / 6);
        wheel2.rotation.z = time / 500 / (controls.duration / 6);

        //draw all meshes from our scene
        // render everything!
        renderer.render(scene, camera);

        // ask for a redraw every time we are done!
        requestAnimationFrame(drawScene);
    }
     
    // this gets called as callback from the GUI when you change the Camera Animation
    function changeCameraAnimation(mode = 'manual') {

        //console.log(`changeCameraAnimation: switching camera into ${mode} mode`);

        if (mode === 'manual' && orbCtrl !== null) { //wenn nicht null dann wird folgende code benutzt, das bedeutet wenn wir eine von camera wählen 

            orbCtrl.enabled = true;
            camera.update = undefined;
            if (camera.parent) camera.parent.remove(camera); //Hier wird überprüft, ob die Kamera ein übergeordnetes Objekt (parent) hat, und wenn dies der Fall ist, wird die Kamera aus diesem übergeordneten Objekt entfernt.
            orbCtrl.update(); // aktualisierung

        } else {

            if (orbCtrl !== null) orbCtrl.enabled = false;
            scene.add(camera);

            switch (mode) {
                case 'path_A':
                    setCameraToDefault(camera);
                    // Todo: animate camera path
                    //const radius = 12;
                    //const cameraSpeed1 = 0.001;
                    camera.position.set(0, 3, 8); //(x,y,z) kamera position
                    
                    //camera.position.z = 8;
                    camera.update = function () {
                        //this.position.x = (Math.sin (time * cameraSpeed1) * controls.duration)/ radius;
                        //this.position.z = Math.cos(time * cameraSpeed1 / controls.duration) * radius;
                        camera.translateX(0.02 * controls.duration ); //0.02  - konstante geschwindigkeit auf x achse. controls.duration - deutet darauf hin, dass die Geschwindigkeit der Kamera von der Dauer der Animation abhängt.
                        this.lookAt(scene.position); //Diese Zeile bewirkt, dass die Kamera auf den Punkt in der Szene schaut, der durch scene.position repräsentiert wird. Dies bedeutet, dass die Kamera ihre Ausrichtung so ändert, dass sie auf diesen Punkt gerichtet ist.
                    }
                break;

                case 'path_B': //buttom path b
                    setCameraToDefault(camera); // setz Kamera auf eine Standardkonfiguration zurück
                    // Todo: animate camera path
                    const pathB = [ //array. eine Reihe von 3d Position Vektoren 
                        new Vector3(-11,5,-6),
                        new Vector3(-2,1,3),
                        new Vector3(7.5,3,5)
                    ];

                    const cameraSpeed2 = 0.0010; // Kamera geschwindigkeit
                    camera.update = function(time){
                        let t = time * cameraSpeed2 / controls.duration; //controls.duration - aufruf von controls standart animation geschwindigkeit 3 sec
                        let index = Math.floor(t);// : Hier wird index berechnet, indem t auf die nächstkleinere ganze Zahl abgerundet wird. Dieser Index wird verwendet, um die Positionen im pathB-Array auszuwählen.
                        let w = t - index; // Hier wird w berechnet, das den Anteil der Animation innerhalb des aktuellen Segments zwischen den Punkten p0 und p1 darstellt.
                        
                        const p0 = pathB[index % pathB.length]; //Hier werden die Positionen p0 und p1 aus dem pathB-Array ausgewählt, indem der Index modulo der Länge des Arrays genommen wird. Dies ermöglicht eine zyklische Animation, wenn t den Bereich des Arrays überschreitet.
                        const p1 = pathB[(index + 1) % pathB.length];
                        this.position.lerpVectors(p0,p1,smoothstep(w,0,1)); //Methode verwendet, um die Position der Kamera zwischen den Positionen p0 und p1 zu interpolieren. Der Parameter w bestimmt den Fortschritt zwischen den beiden Positionen. smoothstep(w, 0, 1) ist wahrscheinlich eine Funktion, die eine glatte Interpolation zwischen den Positionen ermöglicht.

                        this.lookAt(carBody.position);
                    }
                break;
              
                case 'path_C': 
                    setCameraToDefault(camera); // setz Kamera auf eine Standardkonfiguration zurück
                    // Todo: animate camera path
                    camera.update = undefined; //Kamera bleibt wahrscheinlich in einer statischen Position.
                    carBody.add(camera); //kamera bewegt sich mit dem Auto
                    camera.position.set(0.3, 3.16, 5.52);//(x,y,z) kamera position
                break;
            }
        }
    }

    changeCameraAnimation();


    requestAnimationFrame(drawScene); // draw the scene once

    // ------------------------------------------------------------------------------------
    // GUI below (to ignore)
    // ------------------------------------------------------------------------------------
    var gui = new GUI();
    gui.addColor(controls, 'background').name('Background Color').onChange(() => {
        renderer.setClearColor(controls.background, 1.0);
    });

    gui.add(controls, 'duration', 1, 15).listen().name('Animation Duration');

    gui.add(controls, 'camera', ['manual', 'path_A', 'path_B', 'path_C'])
        .onChange(changeCameraAnimation).name('Camera Animation');

        /*diese teil wird immer in browser window gezeigt werden*/
    if (typeof camera !== 'undefined' && camera.isCamera) { //übeprüft ob Kamera difiniert ist
        const folder = gui.addFolder("Camera Transformation"); //new steurungen in web browser "buttom"
        const translFolder = folder.addFolder('translation'); // was drin in "Camera Transformation"
        translFolder.add(camera.position, 'x', -10, 10).listen();
        translFolder.add(camera.position, 'y', -10, 10).listen();
        translFolder.add(camera.position, 'z', -10, 10).listen();
        folder.add(camera.rotation, 'x', -Math.PI, Math.PI).listen().name('rotation x');
        folder.add(camera.rotation, 'y', -Math.PI, Math.PI).listen().name('rotation y');
        folder.add(camera.rotation, 'z', -Math.PI, Math.PI).listen().name('rotation z');
        folder.add(camera.scale, 'x', 0, 10).listen().onChange(
            (val) => { camera.scale.y = camera.scale.z = val; }).name('scale');
        folder.close();
    }
}

main(); // start everything!

function setCameraToDefault(camera) {
    camera.position.z = 5;
    camera.position.y = 2;   
}