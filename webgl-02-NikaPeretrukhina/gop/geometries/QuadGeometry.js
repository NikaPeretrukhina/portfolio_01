import { BufferGeometry } from '../core/BufferGeometry.js';
import { Color } from '../math/Color.js';

class QuadGeometry extends BufferGeometry {

	constructor(width = 1, height = 1, color = new Color('yellow')) {

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

		const colors =
			Array(vertices.length / 3).fill([color.r, color.g, color.b, 1.0]).flat();


		this.setIndex(indices);
		this.setAttribute('position', { 'array': vertices, 'itemSize': 3 });
		this.setAttribute('color', { 'array': colors, 'itemSize': 4 });

	}

}

export { QuadGeometry };
