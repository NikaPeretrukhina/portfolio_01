import { BufferGeometry } from '../core/BufferGeometry.js';
import { Color } from '../math/Color.js';

class CircleGeometry extends BufferGeometry {

	constructor(radius = 1, numVertices = 20, color = new Color('blue')) {

		super();
		this.type = 'CircleGeometry';
		this.isCircleGeometry = true;

		this.parameters = {
			radius: radius,
			numVertices: numVertices,
			color: color
		};

		const vertices = [0, 0, 0]; // init with center
		const colors = [color.r, color.g, color.b, 1];
		const indices = [];

		for (let i = 0; i < numVertices; i++) {

			const angle = i * Math.PI * 2 / (numVertices);

			const x = Math.cos(angle) * radius;
			const y = Math.sin(angle) * radius;

			vertices.push(x, y, 0);
			colors.push(color.r, color.g, color.b, 1);

			indices.push(0, i, i + 1);
		}
		indices.push(0, numVertices, 1);


		this.setAttribute('position', { 'array': vertices, 'itemSize': 3 });
		this.setAttribute('color', { 'array': colors, 'itemSize': 4 });
		this.setIndex(indices);

	}

}

export { CircleGeometry };
