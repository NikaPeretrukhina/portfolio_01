class Material {

	constructor() {

		this.name = '';
		this.type = 'Material';
	}

	setupMaterialUniforms(program) {

		/*  EMPTY here: Set uniforms in the derived classes! */
		program.setUniform("useUniformColor", false); // per default we use the attribute colors in the shaders!

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
