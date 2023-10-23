import { BufferGeometry } from "./BufferGeometry.js";
import { Color } from "../math/Color.js";

// Eine benutzerdefinierte Geometrie-Klasse namens "StarGeometry" wird erstellt,
// die von BufferGeometry erbt.
export class StarGeometry extends BufferGeometry {
    constructor(x1, y1, r1, r2, color1) {
        super(); // Der Konstruktor der übergeordneten Klasse wird aufgerufen.

        // Überprüfen, ob "color1" eine Instanz von "Color" ist. Wenn nicht, konvertiere sie.
        if (!color1.isColor) {
            color1 = new Color(color1);
        }

        // Der Winkel "alpha" wird berechnet, um die Positionen der Sterne zu definieren.
        const alpha = 2 * Math.PI / 5 / 2;

        // Das Attribut "position" wird festgelegt, um die Sterne zu positionieren.
        this.setAttribute("position", {
            'array': [
                x1, y1, 0,
                Math.cos(alpha * 0) * r1 + x1, Math.sin(alpha * 0) * r1 + y1, 0, // alpha(winkel), Alpha-Komponente (Transparenz)
                Math.cos(alpha * 1) * r2 + x1, Math.sin(alpha * 1) * r2 + y1, 0,
                Math.cos(alpha * 2) * r1 + x1, Math.sin(alpha * 2) * r1 + y1, 0,
                Math.cos(alpha * 3) * r2 + x1, Math.sin(alpha * 3) * r2 + y1, 0,
                Math.cos(alpha * 4) * r1 + x1, Math.sin(alpha * 4) * r1 + y1, 0,
                Math.cos(alpha * 5) * r2 + x1, Math.sin(alpha * 5) * r2 + y1, 0,
                Math.cos(alpha * 6) * r1 + x1, Math.sin(alpha * 6) * r1 + y1, 0,
                Math.cos(alpha * 7) * r2 + x1, Math.sin(alpha * 7) * r2 + y1, 0,
                Math.cos(alpha * 8) * r1 + x1, Math.sin(alpha * 8) * r1 + y1, 0,
                Math.cos(alpha * 9) * r2 + x1, Math.sin(alpha * 9) * r2 + y1, 0,
            ],
            'itemSize': 3
        });

        // Die Indexe werden gesetzt, um die Dreiecke zwischen den Sternen zu definieren.
        this.setIndex([
            0, 0, 0,
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,
            0, 5, 6,
            0, 6, 7,
            0, 7, 8,
            0, 8, 9,
            0, 9, 10,
            0, 10, 1,
        ]);

        // Das Attribut "color" wird festgelegt, um die Farben der Sterne zu definieren.
        //In diesem Teil des Codes wird ein Array verwendet, um die Farbwerte der Sterne festzulegen.
        //Das Array enthält die Farbwerte für jedes einzelne Vertex (Eckpunkt) der Sterne. 
        this.setAttribute("color", { 
            'array': [
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
                color1.r, color1.g, color1.b, 1.0,
            ],
            'itemSize': 4
        });
    }
}