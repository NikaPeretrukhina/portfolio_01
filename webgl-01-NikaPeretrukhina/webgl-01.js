import GUI from './gop/lil-gui/lil-gui.module.min.js';
import {Matrix4} from "./gop/math/Matrix4.js";
import {Color} from "./gop/math/Color.js";
import {WebGLProgram} from "./gop/core/WebGLProgram.js";
import { QuadGeometry } from './gop/core/QuadGeometry.js';
import {StarGeometry} from "./gop/core/StarGeometry.js";

function main() {

    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', "canvas");
    canvas.style.display = 'block';
    canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight);
    let gl = canvas.getContext("webgl2");


    if (!gl) {// zeichnet Grafiken im Webbrowser
        return;
    }
    
    document.body.appendChild(canvas);

    const wglProgram = new WebGLProgram(gl);




    // Draw the scene.
    function drawScene() {

        // Define the size of the WebGL window/view on the canvas in pixel
        // maps NDC to window coordinates
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(controls.background.r, controls.background.g, controls.background.b, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Compute the transformation matrix
       // erstellt und manipuliert eine 4x4-Matrix
        let matrix = new Matrix4();
        matrix = matrix.multiply(new Matrix4().makeTranslation(controls.translation.x, controls.translation.y, 0));
        matrix = matrix.multiply(new Matrix4().makeRotationZ(controls.angleInRadians));
        matrix = matrix.multiply(new Matrix4().makeScale(controls.scale.x, controls.scale.y, 1));

        // Tell it to use our program (pair of shaders)
        wglProgram.use();

        wglProgram.setUniform("modelMatrix", matrix); // set matrix
        wglProgram.setUniform("color", controls.color); // set color


        // Colors
        const black = new Color (0x000000);
        const white = new Color(0xfef8ff);
        const red = new Color(0xf50006);
        const yellow = new Color(0xFEF421);
        const green = new Color(0x67CD34);
        const blue = new Color(0x3500ea);


        // Draw Shapes

        // Österreich
        const redQuad1 = new QuadGeometry(-0.5, 0.8, 0.5, 0.8, -0.5, 0.2, 0.5, 0.2, red);
        const whiteQuad2 = new QuadGeometry(-0.5, 0.6, 0.5, 0.6, -0.5, 0.4, 0.5, 0.4, white);
       
    

        // Ukraine Flag
        
        const flagYel = new QuadGeometry(-0.9, -0.7, 0.02, -0.7, -0.9, -0.3, 0.02, -0.4, yellow);//(x,y,x1,y1,x2,y2,x3,y3, color)
        const flagBl = new QuadGeometry(-0.9, -0.1, 0.02, -0.1, -0.9, -0.4, 0.02, -0.4, blue );
        
        
        
        // Gradient Flag mit stern
        const gradient1 = new QuadGeometry(0.9, -0.1, 0.1, -0.1, 0.9, -0.7, 0.1, -0.7,  black, yellow, blue, red); // farbe für jeder punkt in quad
        const star = new StarGeometry(0.5, -0.4, 0.1, 0.2, white); //(x1, y1, r1, r2, color1)

        
        redQuad1.draw(gl);
        whiteQuad2.draw(gl);
    
        flagYel.draw(gl);
        flagBl.draw(gl);
        

        gradient1.draw(gl);
        star.draw(gl);

       
    }


    // eine Objekt mit Steuerelementen 
    let controls = {
        'translation': {'x': 0.0, 'y': 0.0},
        'angleInRadians': 0,
        'scale': {'x': 1, 'y': 1},
        'color': new Color(0xff0000),
        'background': new Color(0xffffff),
    };


    drawScene(); // draw the scene once

    // ------------------------------------------------------------------------------------
    // GUI below
    // ------------------------------------------------------------------------------------

    let gui = new GUI();
    const transFolder = gui.addFolder('translation'); //für translation zu zeigen
    transFolder.add(controls.translation, 'x', -1, 1).onChange(drawScene); //unsere Background ist von -1 bis 1 beim x Achse
    transFolder.add(controls.translation, 'y', -1, 1).onChange(drawScene);//unsere Background ist von -1 bis 1 beim y Achse
    transFolder.open(); //Steuerelemente für die Translation standardmäßig sichtbar sind.
    gui.add(controls, 'angleInRadians', 0.0, 2.0 * Math.PI).onChange(drawScene); //0 und 2π (360 Grad) zulässt
    const scaleFolder = gui.addFolder('scale');
    scaleFolder.add(controls.scale, 'x', -1, 1).onChange(drawScene); //in bereich von -1 bis 1 wird gezeigt
    scaleFolder.add(controls.scale, 'y', -1, 1).onChange(drawScene);
    scaleFolder.open();
    gui.addColor(controls, 'color').onChange(drawScene); //Ein Farbauswahl-Steuerelement wird hinzugefügt, um die Farbe von Grafikobjekten zu ändern
    gui.addColor(controls, 'background').onChange(drawScene);

}
main(); // start everything!