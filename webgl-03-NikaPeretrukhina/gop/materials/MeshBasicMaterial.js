import { Material } from './Material.js';
import { Color } from '../math/Color.js';

/**
 * parameters = {
 *  color: <hex>,
 * }
 */

class MeshBasicMaterial extends Material {

	constructor(parameters) {

		super();

		this.type = 'MeshBasicMaterial';

		this.color = new Color(0xffffff); // emissive

		if (parameters !== undefined && parameters['color'] !== undefined) {
			this.color.set(parameters['color']);
		}

	}

	copy(source) {

		super.copy(source);

		this.color.copy(source.color);

		return this;

	}

	setupMaterialUniforms(program) {

		program.setUniform("useUniformColor", true);
		program.setUniform("color", this.color);

	}

}

MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

export { MeshBasicMaterial };
