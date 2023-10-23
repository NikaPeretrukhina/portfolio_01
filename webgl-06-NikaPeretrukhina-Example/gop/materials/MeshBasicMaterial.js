import { Material } from './Material.js';
import { Color } from '../math/Color.js';

/**
 * parameters = {
 *  color: <hex>,
 *  transparent: <bool>,
 *  opacity: <float>,
 * }
 */

const _black = new Color(0x000000);

class MeshBasicMaterial extends Material {

	constructor(parameters) {

		super();

		this.type = 'MeshBasicMaterial';

		this.emissive = new Color(0xffffff); // emissive

		if (parameters !== undefined && parameters['color'] !== undefined) {
			this.emissive.set(parameters['color']);
		}
		if (parameters !== undefined && parameters['transparent'] !== undefined) {
			this.transparent = parameters['transparent'];
		}
		if (parameters !== undefined && parameters['opacity'] !== undefined) {
			this.opacity = parameters['opacity'];
		}

	}

	/*
	get color() {
		return this.emissive;
	}
	*/

	copy(source) {

		super.copy(source);

		this.emissive.copy(source.emissive);

		return this;

	}

}

MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

export { MeshBasicMaterial };
