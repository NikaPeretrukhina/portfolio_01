import { createProgram } from "./ShaderHelper.js";

const vs = `#version 300 es
layout(location=0) in vec3 position;
layout(location=1) in vec3 color;
layout(location=2) in vec3 normal;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix; 
uniform mat3 normalMatrix;

out vec3 v_color;
out vec3 v_normal;
out vec3 v_position;

void main() {
  
  v_color = color;
  v_normal = normalMatrix * normal; //NEW
  v_position = vec3(viewMatrix * modelMatrix * vec4( position, 1.0 )); // NEW

  v_position.x += 1.0;

  gl_Position = projectionMatrix * vec4(v_position , 1.0);
}
`;

const fs = `#version 300 es
precision highp float;

out vec4 fragColor; // fragment color output

// inputs from the vertex shader
in vec3 v_color;
in vec3 v_normal;
in vec3 v_position;

uniform float useUniformColor; // use uniform color if this is 1, otherwise use the color attribute

struct Material {
	vec3 diffuseColor;
	vec3 specularColor;
	vec3 emissiveColor;
	float specularShininess;
};
uniform Material material; //= Material(vec3(1.0, 0.5, 0.5), vec3(0.4), vec3(0.0), 100.0); // material settings

uniform vec3 ambientLightColor; //= vec3(0.2, 0.2, 0.2); // ambient light color



struct PointLight {
    vec3 position;
    vec3 color;
};

uniform PointLight pointLights[5];   //PointLight pointLight = PointLight(vec3(2.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)); point light setting



void main() {
	vec3 diffuseColor = (useUniformColor > 0.0) ? material.diffuseColor.rgb : v_color.rgb; // Dieser Teil des Codes berechnet die diffuse (gestreute) Farbe des Materials für den aktuellen Fragment-Pixel. Je nach Bedingung (useUniformColor > 0.0) wird entweder die diffuse Farbe aus einem Uniform (material.diffuseColor.rgb) oder die diffuse Farbe aus den Vertex-Daten (v_color.rgb) verwendet. 

	fragColor = vec4(material.emissiveColor.rgb, 1.0); //Hier wird fragColor auf die emissive (selbstleuchtende) Farbe des Materials gesetzt.

	fragColor.rgb += ambientLightColor * material.diffuseColor.rgb; //fügt farben fürs licht
	
	vec3 N = normalize(v_normal);//Hier wird die Oberflächennormale (N) normalisiert. Die Normale ist ein Vektor, der senkrecht zur Oberfläche zeigt und in Beleuchtungsberechnungen verwendet wird.
	

	for(int i = 0; i < 5; i++) {
		vec3 L = normalize(pointLights[i].position - v_position);//Hier wird der Vektor L berechnet, der vom Fragment zum Punktlicht zeigt. Dieser Vektor wird normalisiert, um sicherzustellen, dass er eine Länge von 1 hat.

		float lambertian = max(dot(N,L), 0.0); //Dieser Teil berechnet die Lambert'sche Reflexion, einen Wert, der angibt, wie viel Licht aufgrund des Winkels zwischen der Oberflächennormalen (N) und dem Lichtvektor (L) reflektiert wird. Der Ausdruck max(dot(N, L), 0.0) stellt sicher, dass negative Werte (wenn das Licht von der Oberfläche abgewandt ist) auf 0 gesetzt werden.

		fragColor.rgb += lambertian * pointLights[i].color * material.diffuseColor; //Hier wird die diffuse Reflexion des Lichts zum fragColor hinzugefügt. Dieser Teil berücksichtigt, wie das Licht aufgrund des Winkels zwischen der Oberflächennormalen und dem Lichtvektor auf die Oberfläche trifft.



		if(lambertian > 0.0){
			//specular term
			
			vec3 R = reflect(-L, N); //reflection vector
			vec3 V = normalize(vec3(0.0) - v_position); // view vector-kamera

			float specularAngle = max(dot(R,V), 0.0); // Der Winkel zwischen dem Reflexionsvektor und dem Betrachter wird berechnet und auf positive Werte begrenzt.
			float specular = pow(specularAngle, material.specularShininess); //Der spekulare Reflexionswert wird basierend auf dem Winkel und der Materialglätte (shininess) berechnet.
			fragColor.rgb += specular * pointLights[i].color * material.specularColor; //Der spekulare Reflexionsbeitrag wird zur fragColor hinzugefügt.
		}
	}
	

    // DEBUG (for debugging use something like this):
   //fragColor = vec4(vec3(lambertian),1.0);
}
`;

/**
 * Returns the attribute location for a given attribute name in the shader.
 * The location number in the vertex shader. e.g. 0 for the position attribute as it is defined as `layout(location=0) in vec3 position;` in the vertex shader.
 * @param {string} name name of the attribute in the shader
 * @returns {number} the location of the attribute in the shader
 */
function getAttribLocation(name) {
	switch (name) {
		case 'position': return 0; // "layout(location=0) in vec3 ..." in shader code
		case 'color': return 1; // "layout(location=1) in vec4 ..." in shader code
		case 'normal': return 2; // "layout(location=2) in vec3 ..." in shader code
		case 'uv': return 3; // "layout(location=3) in vec2 ..." in shader code
		case 'index': return undefined; // an index does not have a location in the shader!
		default: return undefined; // return undefined if the attribute is not known!
	}
}


/**
 * The WebGLProgram of a vertex and fragment shader.
 */
class WebGLProgram {

	/**
	 * Creates a WebGLProgram with a vertex and fragment shader.
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	 * @returns 
	 */
	constructor(gl) {

		// Verify that we have a valid WebGL context
		if (typeof gl.getParameter !== 'function' /*not a valid gl context*/) {
			console.error(`OpenGL context in constructor of WebGLProgram is not valid!`);
			throw new Error(`OpenGL context in constructor of WebGLProgram is not valid!`);
		}

		this.gl = gl;
		this.vertexShader = vs;
		this.fragmentShader = fs;

		this.program = createProgram(gl, [this.vertexShader, this.fragmentShader]);


		return this;

	}

	/**
	 * Enables the WebGLProgram for use.
	 * @returns {WebGLProgram} this WebGLProgram.
	 */
	use() {

		this.gl.useProgram(this.program);

	}

	/**
	 * Returns the internal WebGLProgram for use with getUniformLocation and others
	 * object.glProgram = value; 
	 */
	get glProgram() {

		return this.program;

	}

	/**
	 * Specify values for the uniforms.
	 * @param {string} name the name of the uniform variable in the shaders.
	 * @param {(number|Array|Matrix|Color|Vector)} value the value to set the uniform to. Can be a number, array, color, vector or matrix.
	 */
	setUniform(name, value) {

		// find the uniform location by its name
		const loc = this.gl.getUniformLocation(this.program, name);
		if (loc === null) {
			console.warn(`Uniform '${name}' not found in WebGLProgram! It might be unused and optimized out.`);
			return;
		}

		// get the uniform type and its length (useful for color!)
		const type = this.gl.getUniform(this.program, loc);
		const uniformLength = (type.length);

		// set the uniform value by using the appropriate uniform[1234][uif][v] function
		if (typeof value === "number") {
			this.gl.uniform1f(loc, value);
		} else if (typeof value === "boolean") {
			this.gl.uniform1f(loc, value ? 1.0 : 0.0);
		} else if (value instanceof Array) {
			const len = value.length;
			const uniformCall = `uniform${len}fv`;
			this.gl[uniformCall](loc, value);
		} else if (value.isColor) {
			const uniformCall = `uniform${uniformLength}f`; // use length to deal with vec3 and vec4 colors!
			this.gl[uniformCall](loc, value.r, value.g, value.b, 1.0);
		} else if (value.isMatrix4) {
			this.gl.uniformMatrix4fv(loc, false, value.elements);
		} else if (value.isMatrix3) {
			this.gl.uniformMatrix3fv(loc, false, value.elements);
		} else if (value.isVector3) {
			this.gl.uniform3f(loc, value.x, value.y, value.z);
		} else if (value.isVector4) {
			this.gl.uniform4f(loc, value.x, value.y, value.z, value.w);
		} else if (value.isTexture) {
			this.gl.uniform1i(loc, value.getTextureUnit(this.gl));
		} else {
			console.warn(`Value of type '${value.constructor.name}' not supported by WebGLProgram.setUniform!`);
		}

		// see https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/uniform
		// for more info on the different types/possibilites of setting uniforms.
	}
	
}

export { WebGLProgram, getAttribLocation};