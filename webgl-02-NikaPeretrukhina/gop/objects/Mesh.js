import { Object3D } from '../core/Object3D.js';
import { Material } from '../materials/Material.js';
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js';
import { BufferGeometry } from '../core/BufferGeometry.js';


class Mesh extends Object3D {

	constructor(geometry = new BufferGeometry(), material = new Material()) {

		super();
		this.type = 'Mesh';

		if (!geometry.isBufferGeometry) {
			console.error('Mesh: geometry is not a BufferGeometry.');
			throw new Error('Mesh: geometry is not a BufferGeometry.');
		}
		if (!material.isMaterial) {
			console.error('Mesh: material is not a Material.');
			throw new Error('Mesh: material is not a Material.');
		}

		this.geometry = geometry;
		this.material = material;

	}

	copy(source) {

		super.copy(source);

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	}

}

Mesh.prototype.isMesh = true;

export { Mesh };
