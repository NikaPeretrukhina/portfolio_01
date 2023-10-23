import { BufferGeometry } from '../core/BufferGeometry.js';

class TriangleGeometry extends BufferGeometry {

	constructor(height = 1) {

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

		this.setAttribute('position', { 'array': vertices, 'itemSize': 3 });

	}

}

export { TriangleGeometry };
