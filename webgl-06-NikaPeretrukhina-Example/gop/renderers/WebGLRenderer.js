import { Matrix4 } from '../math/Matrix4.js';
import { Matrix3 } from '../math/Matrix3.js';
import { Vector3 } from '../math/Vector3.js';
import { Vector4 } from '../math/Vector4.js';
import { Color } from '../math/Color.js';
import { WebGLProgram } from '../core/WebGLProgram.js';
import { Camera } from '../cameras/Camera.js';
import { PointLight } from '../lights/PointLight.js';


function createCanvasElement() {

	const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', "canvas");
	canvas.style.display = 'block';
	return canvas;

}

class WebGLRenderer {

	constructor(parameters = {}) {

		const _canvas = parameters.canvas !== undefined ? parameters.canvas : createCanvasElement(),
			_context = parameters.context !== undefined ? parameters.context : null;


		// public properties
		this._canvas = _canvas;

		// clearing

		this.autoClear = true;
		this.autoClearColor = true;
		this.autoClearDepth = true;


		// canvas properties

		this._width = _canvas.width;
		this._height = _canvas.height;

		this._pixelRatio = 1;

		this._viewport = new Vector4(0, 0, this._width, this._height);



		// initialize

		this._gl = _context;
		if (this._gl === null) {
			this._gl = this.initContext();
		}

		// WebGLProgram (i.e. the shaders)
		this._program = new WebGLProgram(this._gl);
	}

	get domElement() {
		return this._canvas;
	}

	initContext() {

		const context = this.domElement.getContext("webgl2");
			//premultipliedAlpha: false  // Ask for non-premultiplied alpha [https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html]
		
		return context;
	}



	// API
	getContext() {

		return this._gl;

	}

	getPixelRatio() {

		return this._pixelRatio;

	}

	setPixelRatio(value) {

		if (value === undefined) return;

		this._pixelRatio = value;

		this.setSize(_width, _height, false);

	}

	getSize(target) {

		return target.set(this._width, this._height);

	}

	setSize(width, height, updateStyle) {

		this._width = width;
		this._height = height;

		this._canvas.width = Math.floor(width * this._pixelRatio);
		this._canvas.height = Math.floor(height * this._pixelRatio);

		if (updateStyle !== false) {

			this._canvas.style.width = width + 'px';
			this._canvas.style.height = height + 'px';

		}

		this.setViewport(0, 0, width, height);

	}

	getViewport(target) {

		return target.copy(this._viewport);

	}

	setViewport(x, y, width, height) {

		this._viewport.set(x, y, width, height);
	}




	// Clearing

	setClearColor(value = new Color(0x000000), alpha = 1) {

		this._gl.clearColor(value.r, value.g, value.b, alpha);

	}


	clear(color = true, depth = true) {

		let bits = 0;

		if (color) bits |= this._gl.COLOR_BUFFER_BIT;
		if (depth) bits |= this._gl.DEPTH_BUFFER_BIT;

		this._gl.clear(bits);

	}

	clearColor() {

		this.clear(true, false, false);
	}

	clearDepth() {

		this.clear(false, true, false);
	}




	// Rendering
	render(scene, camera) {


		// update world/model matrices in scene graph
		scene.updateMatrixWorld(true);

		// set the viewport and enable the depth test
		this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
		this._gl.enable(this._gl.DEPTH_TEST);
		// enable blending and set blending function
		this._gl.enable(this._gl.BLEND);
		this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
		// enable backface culling (back faces are culled)
		this._gl.enable(this._gl.CULL_FACE);
		// activate the shader program
		this._program.use();

		// clear first if autoClear is enabled
		if (this.autoClear === true) this.clear(this.autoClearColor, this.autoClearDepth);


		const meshes = [];
		const transparentMeshes = [];
		const lights = [];

		// traverse the scene and get all meshes and lights
		scene.traverse(function (object) {

			if (object.isMesh === true
				&& object.geometry !== undefined && object.geometry.isBufferGeometry === true
				&& object.material !== undefined && object.material.isMaterial === true) {

				
				if(object.material.transparent === true){
					transparentMeshes.push(object);
				}else{
					meshes.push(object);
				}
				
			

			} else if (object.isLight === true) {

				lights.push(object);

			}
		});


		this.setupLights(lights, camera);
		this.renderMeshes(meshes, camera);
		this.renderMeshes(transparentMeshes, camera);
		// TODO: handle transparent objects

	}

	renderMeshes(meshes, camera) {

		const gl = this._gl;
		const program = this._program;

		camera.updateMatrixWorld(); // just update again, if camera is not part of the scene graph!
		const viewMatrix = camera.matrixWorldInverse;
		program.setUniform('viewMatrix', viewMatrix);

		const projectionMatrix = camera.projectionMatrix;
		program.setUniform('projectionMatrix', projectionMatrix);


		meshes.forEach(mesh => {

			// model, modelView and normal Matrix change for every mesh
			const matrix = mesh.matrixWorld;
			program.setUniform('modelMatrix', matrix);

			const modelViewMatrix = new Matrix4().multiplyMatrices(viewMatrix, matrix);
			const normalMatrix = new Matrix3().getNormalMatrix(modelViewMatrix);
			program.setUniform('normalMatrix', normalMatrix);

			mesh.material.setupMaterialUniforms(program);

			// everything is set up, now draw the mesh
			mesh.geometry.draw(gl);
		});

	}

	setupLights(lights, camera) {

		const program = this._program;
		const gl = this._gl;

		const viewMatrix = camera.matrixWorldInverse;

		// default ambient and point light is black (so disabled)
		const ambientLightColor = new Color(0x000000);
		const pointLightColors = [];
		const pointLightPositions = [];
	

		// Todo: set the light uniforms

		let pointLightIndex = 0;
		lights.forEach(light => {
			if(light.isAmbientLight){
				ambientLightColor.set(light.color);
			} else if(light.isPointLight && pointLightIndex < 5){
				const pointLightColor = new Color(0x000000);
				const pointLightPosition = new Vector3(0,0,0);

				pointLightColor.set(light.color);
				light.getWorldPosition(pointLightPosition);
				pointLightPosition.applyMatrix4(viewMatrix);

				pointLightColors.push(pointLightColor);
				pointLightPositions.push(pointLightPosition);

				pointLightIndex++;


			}
		});
		//send to shader

		program.setUniform('ambientLightColor', ambientLightColor);
		const pointLightIntensities = [];
		lights.forEach((light, index) => {
			if (light.isPointLight === true && index < 5) {
				pointLightIntensities.push(light.intensity);
			}
		});

		// Set the point light uniforms
		for (let i = 0; i < pointLightColors.length; i++) {
			const pointLightColor = pointLightColors[i];
			const pointLightPosition = pointLightPositions[i];
			const pointLightIntensity = pointLightIntensities[i];

			program.setUniform(`pointLights[${i}].color`, pointLightColor);
			program.setUniform(`pointLights[${i}].position`, pointLightPosition.toArray());
			
		}
	}



}

WebGLRenderer.prototype.isWebGLRenderer = true;

export { WebGLRenderer };
