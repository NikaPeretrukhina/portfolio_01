import { createProgram } from "./ShaderHelper.js";

const vs = `#version 300 es
layout(location=0) in vec3 position;
layout(location=1) in vec3 color;
layout(location=2) in vec3 normal;
layout(location=3) in vec2 uv;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix; 
uniform mat3 normalMatrix; // normal matrix
uniform mat3 uvMatrix;

out vec3 v_color;
out vec3 v_normal;
out vec3 v_position;
out vec2 v_uv;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
  v_color = color;
  v_normal = normalMatrix * normal;
  v_position = vec3(viewMatrix * modelMatrix * vec4(position, 1.0));
  v_uv = vec2(uvMatrix * vec3(uv,0.1));
}
`;

const fs = `#version 300 es
precision highp float;

out vec4 fragColor; // fragment color output

// inputs from the vertex shader
in vec3 v_color; // we treat this as emissive color now
in vec3 v_normal;
in vec3 v_position;
in vec2 v_uv;

uniform float useUniformColor; // use uniform color if this is 1, otherwise use the color attribute

struct Material {
	vec3 diffuseColor;
	vec3 specularColor;
	vec3 emissiveColor;
	float specularShininess;
};
uniform Material material; // = Material(vec3(1.0, 0.5, 0.5), vec3(0.5), vec3(0.0), 100.0); // material settings

uniform vec3 ambientLightColor; // = vec3(0.2, 0.2, 0.2); // ambient light color

struct PointLight {
    vec3 position;
    vec3 color;
};

uniform PointLight pointLights[5];

uniform float useMap;
uniform sampler2D map;
uniform float opacity;


void main() {
	vec4 texelColor = vec4(1.0);	
	if(useMap > 0.0) { //Dieser Abschnitt prüft, ob eine Textur (map) verwendet werden soll
		texelColor = texture(map, v_uv); // 
	}	
	// TODO: add texture support here!

	vec3 diffuseColor = material.diffuseColor.rgb * texelColor.rgb; // diffuse color and texture color
	vec3 emissiveColor = (useUniformColor > 0.0) ? material.emissiveColor.rgb : v_color.rgb; // emissive color (use uniform color if useUniformColor > 0.0)
	emissiveColor *= texelColor.rgb; // apply texture color

	// TODO: add support for transparency here!
	float alpha = opacity; // alpha auf wert opacity gesetzt
	if(useMap > 0.0){ //wenn texture gibts
		alpha *= texelColor.a; //dann wird diese texture eingesetz und richtig verwendet durch alpha kanal 
	}

	fragColor = vec4(emissiveColor, alpha); // emissive
	fragColor.rgb += diffuseColor * ambientLightColor; // ambient term
	
	vec3 N = normalize(v_normal); // normal vector
	for(int i = 0; i < 5; i++) {
		vec3 L = normalize(pointLights[i].position - v_position);

		float lambertian = max(dot(N,L), 0.0);

		fragColor.rgb += lambertian * pointLights[i].color * material.diffuseColor;

		if(lambertian > 0.0){
			//specular term
			
			vec3 R = reflect(-L, N); //reflection vector
			vec3 V = normalize(vec3(0.0) - v_position); // view vector

			float specularAngle = max(dot(R,V), 0.0);
			float specular = pow(specularAngle, material.specularShininess);
			fragColor.rgb += specular * pointLights[i].color * material.specularColor;
		}
	}



	// vec3 L0 = normalize(pointLights0.position - v_position); // light vector
	// vec3 L1 = normalize(pointLights1.position - v_position); // light vector

	// float lambertian = max(dot(N, L), 0.0); // Lambert's cosine law
	// fragColor.rgb += lambertian * pointLights0.color * diffuseColor; // diffuse term
	// fragColor.rgb += lambertian * pointLights1.color * diffuseColor; // diffuse term

	// if (lambertian > 0.0) {
	// 	vec3 R = reflect(-L, N); // reflected light vector
	// 	vec3 V = normalize(-v_position); // view vector
	
	// 	float specularAngle = max(dot(R, V), 0.0); // specular angle
	// 	float specular = pow(specularAngle, material.specularShininess); // specular factor
	
	// 	fragColor.rgb += specular * material.specularColor * pointLights0.color; // specular term for pointLights0
	// 	fragColor.rgb += specular * material.specularColor * pointLights1.color; // specular term for pointLights1
	// }


    // DEBUG (for debugging use something like this):
    // fragColor = vec4(v_uv, 0.0 ,1.0);
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

export { WebGLProgram, getAttribLocation };
