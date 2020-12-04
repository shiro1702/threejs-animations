import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
class SceneInit {
    constructor({ rootEl, autoRotate, store }) {
        this.canvas = document.createElement('canvas');

        this.cameraTarget = store.state.scene.cameraPos;
        this.cameraLookAtPos = store.state.scene.cameraLookAtPos;
        this.cameraLookAtPosDinamic = Object.assign({}, this.cameraLookAtPos);
        // this.cameraLookAtPos = new THREE.Vector3(store.state.scene.cameraLookAtPos.x,  store.state.scene.cameraLookAtPos.y, store.state.scene.cameraLookAtPos.z);

        this.root = rootEl;
        this.width = rootEl.clientWidth;
        this.height = rootEl.clientHeight;

        this.background = 0xEEEEEE;

        this.autoRotate = autoRotate;

        this.init();
        this.update();
        this.bindEvents();
    }

    init() {
        this.initScene();
        this.initLights();
        this.initCamera();
        this.initRenderer();
        // this.initControls();

        this.root.appendChild(this.canvas);
    }

    initScene() {
        
        this.scene = new THREE.Scene();

        // this.cameraTarget = new THREE.Vector3(); // координаты для перемешения камеры
        this.cameraMouseTarget = new THREE.Vector3(); // координаты смещения камеры пл координатам мышки
        // this.cameraLookAtPos = new THREE.Vector3(); // координаты слежения камеры камеры пл координатам мышки
        this.mouse = new THREE.Vector2(); // 2х мерные координаты мышки 
    }

    initLights() {
        const ambient = new THREE.AmbientLight(0xFFFFFF, 0.9);
        const point = new THREE.PointLight(0xCCCCCC, 0.1, 10);
        const directional = new THREE.DirectionalLight(0xFFFFFF, 0.5);

        this.scene.add(ambient);
        this.scene.add(point);
        this.scene.add(directional);
    }

    initCamera() {
        
        const aspect = this.width / this.height;

        this.camera = new THREE.PerspectiveCamera(
            5,
            aspect,
            1,
            100
        );

        this.camera.position.z = this.cameraTarget.z;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();

        // this.cameraTarget.z =  this.camera.position.z 
    }
    cameraAnimation(){
        const r = Math.sqrt( this.cameraTarget.x*this.cameraTarget.x + this.cameraTarget.y+this.cameraTarget.y + this.cameraTarget.z+this.cameraTarget.z );
        const a = Math.atan( Math.sqrt(this.cameraTarget.x*this.cameraTarget.x + this.cameraTarget.y+this.cameraTarget.y) / (this.cameraTarget.z == 0 ? 0 : this.cameraTarget.z) );
        const b = Math.atan( this.cameraTarget.x == 0 ? 0 : this.cameraTarget.y / this.cameraTarget.x );
        
        const a1 = a - (this.mouse.x ) * 0.0005;
        const b1 = b + (this.mouse.y ) * 0.0005;

        this.cameraMouseTarget.x = - this.cameraTarget.x + r*Math.sin(a1)*Math.cos(b1);
        this.cameraMouseTarget.y = - this.cameraTarget.y + r*Math.sin(a1)*Math.sin(b1);
        this.cameraMouseTarget.z = - this.cameraTarget.z + r*Math.cos(a1);

        this.camera.position.x += 0.05 * ( this.cameraTarget.x + this.cameraMouseTarget.x - this.camera.position.x );
        this.camera.position.y += 0.05 * ( this.cameraTarget.y + this.cameraMouseTarget.y - this.camera.position.y );
        this.camera.position.z += 0.05 * ( this.cameraTarget.z + this.cameraMouseTarget.z - this.camera.position.z );
        
        this.cameraLookAtPosDinamic.x += 0.05 * ( this.cameraLookAtPos.x - this.cameraLookAtPosDinamic.x );
        this.cameraLookAtPosDinamic.y += 0.05 * ( this.cameraLookAtPos.y - this.cameraLookAtPosDinamic.y );
        this.cameraLookAtPosDinamic.z += 0.05 * ( this.cameraLookAtPos.z - this.cameraLookAtPosDinamic.z );

        this.camera.lookAt( new THREE.Vector3(this.cameraLookAtPosDinamic.x,  this.cameraLookAtPosDinamic.y, this.cameraLookAtPosDinamic.z))
    } 
    
    onMouseMove( event ) {
        this.mouse.x = ( event.clientX - this.width /2 );
        this.mouse.y = ( event.clientY - this.height / 2 );
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(this.background, 1);

        this.canvas = this.renderer.domElement;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        requestAnimationFrame(() => this.update());
        this.cameraAnimation();
        this.render();
    }

    loadModel(model, callback) {
        this.loader = new GLTFLoader();

        this.loader.load(model, (gltf) => {
            if (typeof callback === 'function') {
                callback(gltf.scene);
            }

            this.scene.add(gltf.scene);
        });
    }

    add(model) {
        this.scene.add(model);
    }

    remove(objName) {
        const object = this.scene.getObjectByName(objName);

        if (object) {
            this.scene.remove(object);
        }
    }

    onResize() {
        this.width = this.root.clientWidth;
        this.height = this.root.clientHeight;

        this.renderer.setSize(this.width, this.height);

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.onResize());

        window.addEventListener( 'mousemove', (e) => this.onMouseMove(e), false );
    }
}

// To call our class as a function
const sceneInit = args => new SceneInit(args);

export default sceneInit;