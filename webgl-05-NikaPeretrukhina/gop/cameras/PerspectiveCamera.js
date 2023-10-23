import { Camera } from './Camera.js';
import * as MathUtils from '../math/MathUtils.js';

class PerspectiveCamera extends Camera {

	constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {

		super();

		this.type = 'PerspectiveCamera';

		this.fov = fov;
		this.zoom = 1;

		this.near = near;
		this.far = far;
		this.focus = 10;

		this.aspect = aspect;
		this.view = null;

		this.filmGauge = 35;	// width of the film (default in millimeters)
		this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

		this.updateProjectionMatrix();

	}

	copy(source, recursive) {

		super.copy(source, recursive);

		this.fov = source.fov;
		this.zoom = source.zoom;

		this.near = source.near;
		this.far = source.far;
		this.focus = source.focus;

		this.aspect = source.aspect;

		this.filmGauge = source.filmGauge;
		this.filmOffset = source.filmOffset;

		return this;

	}

	/**
	 * Sets the FOV by focal length in respect to the current .filmGauge.
	 *
	 * The default film gauge is 35, so that the focal length can be specified for
	 * a 35mm (full frame) camera.
	 *
	 * Values for focal length and film gauge must have the same unit.
	 */
	setFocalLength(focalLength) {

		/** see {@link http://www.bobatkins.com/photography/technical/field_of_view.html} */
		const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

		this.fov = MathUtils.RAD2DEG * 2 * Math.atan(vExtentSlope);
		this.updateProjectionMatrix();

	}

	/**
	 * Calculates the focal length from the current .fov and .filmGauge.
	 */
	getFocalLength() {

		const vExtentSlope = Math.tan(MathUtils.DEG2RAD * 0.5 * this.fov);

		return 0.5 * this.getFilmHeight() / vExtentSlope;

	}

	getEffectiveFOV() {

		return MathUtils.RAD2DEG * 2 * Math.atan(
			Math.tan(MathUtils.DEG2RAD * 0.5 * this.fov) / this.zoom);

	}

	getFilmWidth() {

		// film not completely covered in portrait format (aspect < 1)
		return this.filmGauge * Math.min(this.aspect, 1);

	}

	getFilmHeight() {

		// film not completely covered in landscape format (aspect > 1)
		return this.filmGauge / Math.max(this.aspect, 1);

	}

	updateProjectionMatrix() {

		const near = this.near;
		let top = near * Math.tan(MathUtils.DEG2RAD * 0.5 * this.fov) / this.zoom;
		let height = 2 * top;
		let width = this.aspect * height;
		let left = - 0.5 * width;

		const skew = this.filmOffset;
		if (skew !== 0) left += near * skew / this.getFilmWidth();

		this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);

		this.projectionMatrixInverse.copy(this.projectionMatrix).invert();

	}

}

PerspectiveCamera.prototype.isPerspectiveCamera = true;

export { PerspectiveCamera };
