import { Color } from '../math/Color.js';
const _black = new Color(0x000000);

class Material {

	constructor() {

		this.name = '';
		this.type = 'Material';
		this.transparent = false;
		this.opacity = 1.0;
	}

	copy(source) {

		this.name = source.name;
		this.type = source.type;
		this.transparent = source.transparent;
		this.opacity = source.opacity;

		return this;

	}

	setupMaterialUniforms(program) {

		/* Set uniforms also from the derived classes! */
		program.setUniform("useUniformColor", this.isMeshPhongMaterial || this.isMeshBasicMaterial || false); // per default we use the attribute colors in the shaders!
		// set the material properties as uniform
		program.setUniform("material.diffuseColor", this.color || _black);
		program.setUniform("material.specularColor", this.specular || _black);
		program.setUniform("material.specularShininess", this.shininess || 1.0);
		program.setUniform("material.emissiveColor", this.emissive || _black);
		// TODO: set the opacity
		program.setUniform("opacity", this.opacity);

		this.setupTextureUniforms(program);
	}

	setupTextureUniforms(program) {
		// TODO: set the texture uniforms
		const hasTexture = this.map !== undefined && this.map.isTexture;
		program.setUniform("useMap", hasTexture);
		if(hasTexture){
			program.setUniform("map", this.map);
			this.map.updateMatrix(); // compute the uv matrix
			program.setUniform("uvMatrix", this.map.matrix);

		}
	}

	/**
	 * Helper for setting Material parameters
	 * @param {*} values material parameters i.e., { color: <hex>, ... }
	 * @returns 
	 */
	setValues(values) {

		if (values === undefined) return;

		for (const key in values) {

			const newValue = values[key];

			if (newValue === undefined) {

				console.warn('Material: \'' + key + '\' parameter is undefined.');
				continue;

			}

			const currentValue = this[key];

			if (currentValue === undefined) {

				console.warn('' + this.type + ': \'' + key + '\' is not a property of this material.');
				continue;

			}

			if (currentValue && currentValue.isColor) {

				currentValue.set(newValue);

			} else if ((currentValue && currentValue.isVector3) && (newValue && newValue.isVector3)) {

				currentValue.copy(newValue);

			} else {

				this[key] = newValue;

			}

		}

	}
}

Material.prototype.isMaterial = true;


export { Material };
