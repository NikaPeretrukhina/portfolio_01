import { BufferGeometry } from '../core/BufferGeometry.js';

class BoxGeometry extends BufferGeometry {

	constructor(width = 1, height = 1, depth = 1) {

		super();

		this.type = 'BoxGeometry';

		this.parameters = {
			width: width,
			height: height,
			depth: depth
		};


		// A cube
		//    v6----- v5
		//   /|      /|
		//  v1------v0|
		//  | |     | |
		//  | |v7---|-|v4
		//  |/      |/
		//  v2------v3
		// from: https://programming.vip/docs/29-webgl-draws-cubes-and-specifies-colors-for-each-surface-of-cubes.html

		const w = width / 2; const h = height / 2; const d = depth / 2;
		const vertices = new Float32Array([   // Vertex position coordinate data
			w, h, d, -w, h, d, -w, -h, d, w, -h, d,  // v0-v1-v2-v3 front
			w, h, d, w, -h, d, w, -h, -d, w, h, -d,  // v0-v3-v4-v5 right
			w, h, d, w, h, -d, -w, h, -d, -w, h, d,  // v0-v5-v6-v1 up
			-w, h, d, -w, h, -d, -w, -h, -d, -w, -h, d,  // v1-v6-v7-v2 left
			-w, -h, -d, w, -h, -d, w, -h, d, -w, -h, d,  // v7-v4-v3-v2 down
			w, -h, -d, -w, -h, -d, -w, h, -d, w, h, -d   // v4-v7-v6-v5 back
		]);

		const normals = new Float32Array([
			Array(4).fill([0, 0, 1]).flat(),  // front 
			Array(4).fill([1, 0, 0]).flat(),  // right 
			Array(4).fill([0, 1, 0]).flat(),  // up 
			Array(4).fill([-1, 0, 0]).flat(),  // left 
			Array(4).fill([0, -1, 0]).flat(),  // down       
			Array(4).fill([0, 0, -1]).flat()   // back     
		].flat());

		const colors = new Float32Array([     // The color of the vertex (R, G, B, A)
			Array(4).fill([0.1, 0.1, 0.8, 1.0]).flat(),  // v0-v1-v2-v3 front (blue)
			Array(4).fill([0.1, 0.8, 0.1, 1.0]).flat(),  // v0-v3-v4-v5 right (green)
			Array(4).fill([0.8, 0.1, 0.1, 1.0]).flat(),  // v0-v5-v6-v1 up (red)
			Array(4).fill([0.8, 0.1, 0.8, 1.0]).flat(),  // v1-v6-v7-v2 left (magenta)
			Array(4).fill([0.1, 0.8, 0.8, 1.0]).flat(),  // v7-v4-v3-v2 down (cyan)
			Array(4).fill([0.8, 0.8, 0.1, 1.0]).flat()   // v4-v7-v6-v5 back (yellow)
		].flat());
		//console.log(colors);

		const indices = new Uint8Array([       // Drawn Index
			0, 1, 2, 0, 2, 3,    // front
			4, 5, 6, 4, 6, 7,    // right
			8, 9, 10, 8, 10, 11,    // up
			12, 13, 14, 12, 14, 15,    // left
			16, 17, 18, 16, 18, 19,    // down
			20, 21, 22, 20, 22, 23     // back
		]);


		// build geometry
		this.setIndex(indices);
		this.setAttribute('position', { 'array': vertices, 'itemSize': 3 });
		this.setAttribute('color', { 'array': colors, 'itemSize': 4 });
		this.setAttribute('normal', { 'array': normals, 'itemSize': 3 });
		//this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

	}

}

export { BoxGeometry };
