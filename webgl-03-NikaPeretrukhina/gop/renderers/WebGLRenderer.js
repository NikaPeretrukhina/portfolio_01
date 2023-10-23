import { Matrix4 } from '../math/Matrix4.js';
import { Matrix3 } from '../math/Matrix3.js';
import { Vector3 } from '../math/Vector3.js';
import { Vector4 } from '../math/Vector4.js';
import { Color } from '../math/Color.js';
import { WebGLProgram } from '../core/WebGLProgram.js';
import { Camera } from '../cameras/Camera.js';


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

	setClearColor(value = new Color(0x000000), alpha = 0) {

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
		this._program.use();

		// clear first if autoClear is enabled
		if (this.autoClear === true) this.clear(this.autoClearColor, this.autoClearDepth);


		// render scene
		const meshes = [];

		// traverse the scene and get all meshes
		scene.traverse(function (object) {

			if (object.isMesh === true
				&& object.geometry !== undefined && object.geometry.isBufferGeometry === true
				&& object.material !== undefined && object.material.isMaterial === true) {

				meshes.push(object);

			}
		});



		this.renderMeshes(meshes, camera);


	}

	renderMeshes(meshes, camera) {

		const gl = this._gl;
		const program = this._program;

		camera.updateMatrixWorld(); // just update again, if camera is not part of the scene graph!
		const viewMatrix = camera.matrixWorldInverse;
		program.setUniform('viewMatrix', viewMatrix);

		const projectionMatrix = camera.projectionMatrix;
		program.setUniform("projectionMatrix", projectionMatrix);


		meshes.forEach(mesh => {

			// model, modelView and normal Matrix change for every mesh
			const matrix = mesh.matrixWorld;
			program.setUniform('modelMatrix', matrix);

			mesh.material.setupMaterialUniforms(program);

			// everything is set up, now draw the mesh
			mesh.geometry.draw(gl);
		});

	}



}

WebGLRenderer.prototype.isWebGLRenderer = true;

export { WebGLRenderer };
