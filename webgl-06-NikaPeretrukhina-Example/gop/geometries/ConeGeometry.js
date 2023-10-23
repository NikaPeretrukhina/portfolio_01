import { CylinderGeometry } from './CylinderGeometry.js';

class ConeGeometry extends CylinderGeometry {

    constructor(radius = 1, height = 1, radialSegments = 8, heightSegments = 1) {

        super(0, radius, height, radialSegments, heightSegments);

        this.type = 'ConeGeometry';
        this.isConeGeometry = true;

        this.parameters = {
            radius: radius,
            height: height,
            radialSegments: radialSegments,
            heightSegments: heightSegments,
        };

    }

}

export { ConeGeometry, ConeGeometry as ConeBufferGeometry };