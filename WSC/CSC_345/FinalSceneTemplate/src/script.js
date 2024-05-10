import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox.js'

/*
 * Author: Aaron Mahoney
 * Date:   05/02/2024
 *
 */

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
let model = null

const rgbeLoader = new RGBELoader()
const exrLoader = new EXRLoader()

var camera, currentScene, renderer;

var width = window.innerWidth,
    height = window.innerHeight;

/* Button 
 * https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations/programming-scenes/a/button-controlled-scene-changes
 */
var drawButton = function() {
    addStarGate(); // add stargate and shaders
};

var tuniform = {
    //colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
    //colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
    iTime: {
        type: 'f',
        value: 0.1
    },
    resolution: {
        value: new THREE.Vector2(width, height)
    }
};

// https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi
// most of the shader code is from https://codepen.io/rafadante/pen/ZEVoXWj?editors=1111
function vertexShader() {
    return `
    varying vec2 vUv; 
    void main()
    {
        vUv = uv;
    
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
    `
}

function fragmentShader() {
  return `
   /* uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
    */
  

  uniform float iTime;
  uniform vec4 resolution;
  
  varying vec2 vUv;
  
  float snoise(vec3 uv, float res) {
      const vec3 s = vec3(1e0, 1e2, 1e3);
      
      uv *= res;
      
      vec3 uv0 = floor(mod(uv, res))*s;
      vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
      
      vec3 f = fract(uv); f = f*f*(3.0-2.0*f);
  
      vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
                      uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);
  
      vec4 r = fract(sin(v*1e-1)*1e3);
      float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
      
      r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);
      float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
      
      return mix(r0, r1, f.z)*2.-1.;
    }
  
  
  void main( ) 
   {
      vec2 p = -0.42 + 0.84 *vUv;
      //vec2 p = -.5 + gl_FragCoord.xy / resolution.xy;
      //p.x *= resolution.x/resolution.y;
      
      //p.x *= .75;
      
      float color = 3.0 - (3.*length(2.*p));
      
      vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*1.5, 1.5);
      
      coord = 1.0 - coord;
  
      for(int i = 1; i <= 2; i++) {
          float power = pow(1.50, float(i));
          color += (0.4 / power) * snoise(coord + vec3(0.,-iTime*.05, iTime*.01), power*8.);
        }
  
      color = 2.0 - color;
      color *= 1.0;
      color *= smoothstep(0.543, 0.2, length(p));
  
      //
      float pct = distance(vUv,vec2(0.5));
      // set solid background
      float y = smoothstep(0.001,0.525,pct);
  
      //gl_FragColor  = vec4(color, pow(max(color,0.),2.)*0.4, pow(max(color,0.),3.)*0.15 , y);
      gl_FragColor = vec4(pow(max(color,0.),3.)*0.15, pow(max(color,0.),2.)*0.4, color, y);
      
      //gl_FragColor = vec4(mix(vec3(1.0),vec3(color, pow(max(color,0.),2.)*0.4, pow(max(color,0.),3.)*0.15),color),y);
      }
  `
}

var drawScene1 = function() {
    currentScene = 1;
    addStarGate(); // add stargate and shaders
};

var drawScene2 = function() {
    currentScene = 2;
    newWorld(); // Next scene
};

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 400
})
const global = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// scene
currentScene = new THREE.Scene()


/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    currentScene.traverse((child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = global.envMapIntensity
        }
    })
}

/**
 * Environment map
 */
currentScene.backgroundBlurriness = 0
currentScene.backgroundIntensity = 1

gui.add(currentScene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(currentScene, 'backgroundIntensity').min(0).max(10).step(0.001)

// Global intensity
global.envMapIntensity = 1
gui
    .add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials)

/**
 * Textures
 */
const particleTexture = textureLoader.load('/textures/particles/1.png')
const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace

drawButton();

function addStarGate() {
    /**
     * Real time environment map
     */
    /* env map image 
    * "https://www.freepik.com/free-photo/low-angle-shot-mesmerizing-starry-sky_12448591.htm"
    *  Image by wirestock on Freepik 
    */
    // Base environment map
    var environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/low-angle-shot-mesmerizing-starry-sky.jpg') 
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    environmentMap.colorSpace = THREE.SRGBColorSpace

    currentScene.background = environmentMap

    /**
     * Materials
     */
    // Baked material
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

    // Portal light material
    const portalLightMaterial = new THREE.ShaderMaterial( {

        uniforms: tuniform,

        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
        side: 2,
        transparent: false

    })

    // Pole light material
    const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

    /**
     * Model
     */
    gltfLoader.load(
        'portal.glb',
        (gltf) =>
        {
            const bakedMesh = gltf.scene.children.find(child => child.name === 'baked')
            const portalLightMesh = gltf.scene.children.find(child => child.name === 'portalLight')
            const poleLightAMesh = gltf.scene.children.find(child => child.name === 'poleLightA')
            const poleLightBMesh = gltf.scene.children.find(child => child.name === 'poleLightB')

            bakedMesh.material = bakedMaterial
            portalLightMesh.material = portalLightMaterial
            poleLightAMesh.material = poleLightMaterial
            poleLightBMesh.material = poleLightMaterial

            model = gltf.scene
            currentScene.add(model)
        }
    )

    // Object rectagular base
    const cubeGeometry = new THREE.BoxGeometry(4.5, 0.5, 4.5)
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x906900 })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.y = -0.26;
    currentScene.add(cube)


    // Floor
    const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ color: 0x504800 })
    )
    floor.rotation.x = - Math.PI * 0.5
    floor.position.y = -0.1
    currentScene.add(floor)

}

function newWorld() {
    /**
     * Real time environment map
     */
    // Second environment map
    var environmentMap2 = textureLoader.load('/environmentMaps/blockadesLabsSkybox/scifi_white_sky_scrapers_in_clouds_at_day_time.jpg') 
    environmentMap2.mapping = THREE.EquirectangularReflectionMapping
    environmentMap2.colorSpace = THREE.SRGBColorSpace

    currentScene.background2 = environmentMap2
}

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 16

const positions = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 4
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true

particlesMaterial.color = new THREE.Color('#ffffff')

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
currentScene.add(particles)

particles.position.y = 1
particles.position.z =  0.1

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()
raycaster.set(rayOrigin, rayDirection)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0.95
camera.position.z = 6
currentScene.add(camera)


/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

window.addEventListener('mouseClicked', (event) => {
    if (mouse.x >= 15 && mouse.x <= 65 &&
        mouse.y >= 10 && mouse.y <= 45) {
        if (currentScene === 1) {
            drawScene2();
        } else if (currentScene === 2) {
            drawScene3();
        } else if (currentScene === 3) {
            drawScene4();
        }  else if (currentScene === 4) {
            drawScene5();
        } else if (currentScene === 5) {
            drawScene1();
        }
    }
})

// Controls https://github.com/mrdoob/three.js/issues/20805
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target.set(0, .95, -0.6)
controls.update()
controls.listenToKeyEvents( window )

//controls.keys = { LEFT: 'KeyA', UP: 'KeyW', RIGHT: 'KeyD', BOTTOM: 'KeyS' }
window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 87: // W
            camera.position.z -= 0.1;
            break;
        case 65: // A
            camera.position.x -= 0.1;
            break;
        case 83: // S
            camera.position.z += 0.1;
            break;
        case 68: // D
            camera.position.x += 0.1;
            break;
    }
});

/**
 * Renderer
 */
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.autoClear = false;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update particles
    for(let i = 0; i < count; i++)
    {
        let i3 = i * 3

        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.cos(elapsedTime * x) / 5
    }
    particlesGeometry.attributes.position.needsUpdate = true

    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, camera)
    
    // Test intersect with a model
    if(model)
    {
        const modelIntersects = raycaster.intersectObject(model)
        
        if(modelIntersects.length)
        {
            renderer.render(currentScene, camera) 
        }

    }

    // Update controls
    controls.update()

    //Star Gate animation
    tuniform.iTime.value = clock.getElapsedTime() * .75;

    // Render
    renderer.clear();
    renderer.render(currentScene, camera)
    
    
    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()