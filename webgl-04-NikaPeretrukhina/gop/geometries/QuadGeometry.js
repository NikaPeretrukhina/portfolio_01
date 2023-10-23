import { BufferGeometry } from '../core/BufferGeometry.js';

class QuadGeometry extends BufferGeometry {

	constructor(width = 1, height = 1) {

		super();
		this.type = 'QuadGeometry';

		this.parameters = {
			width: width,
			height: height
		};

		const width_half = width / 2;
		const height_half = height / 2;


		const indices =
			[
				0, 1, 2,   // first triangle
				2, 1, 3,   // second triangle
			];


		const vertices =
			[
				width_half, -height_half, 0,
				width_half, height_half, 0,
				-width_half, -height_half, 0,
				-width_half, height_half, 0,
			];

		this.setIndex(indices);
		this.setAttribute('position', { 'array': vertices, 'itemSize': 3 });

	}

}

export { QuadGeometry };
