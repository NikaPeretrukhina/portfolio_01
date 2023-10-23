import { BufferGeometry } from '../core/BufferGeometry.js';
import { Color } from '../math/Color.js';

class TriangleGeometry extends BufferGeometry {

	constructor(height = 1, color = new Color('green')) {

		super();
		this.type = 'TriangleGeometry';

		this.parameters = {
			height: height
		};

		const side_half = height / Math.sqrt(3);
		const b = height / 3;

		const vertices =
			[
				side_half, -b, 0,
				0, height - b, 0,
				-side_half, -b, 0,
			];

		const colors =
			Array(vertices.length / 3).fill([color.r, color.g, color.b, 1.0]).flat();

		this.setAttribute('position', { 'array': vertices, 'itemSize': 3 });
		this.setAttribute('color', { 'array': colors, 'itemSize': 4 });

	}

}

export { TriangleGeometry };
