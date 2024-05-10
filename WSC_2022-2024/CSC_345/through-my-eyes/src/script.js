/*
 * Program based hevily on Hounted House example 
 * Easter egg "Rotating Door" located inside Gardener Hall at (x:0 z:0)
 * Easter egg "Ominous floating cube" position: random
 * 
 * 
 * colors from: https://encycolorpedia.com/6b6e72
 * Code is currently unfinished; missing music, raycasting
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import GUI from 'lil-gui'
import * as CANNON from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


/**
 * Base
 */
// Debug
const gui = new GUI()
const debugObject = {}

debugObject.createSphere = () =>
{
    createSphere(
        Math.random() * 0.5,
        {
            x: (Math.random() * 3) * 3,
            y: 10,
            z: (Math.random() - 0.5) * 3
        }
    )
}

gui.add(debugObject, 'createSphere')

// Reset
debugObject.reset = () =>
{
    for(const object of objectsToUpdate)
    {
        // Remove body
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)

        // Remove mesh
        scene.remove(object.mesh)
    }
    
    objectsToUpdate.splice(0, objectsToUpdate.length)
}
gui.add(debugObject, 'reset')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.0015, 0.015, 0.015)
        gltf.scene.position.x = + 10
        scene.add(gltf.scene)

        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[2])
        action.play()
    }
)


/**
 * Sounds
 */
const hitSound = new Audio('/sounds/hit.mp3')

const playHitSound = (collision) =>
{
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    if(impactStrength > 1.5)
    {
        hitSound.volume = Math.random()
        hitSound.currentTime = 0
        hitSound.play()
    }
}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

const particleTexture = textureLoader.load('/textures/particles/12.png')

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// Shingle textures from: https://3dtextures.me/2018/09/25/asphalt-shingles-001/ 
const shinglesColorTexture = textureLoader.load('/textures/shingles/color.jpg')
shinglesColorTexture.colorSpace = THREE.SRGBColorSpace
const shinglesAmbientOcclusionTexture = textureLoader.load('/textures/shingles/ambientOcclusion.jpg')
const shinglesNormalTexture = textureLoader.load('/textures/shingles/normal.jpg')
const shinglesRoughnessTexture = textureLoader.load('/textures/shingles/roughness.jpg')

shinglesColorTexture.repeat.set(12, 12)
shinglesAmbientOcclusionTexture.repeat.set(12, 12)
shinglesNormalTexture.repeat.set(8, 8)
shinglesRoughnessTexture.repeat.set(8, 8)

shinglesColorTexture.wrapS = THREE.RepeatWrapping
shinglesAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
shinglesNormalTexture.wrapS = THREE.RepeatWrapping
shinglesRoughnessTexture.wrapS = THREE.RepeatWrapping

shinglesColorTexture.wrapT = THREE.RepeatWrapping
shinglesAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
shinglesNormalTexture.wrapT = THREE.RepeatWrapping
shinglesRoughnessTexture.wrapT = THREE.RepeatWrapping

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(16, 16)
grassAmbientOcclusionTexture.repeat.set(16, 16)
grassNormalTexture.repeat.set(16, 16)
grassRoughnessTexture.repeat.set(16, 16)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// Cobblestone path textures from: https://3dtextures.me/2022/05/21/stylized-stone-floor-005/
const stoneColorTexture = textureLoader.load('/textures/cobblestone/color.jpg')
stoneColorTexture.colorSpace = THREE.SRGBColorSpace
const stoneAmbientOcclusionTexture = textureLoader.load('/textures/cobblestone/ambientOcclusion.jpg')
const stoneNormalTexture = textureLoader.load('/textures/cobblestone/normal.jpg')
const stoneRoughnessTexture = textureLoader.load('/textures/cobblestone/roughness.jpg')

stoneColorTexture.repeat.set(40, 2)
stoneAmbientOcclusionTexture.repeat.set(40, 2)
stoneNormalTexture.repeat.set(40, 2)
stoneRoughnessTexture.repeat.set(40, 2)

stoneColorTexture.wrapS = THREE.RepeatWrapping
stoneAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
stoneNormalTexture.wrapS = THREE.RepeatWrapping
stoneRoughnessTexture.wrapS = THREE.RepeatWrapping

stoneColorTexture.wrapT = THREE.RepeatWrapping
stoneAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
stoneNormalTexture.wrapT = THREE.RepeatWrapping
stoneRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 * Physics
 */
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, - 8.82, 0)

// Default material
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.defaultContactMaterial = defaultContactMaterial

// Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5) 
world.addBody(floorBody)

/**
 * Utils
 */
const objectsToUpdate = []

// Create sphere
const sphereShape = new CANNON.Sphere(0.5)
const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(100, 3, 0),
    shape: sphereShape
})
world.addBody(sphereBody)

const sphereGeometry = new THREE.SphereGeometry(3, 9, 6)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5
})

const createSphere = (radius, position) =>
{
    // Three.js mesh
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.castShadow = true
    mesh.scale.set(radius, radius, radius)
    mesh.position.copy(position)
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Sphere(radius)

    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(100, 3, 0),
        shape: shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    // Save in objects
    objectsToUpdate.push({ mesh, body })
}

/**
 * Buldings
 */

// Gardener Hall container
const gardn = new THREE.Group()
scene.add(gardn)

// Gardener walls
const gardw = new THREE.Mesh(
    new THREE.BoxGeometry(4, 1.5, 6),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
gardw.position.y = 0.75
gardn.add(gardw)

// Gardener bridge
const gardb = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.5, 0.5),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
gardb.position.y = 1.25
gardb.position.x = 3
gardn.add(gardb)

// Gardner roof
const gardr = new THREE.Mesh(
    new THREE.ConeGeometry(2.85, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
gardr.rotation.y = Math.PI * 0.25
gardr.position.y = 1.5 + 0.5
gardr.position.z = -1
gardn.add(gardr) 

const gardr2 = new THREE.Mesh(
    new THREE.ConeGeometry(2.85, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
gardr2.rotation.y = Math.PI * 0.25
gardr2.position.y = 1.5 + 0.5
gardr2.position.z = 1
gardn.add(gardr2) 

// Door -easter egg-
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y = 1
door.position.z = 2
gardn.add(door)


// Cat bulding
const cat = new THREE.Group()
scene.add(cat)

// Cat walls
const catw = new THREE.Mesh(
    new THREE.BoxGeometry(4, 1.5, 5),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
cat.add(catw)
catw.position.y = 0.75
catw.position.x = 6

// Cat roof
const catr = new THREE.Mesh(
    new THREE.BoxGeometry(4, 1, 2.5),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
catr.position.y = 1.25
catr.position.x = 6
cat.add(catr)

// Morey Hall
const morey = new THREE.Group()
scene.add(morey)

// Morey walls
const moreyw = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2.5, 6),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
morey.add(moreyw)
moreyw.position.y = 1.25
moreyw.position.x = 1.25
moreyw.position.z = 9

// Morey roof
const moreyr = new THREE.Mesh(
    new THREE.ConeGeometry(2.15, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
moreyr.rotation.y = Math.PI * 0.25
moreyr.position.y = 2.5 + 0.5
moreyr.position.x = 1.25
moreyr.position.z = 7.5
morey.add(moreyr)

const moreyr2 = new THREE.Mesh(
    new THREE.ConeGeometry(2.15, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
moreyr2.rotation.y = Math.PI * 0.25
moreyr2.position.y = 2.5 + 0.5
moreyr2.position.x = 1.25
moreyr2.position.z = 10.5
morey.add(moreyr2)

// Terrace Hall
const terr = new THREE.Group()
scene.add(terr)

// terrace walls
const terrw = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
terr.add(terrw)
terrw.position.y = 1.25
terrw.position.x = -4.50
terrw.position.z = 9

// Terrace roof
const terrR = new THREE.Mesh(
    new THREE.ConeGeometry(2.15, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
terrR.rotation.y = Math.PI * 0.25
terrR.position.y = 2.5 + 0.5
terrR.position.x = -4.50
terrR.position.z = 8.5
terr.add(terrR)

const terrR2 = new THREE.Mesh(
    new THREE.ConeGeometry(2.15, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
terrR2.rotation.y = Math.PI * 0.25
terrR2.position.y = 2.5 + 0.5
terrR2.position.x = -4.50
terrR2.position.z = 9.5
terr.add(terrR2) 

// Benthack Hall
const benth = new THREE.Group()
scene.add(benth)

// South wing
const bents = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1.75, 6),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
benth.add(bents)
bents.position.y = 0.85
bents.position.x = -8.50
bents.position.z = -1

// North wing
const bentn = new THREE.Mesh(
    new THREE.BoxGeometry(5, 1.5, 2.5),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
benth.add(bentn)
bentn.position.y = 0.75
bentn.position.x = -8
bentn.position.z = -4

// Bowen Hall
const bow = new THREE.Mesh(
    new THREE.BoxGeometry(4, 6, 3),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
scene.add(bow)
bow.position.y = 2.5
bow.position.x = 0
bow.position.z = -10

// Pile Hall
const pile = new THREE.Group()
scene.add(pile)

// Pile walls
const pilew = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 3),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
pile.add(pilew)
pilew.position.y = 1.25
pilew.position.x = -8.5
pilew.position.z = -11

// Pile roof
const piler = new THREE.Mesh(
    new THREE.ConeGeometry(2.15, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
piler.rotation.y = Math.PI * 0.25
piler.position.y = 2.5 + 0.5
piler.position.x = -9
piler.position.z = -11
pile.add(piler)

const piler2 = new THREE.Mesh(
    new THREE.ConeGeometry(2.15, 1, 4),
    new THREE.MeshStandardMaterial({
        map: shinglesColorTexture,
        aoMap: shinglesAmbientOcclusionTexture,
        normalMap: shinglesNormalTexture,
        roughnessMap: shinglesRoughnessTexture
    })
)
piler2.rotation.y = Math.PI * 0.25
piler2.position.y = 2.5 + 0.5
piler2.position.x = -8
piler2.position.z = -11
pile.add(piler2)

// Ominous cube -easter egg-
const ocube = new THREE.Group()
scene.add(ocube)

const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const cubeMaterial = new THREE.MeshStandardMaterial({ color: '#000000' })

for(let i = 0; i < 1; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true

    // Position
    cube.position.set(x, 0.5, z)                              

    // Rotation
    cube.rotation.z = (Math.random() - 0.5) * 0.4
    cube.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the ocube container
    ocube.add(cube)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Path
const path = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 2),
    new THREE.MeshStandardMaterial({
        map: stoneColorTexture,
        aoMap: stoneAmbientOcclusionTexture,
        normalMap: stoneNormalTexture,
        roughnessMap: stoneRoughnessTexture
    })
)
path.rotation.x = - Math.PI * 0.5
path.position.x = -5
path.position.y = 0.01
path.position.z = 4.5
scene.add(path)

// Path2
const path2 = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 1),
    new THREE.MeshStandardMaterial({
        map: stoneColorTexture,
        aoMap: stoneAmbientOcclusionTexture,
        normalMap: stoneNormalTexture,
        roughnessMap: stoneRoughnessTexture
    })
)
path2.rotation.x = - Math.PI * 0.5
path2.position.x = -5
path2.position.y = 0.01
path2.position.z = -6.5
scene.add(path2)


/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

// raycaster.set(rayOrigin, rayDirection)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#6c6e71', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const sunLight = new THREE.DirectionalLight('#FFFFED', 0.26)
sunLight.position.set(20, 50,  20)
gui.add(sunLight, 'intensity').min(0).max(1).step(0.001)
gui.add(sunLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(sunLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(sunLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(sunLight)

// Door light
/* const doorLight = new THREE.PointLight('#ff7d46', 3, 7) 
doorLight.position.set(0, 2.2, 2.7)
gardn.add(doorLight) */

/**
 * Model
 */
const gltfLoader2 = new GLTFLoader()

let model = null
gltfLoader2.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        model = gltf.scene
        model.position.z = - 10
        scene.add(model)
    }
)

/**
 * Fog
 */
const fog = new THREE.Fog('#56585b', 1, 50)
scene.fog = fog

/**
 * Rain https://www.solutiondesign.com/insights/webgl-and-three-js-particles/
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 100000

const positions = new Float32Array(count * 30)
const colors = new Float32Array(count * 30)

for(let i = 0; i < count * 30; i++)
{
    positions[i] = (Math.random() - 0.5) * 100
    colors[i] = Math.random()
    // This will create all the vertices in a range of -200 to 200 in all directions
    //var x = Math.random() * 400 - 200;
    //var y = Math.random() * 400 - 200;
    //var z = Math.random() * 400 - 200;
    // Create the vertex
    //var particle = new THREE.Vector3(x, y, z);
    // Add the vertex to the geometry
    //particles.vertices.push(particle);
}


particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true

particlesMaterial.color = new THREE.Color('#4d5665')

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.01
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending

particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


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
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

// Fullscreen resizing
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement ||
        document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 5
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setClearColor('#56585b')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//container.appendChild( renderer.domElement )

// Controls
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = false
//controls.maxPolarAngle = Math.PI / 2.1  // https://stackoverflow.com/questions/24437296/keeping-camera-above-ground-using-orbitcontrols-js

// fp controls
const fpControls = new FirstPersonControls( camera, canvas )
//fpControls.maxPolarAngle = Math.PI / 2.1  // https://stackoverflow.com/questions/24437296/keeping-camera-above-ground-using-orbitcontrols-js
fpControls.lookSpeed = 0.20
fpControls.movementSpeed = 10
//fpControls.activeLook = false
//fpControls.enabled = true
//fpControls.mouseDragOn = true


/**
 * Shadows
 */
renderer.shadowMap.enabled = true

sunLight.castShadow = true
//doorLight.castShadow = true

gardw.castShadow = true
gardb.castShadow = true
catw.castShadow = true
catr.castShadow = true
moreyw.castShadow = true
moreyr.castShadow = true
moreyr2.castShadow = true
terrw.castShadow = true
terrR.castShadow = true
terrR2.castShadow = true
bents.castShadow = true
bentn.castShadow = true
bow.castShadow = true
pilew.castShadow = true
piler.castShadow = true
piler2.castShadow = true
gardw.receiveShadow = true
gardb.receiveShadow = true
catw.receiveShadow = true
catr.receiveShadow = true
moreyw.receiveShadow = true
moreyr.receiveShadow = true
moreyr2.receiveShadow = true
terrw.receiveShadow = true
terrR.receiveShadow = true
terrR2.receiveShadow = true
bents.receiveShadow = true
bentn.receiveShadow = true
bow.receiveShadow = true
pilew.receiveShadow = true
piler.receiveShadow = true
piler.receiveShadow = true
floor.receiveShadow = true
path.receiveShadow = true

sunLight.shadow.mapSize.width = 256
sunLight.shadow.mapSize.height = 256
sunLight.shadow.camera.far = 150

//doorLight.shadow.mapSize.width = 256
//doorLight.shadow.mapSize.height = 256
//doorLight.shadow.camera.far = 7

renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock(true)
let oldElapsedTime = 0
//const deltaTime = new THREE.deltaTime()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Update particles
    /*var verts = particlesGeometry.attributes.position.vertices;
    for(var i = 0; i < verts.length; i++) {
    var vert = verts[i];
    if (vert.y < -200) {
    vert.y = Math.random() * 400 - 200;
    }
    vert.y = vert.y - (10 * deltaTime);
    }
    particleSystem.geometry.verticesNeedUpdate = true;
   */
   

    for(let i = 0; i < count; i++)
    {
        let i3 = i * 30

        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 10] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true

    // Update physics

    world.step(1 / 60, deltaTime, 3)

    for(const object of objectsToUpdate)
    {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, camera)


    // Test intersect with a model
    if(model)
    {
        const modelIntersects = raycaster.intersectObject(model)
        
        if(modelIntersects.length)
        {
            model.scale.set(1.2, 1.2, 1.2)
        }
        else
        {
            model.scale.set(1, 1, 1)
        }
    }

    // Model animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }
    
    // Update controls
    //awcontrols.update()
    fpControls.update(clock.getDelta())


    // Update objects
    door.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()