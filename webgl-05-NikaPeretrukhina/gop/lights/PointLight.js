import { Light } from './Light.js';

class PointLight extends Light {

	constructor(color) {

		super(color);

		this.type = 'PointLight';
	}


}

PointLight.prototype.isPointLight = true;

export { PointLight };
