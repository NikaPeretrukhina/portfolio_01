import { Camera } from './Camera.js';

class OrthographicCamera extends Camera {

	constructor(left = - 1, right = 1, top = 1, bottom = - 1, near = 0.1, far = 2000) {

		super();

		this.type = 'OrthographicCamera';

		this.zoom = 1;

		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;

		this.near = near;
		this.far = far;

		this.updateProjectionMatrix();

	}

	copy(source, recursive) {

		super.copy(source, recursive);

		this.left = source.left;
		this.right = source.right;
		this.top = source.top;
		this.bottom = source.bottom;
		this.near = source.near;
		this.far = source.far;

		this.zoom = source.zoom;

		return this;

	}


	updateProjectionMatrix() {

		const dx = (this.right - this.left) / (2 * this.zoom);
		const dy = (this.top - this.bottom) / (2 * this.zoom);
		const cx = (this.right + this.left) / 2;
		const cy = (this.top + this.bottom) / 2;

		let left = cx - dx;
		let right = cx + dx;
		let top = cy + dy;
		let bottom = cy - dy;

		this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);

		this.projectionMatrixInverse.copy(this.projectionMatrix).invert();

	}

}

OrthographicCamera.prototype.isOrthographicCamera = true;

export { OrthographicCamera };
