import { Material } from './Material.js';
import { Color } from '../math/Color.js';

/**
 * parameters = {
 *  color: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  emissive: <hex>,
 * }
 */

class MeshPhongMaterial extends Material {

	constructor(parameters) {

		super();

		this.type = 'MeshPhongMaterial';

		this.color = new Color(0xffffff); // diffuse
		this.specular = new Color(0x111111);
		this.shininess = 30;
		this.emissive = new Color(0x000000);

		this.setValues(parameters);

	}

	setupMaterialUniforms(program) {

		program.setUniform("useUniformColor", true);

		// set the material properties as uniform
		program.setUniform("material.diffuseColor", this.color);
		program.setUniform("material.specularColor", this.specular);
		program.setUniform("material.specularShininess", this.shininess);
		program.setUniform("material.emissiveColor", this.emissive);

	}


	copy(source) {

		super.copy(source);

		this.color.copy(source.color);
		this.specular.copy(source.specular);
		this.shininess = source.shininess;
		this.emissive.copy(source.emissive);

		return this;

	}

}

MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

export { MeshPhongMaterial };
