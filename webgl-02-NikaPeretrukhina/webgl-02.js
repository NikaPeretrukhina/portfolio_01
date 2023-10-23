// User Interface
import GUI from './gop/lil-gui/lil-gui.module.min.js';
// Core
import { Object3D } from "./gop/core/Object3D.js";
import { Mesh } from "./gop/objects/Mesh.js";
import { Color } from "./gop/math/Color.js";
import { Matrix4 } from './gop/math/Matrix4.js';
import { WebGLProgram } from "./gop/core/WebGLProgram.js";
import { Camera } from "./gop/cameras/Camera.js";
// Geometries
import { CircleGeometry } from "./gop/geometries/CircleGeometry.js";
import { QuadGeometry } from "./gop/geometries/QuadGeometry.js";
import { TriangleGeometry } from "./gop/geometries/TriangleGeometry.js";
// Material
import { MeshBasicMaterial } from "./gop/materials/MeshBasicMaterial.js";


function getMeshesFromScene(scene){
    const meshes = [];
    scene.traverse((node) => {
        if(node.isMesh){
            meshes.push(node);
        }
    });

    return meshes;
}


function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', "canvas");
    canvas.style.display = 'block';
    canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight);
    var gl = canvas.getContext("webgl2");
    if (!gl) { throw new Error("WebGL 2 not supported!"); }
    document.body.appendChild(canvas);

    // setup GLSL program
    const program = new WebGLProgram(gl);

    //scene (graph)
    const scene = new Object3D();

    //background
    const background = new Mesh(new QuadGeometry(6,10), new MeshBasicMaterial({'color': 0xb1f7fc })); 
    scene.add(background);

    //tree
    const tree6 = new Mesh(new QuadGeometry(0.2,1), new MeshBasicMaterial({'color': 0x6e6027 }));
    tree6.position.x = -2;
    scene.add(tree6);

    const treeLeaves6 = new Mesh(new TriangleGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves6.position.y = 0.9;
    tree6.add(treeLeaves6);

    //treeLeaves4

    const treeLeaves7 = new Mesh(new TriangleGeometry(0.58), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves7.position.y = 0.6;
    tree6.add(treeLeaves7);

    //treeLeaves5

    const treeLeaves8 = new Mesh(new TriangleGeometry(0.68), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves8.position.y = 0.3;
    tree6.add(treeLeaves8);



    // tree1
    const tree = new Mesh(new QuadGeometry(0.2,1), new MeshBasicMaterial({'color': 0x6e6027 })); 
    tree.position.x = -1;
    scene.add(tree);

    //leaves1
    const treeLeavesSmall = new Mesh(new CircleGeometry(0.4), new MeshBasicMaterial({'color': 0x3b9131 })); 
    treeLeavesSmall.position.y = 1.0;
    treeLeavesSmall.position.x = 0.3;
    tree.add(treeLeavesSmall);

    //leaves1
    const treeLeavesSmall1 = new Mesh(new CircleGeometry(0.4), new MeshBasicMaterial({'color': 0x5cb352 })); 
    treeLeavesSmall1.position.y = 1.0;
    treeLeavesSmall1.position.x = -0.1;
    tree.add(treeLeavesSmall1);

    //leaves1
    const treeLeaves = new Mesh(new CircleGeometry(0.5), new MeshBasicMaterial({'color': 0x68bf5e})); 
    treeLeaves.position.y = 0.8;
    tree.add(treeLeaves);

   

    //tanenbaum mitte
    const tree7 = new Mesh(new QuadGeometry(0.2,1), new MeshBasicMaterial({'color': 0x6e6027 }));
    tree7.position.x = 0;
    scene.add(tree7);

    const treeLeaves9 = new Mesh(new TriangleGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves9.position.y = 0.9;
    tree7.add(treeLeaves9);

    //treeLeaves4

    const treeLeaves10 = new Mesh(new TriangleGeometry(0.58), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves10.position.y = 0.6;
    tree7.add(treeLeaves10);

    //treeLeaves4

    const treeLeaves11 = new Mesh(new TriangleGeometry(0.68), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves11.position.y = 0.3;
    tree7.add(treeLeaves11);


    //tree2
    const tree2 = new Mesh(new QuadGeometry(0.2,1), new MeshBasicMaterial({'color': 0x6e6027 }));
    tree2.position.x = 1;
    scene.add(tree2);

    //leaves2
    const treeLeavesSmall2 = new Mesh(new CircleGeometry(0.4), new MeshBasicMaterial({'color': 0x3b9131 })); 
    treeLeavesSmall2.position.y = 0.9;
    treeLeavesSmall2.position.x = 0.3;
    tree2.add(treeLeavesSmall2);

    //leaves2
    const treeLeavesSmall3 = new Mesh(new CircleGeometry(0.4), new MeshBasicMaterial({'color': 0x5cb352 })); 
    treeLeavesSmall3.position.y = 0.8;
    treeLeavesSmall3.position.x = -0.2;
    tree2.add(treeLeavesSmall3);

    //leaves2
    const treeLeaves2 = new Mesh(new CircleGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves2.position.y = 0.7;
    tree2.add(treeLeaves2);



    //tree3
    const tree3 = new Mesh(new QuadGeometry(0.2,1), new MeshBasicMaterial({'color': 0x6e6027 }));
    tree3.position.x = 2.5;
    scene.add(tree3);

    const treeLeaves3 = new Mesh(new TriangleGeometry(0.5), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves3.position.y = 0.9;
    tree3.add(treeLeaves3);

    //treeLeaves4

    const treeLeaves4 = new Mesh(new TriangleGeometry(0.58), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves4.position.y = 0.6;
    tree3.add(treeLeaves4);

    //treeLeaves5

    const treeLeaves5 = new Mesh(new TriangleGeometry(0.68), new MeshBasicMaterial({'color': 0x0b8c16 })); 
    treeLeaves5.position.y = 0.3;
    tree3.add(treeLeaves5);
    
    // Floor
    const gras = new Mesh(new QuadGeometry(6), new MeshBasicMaterial({'color': 0x9ed492 }));
   gras.position.y = -0.7;
    scene.add(gras);

    const road = new Mesh(new QuadGeometry(6), new MeshBasicMaterial({'color': 0x919c8f }));
    road.position.y = -0.9;
    scene.add(road);

    const gras2 = new Mesh(new QuadGeometry(6), new MeshBasicMaterial({'color': 0x9ed492 }));
    gras2.position.y = -1.9;
    scene.add(gras2);

    const gras3 = new Mesh(new QuadGeometry(6), new MeshBasicMaterial({'color': 0x9ed492 }));
    gras3.position.y = -2.9;
    scene.add(gras3);

    // carBody
    const carBody = new Mesh(new QuadGeometry(2,1), new MeshBasicMaterial({ 'color': 0xf2d70c }));
    carBody.scale.set(0.5, 0.5, 1);
    carBody.position.y = -0.8;
    scene.add(carBody);

   // Arm
    const arm1 = new Mesh(new QuadGeometry(0.2,.80), new MeshBasicMaterial({ 'color': 0x4f4e4c }));
    arm1.position.y = .6;
    arm1.position.x = .95;
    carBody.add(arm1);

    
    //armBodyCircle3
    const armCircle3 = new Mesh(new CircleGeometry(0.23), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle3.position.y = 0.4;
    armCircle3.position.x = 0.8;
    carBody.add(armCircle3);


    //armCircleSmal
    const armSmalCircle3 = new Mesh(new CircleGeometry(0.17), new MeshBasicMaterial({'color': 0x54534e }));
    armSmalCircle3.position.y = 0.4;
    armSmalCircle3.position.x = 0.8;
    carBody.add(armSmalCircle3);


   
    //arm2

    const arm2 = new Mesh(new QuadGeometry(0.2,1), new MeshBasicMaterial({ 'color': 0x4f4e4c }));
    arm2.position.y =.9;
    arm2.position.x = .20;
    arm2.rotation.z = -3;
    arm1.add(arm2);


    //armCircle
    const armCircle = new Mesh(new CircleGeometry(0.29), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle.position.y = 0.6;
    armCircle.position.x = -0.0;
    arm1.add(armCircle);

    
    //armCircleSmal
    const armSmalCircle = new Mesh(new CircleGeometry(0.20), new MeshBasicMaterial({'color': 0x54534e }));
    armSmalCircle.position.y = 0.6;
    arm1.add(armSmalCircle);

   

    const arm3 = new Mesh(new QuadGeometry(0.2,1), new MeshBasicMaterial({ 'color': 0x4f4e4c }));
    arm3.position.y = .8;
    arm3.position.x = .20;
    arm3.rotation.z = -.10;
    arm2.add(arm3);

   

    //armCircle1
    const armCircle1 = new Mesh(new CircleGeometry(0.29), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle1.position.y = 0.5;
    arm2.add(armCircle1);
    
    //armCircleSmal
    const armSmalCircle1 = new Mesh(new CircleGeometry(0.20), new MeshBasicMaterial({'color': 0x54534e }));
    armSmalCircle1.position.y = 0.5;
    arm2.add(armSmalCircle1);
    

    // quad at the end of the vehicle arm
    const quad = new Mesh(new QuadGeometry(0.5), new MeshBasicMaterial({ 'color': 0x42413e}));
    quad.position.y = .7;
    quad.position.x = .4;
    quad.rotation.z = -.7;
    arm3.add(quad);

    //armCircle2
    const armCircle2 = new Mesh(new CircleGeometry(0.25), new MeshBasicMaterial({'color': 0x262522 }));
    armCircle2.position.y = 0.4;
    arm3.add(armCircle2);

    //armCircleSmal2
    const armSmalCircle2 = new Mesh(new CircleGeometry(0.17), new MeshBasicMaterial({'color': 0x54534e }));
    armSmalCircle2.position.y = 0.4;
    arm3.add(armSmalCircle2);
    
    // Cab
    const carCab = new Mesh(new QuadGeometry(0.7), new MeshBasicMaterial({ 'color': 0xb09c4d }));
    carCab.scale.set(1.5, 1.2, 1);
    carCab.position.y = 1.1;
    carCab.position.x = 0.0;
    carBody.add(carCab);

    
    //cabSmall
    const carCabSmall = new Mesh(new QuadGeometry(0.7), new MeshBasicMaterial({ 'color': 0x3a3d3d }));
    carCabSmall.scale.set(1.2, 1.0, 1);
    carCabSmall.position.y = 1.1;
    carCabSmall.position.x = 0.1;
    carBody.add(carCabSmall);
    
    // Wheels
    const wheel = new Mesh(new CircleGeometry(0.3), new MeshBasicMaterial({'color': 0x424239}));
    wheel.position.y = -0.5;
    wheel.position.x = -0.6;
    carBody.add(wheel);

    //wheelSmall
    const wheelSmall = new Mesh(new CircleGeometry(0.1), new MeshBasicMaterial({'color': 0x30302e}));
    wheelSmall.position.y = -0.5;
    wheelSmall.position.x = -0.6;
    carBody.add(wheelSmall);

    
    const wheel2 = new Mesh(new CircleGeometry(0.3), new MeshBasicMaterial({'color': 0x424239}));
    wheel2.position.y = -0.5;
    wheel2.position.x = 0.6;
    carBody.add(wheel2);

    //wheelSmall
    const wheelSmall2 = new Mesh(new CircleGeometry(0.1), new MeshBasicMaterial({'color': 0x30302e}));
    wheelSmall2.position.y = -0.5;
    wheelSmall2.position.x = 0.6;
    carBody.add(wheelSmall2);

    //camera
    const camera = new Camera();
    carBody.add(camera);
    camera.scale.set(4,4,4);
    
    // Draw the scene.
    function drawScene(time = 0) {
        // Define the size of the WebGL window/view on the canvas in pixel
        // maps NDC to window coordinates
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(controls.background.r, controls.background.g, controls.background.b, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        program.use();

        //Animation
        carBody.position.x = Math.sin(time/1000); //das Fahrzeug von links nach rechts schwingt.
        const maxRotation = Math.PI / 4; //verwendet, um die maximale Rotation bestimmter Teile des Fahrzeugs zu begrenzen.
        const quarterRotation = -maxRotation / 2; //Dies wird ebenfalls für die Begrenzung der Rotation verwendet.

        /*Die Rotation wird auf den kleineren Wert zwischen dem Sinus von time / 500 und quarterRotation begrenzt.
         Dies begrenzt die Rotation des Arms auf 45 Grad im Bogenmaß oder weniger.*/
        arm1.rotation.z = Math.min(Math.sin(time / 500), quarterRotation); 
        arm2.rotation.z = Math.min(Math.sin(time / 500), quarterRotation); 
        arm3.rotation.z = Math.min(Math.sin(time / 500), quarterRotation);
        wheel.rotation.z = time / 500; // begrenzung für wheel
        wheel2.rotation.z = time / 500;

        scene.updateMatrixWorld(); // überprüft ob alle objekte richtige position haben
        program.setUniform("viewMatrix", camera.matrixWorldInverse); //Weltansichtsmatrix der Kamera 

        //draw/rendern all meshes from our scene
        const meshes = getMeshesFromScene(scene);
        meshes.forEach((mesh) => {
            mesh.updateMatrix();
            program.setUniform("modelMatrix", mesh.matrixWorld);
            mesh.material.setupMaterialUniforms(program);
            mesh.geometry.draw(gl);
        });

        // ask for a redraw every time we are done!
        requestAnimationFrame(drawScene);
    }


    // macht ein setting in web browser für background color
    var controls = {
        'background': new Color(0xffffff),
    };

    drawScene(); // draw the scene once

    // ------------------------------------------------------------------------------------
    // GUI below (to ignore)
    // ------------------------------------------------------------------------------------
    
    var gui = new GUI();
    /*diese teil wird immer in browser window gezeigt werden*/
    const transformationFolder = gui.addFolder("Object transformations");//Es erstellt einen Ordner in der GUI-Oberfläche mit der Bezeichnung "Objekttransformationen"
    const translationFolder = transformationFolder.addFolder('translation'); ////für translation zu zeigen
    translationFolder.add(quad.position, 'x', -1, 1);
    translationFolder.add(quad.position, 'y', -1, 1);
    transformationFolder.add(quad.scale, 'x', -1, 1).onChange((val) => { quad.scale.y = val; }).name('scale');//Diese Steuerung ermöglicht es, das Quad-Objekt entlang der x-Achse zu bewegen.
    transformationFolder.close();

    if (typeof camera !== 'undefined' && camera.isCamera) { //Dieser Code prüft, ob ein camera-Objekt vorhanden ist und ob es vom Typ "Camera" ist.
        const folder = gui.addFolder("Camera transformations");
        const translFolder = folder.addFolder('translation');
        translFolder.add(camera.position, 'x', -1, 1); //Diese Steuerung ermöglicht es Ihnen, die x-Position der Kamera im Bereich von -1 bis 1 anzupassen.
        translFolder.add(camera.position, 'y', -1, 1);
        folder.add(camera.rotation, 'z', -Math.PI, Math.PI).name('rotation'); //Rotation der Kamera um die z-Achse im Bereich von -π bis π an.
        
        /*Kamera im Bereich von 0 bis 10 an.
         Ähnlich wie bei der Skalierung des Objekts hat sie auch eine onChange-Rückruffunktion, 
         um die y-Skalierung synchron zu halten.*/ 
        folder.add(camera.scale, 'x', 0, 10).onChange((val) => { camera.scale.y = val; }).name('scale');
        folder.close();
    }

    gui.addColor(controls, 'background');
}

main(); // start everything!