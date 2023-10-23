import { Matrix4 } from '../math/Matrix4.js';
import { Object3D } from '../core/Object3D.js';

class Camera extends Object3D {

	constructor() {

		super();

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	copy( source, recursive ) { //daten kopieren welche kamera als objekte nimmt

		super.copy( source, recursive );

		this.matrixWorldInverse.copy( source.matrixWorldInverse );

		this.projectionMatrix.copy( source.projectionMatrix );
		this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

		return this;

	}

	getWorldDirection( target ) {

		this.updateWorldMatrix( true, false );

		const e = this.matrixWorld.elements;

		return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize(); //Hier wird die Blickrichtung der Kamera berechnet und im übergebenen Vektor target gespeichert. 

	}

	updateMatrixWorld( force ) { //Die Inverse der Weltmatrix wird oft benötigt, um beispielsweise Transformationen von Weltkoordinaten in Kamerakoordinaten durchzuführen.

		super.updateMatrixWorld( force );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	}

	updateWorldMatrix( updateParents, updateChildren ) {

		super.updateWorldMatrix( updateParents, updateChildren );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

Camera.prototype.isCamera = true;

export { Camera };
