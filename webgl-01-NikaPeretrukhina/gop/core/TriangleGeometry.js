import {BufferGeometry} from "./BufferGeometry.js";
import {Color} from "../math/Color.js";

export class TriangleGeometry extends BufferGeometry {
    constructor(x1, y1, x2, y2, x3, y3, color1, color2, color3) {
        super();

        if(!color1.isColor) {
            color1 = new Color(color1);
        }

        // check if other colors are set, otherwise use color1
        color2 = color2 || color1;
        color3 = color3 || color1;

        // Set Attributes

        // Triangle Position
        this.setAttribute("position", {
            'array':
                [
                    x1, y1, 0,
                    x2, y2, 0,
                    x3, y3, 0,
                ],
            'itemSize': 3
        });

        // Triangle color
        this.setAttribute("color", {
            'array':
                [
                    color1.r, color1.g, color1.b, 1.0,
                    color2.r, color2.g, color2.b, 1.0,
                    color3.r, color3.g, color3.b, 1.0,
                ],
            'itemSize': 4
        });
    }

}

