import {BufferGeometry} from "./BufferGeometry.js";
import {Color} from "../math/Color.js";

export class QuadGeometry extends BufferGeometry {
    constructor(x1, y1, x2, y2, x3, y3, x4 ,y4, color1, color2, color3, color4) {
        super();

        if(!color1.isColor) {
            color1 = new Color(color1);
        }

        // check if other colors are set, otherwise use color1
        color2 = color2 || color1;
        color3 = color3 || color1;
        color4 = color4 || color1;


        // Set Attributes

        // Quad Coordinates
        this.setAttribute("position", {
            'array':
                [   x1, y1, 0,
                    x2, y2, 0,
                    x3, y3, 0,
                    x4, y4, 0
                ],
            'itemSize': 3
        });

        // Quad Color
        this.setAttribute("color", {
            'array':
                [
                    color1.r, color1.g, color1.b, 1.0,
                    color2.r, color2.g, color2.b, 1.0,
                    color3.r, color3.g, color3.b, 1.0,
                    color4.r, color4.g, color4.b, 1.0,
                ],
            'itemSize': 4
        });

        // Quad Index
        this.setIndex(
            [
                0, 1, 2, // first triangle
                2, 1, 3, // second triangle
            ]
        );

    }

}
