import { Material } from './Material.js';
import { Color } from '../math/Color.js';

/**
 * parameters = {
 *  color: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  emissive: <hex>,
 *  map: <Texture>,
 *  transparent: <bool>,
 *  opacity: <float>,
 * }
 */

class MeshPhongMaterial extends Material {

	constructor(parameters) {

		super();

		this.type = 'MeshPhongMaterial';

		this.color = new Color(0xffffff); // diffuse
		this.specular = new Color(0xffffff);
		this.shininess = 30;
		this.emissive = new Color(0x000000);
		this.map = undefined;

		this.setValues(parameters);

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
