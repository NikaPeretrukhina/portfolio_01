import * as MathUtils from '../math/MathUtils.js';
import { Vector2 } from '../math/Vector2.js';
import { Matrix3 } from '../math/Matrix3.js';

let textureId = 0;

class Texture {

	constructor(image = Texture.DEFAULT_IMAGE, textureUnit = 0) {

		Object.defineProperty(this, 'id', { value: textureId++ });

		this.uuid = MathUtils.generateUUID();

		this.name = '';

		this.image = image;

		this.generateMipmaps = true;
		this.premultiplyAlpha = false;
		this.flipY = true;
		this.textureUnit = textureUnit;

		this.isInitialized = false; // set to true when init() is called

		// uv transformation
		this.offset = new Vector2(0, 0);
		this.repeat = new Vector2(1, 1);
		this.center = new Vector2(0, 0);
		this.rotation = 0;

		this.matrixAutoUpdate = true;
		this.matrix = new Matrix3();

	}

	updateMatrix() {

		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);

	}

	init(_gl = null) {
		if (_gl === null) {
			console.error('Texture.init: WebGL context is not set!');
		}
		const gl = _gl;
		const texture = gl.createTexture();

		// Now that the image has loaded copy it to the texture.
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
			gl.UNSIGNED_BYTE,
			this.image);
		if (this.generateMipmaps === true) {
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		}


		this._glTexture = texture;
		this.isInitialized = true;
		this._gl = gl;
	}

	getTextureUnit(_gl = null) {
		if (this.isInitialized === false) {
			this.init(_gl);
		}
		this.activate();
		return this.textureUnit;
	}

	activate() {
		const gl = this._gl;
		gl.activeTexture(gl.TEXTURE0 + this.textureUnit);
		gl.bindTexture(gl.TEXTURE_2D, this._glTexture);
	}

	deactivate() {
		const gl = this._gl;
		gl.activeTexture(gl.TEXTURE0 + this.textureUnit);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	clone() {

		return new this.constructor().copy(this);

	}

	copy(source) {

		this.name = source.name;

		this.image = source.image;

		this.offset.copy(source.offset);
		this.repeat.copy(source.repeat);
		this.center.copy(source.center);
		this.rotation = source.rotation;

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrix.copy(source.matrix);

		this.generateMipmaps = source.generateMipmaps;
		this.flipY = source.flipY;

		return this;

	}

}

Texture.DEFAULT_IMAGE = undefined;
//Texture.DEFAULT_MAPPING = UVMapping;

Texture.prototype.isTexture = true;

export { Texture };
