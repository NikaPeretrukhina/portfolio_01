import { Light } from './Light.js';

class AmbientLight extends Light {

	constructor(color) {

		super(color);

		this.type = 'AmbientLight';

	}

}

AmbientLight.prototype.isAmbientLight = true;

export { AmbientLight };
