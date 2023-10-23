import { Object3D } from '../core/Object3D.js';
import { Color } from '../math/Color.js';

class Light extends Object3D {

	constructor(color) {

		super();

		this.type = 'Light';
		this.color = new Color(color);

	}

}

Light.prototype.isLight = true;

export { Light };
