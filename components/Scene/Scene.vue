<template>
    <div ref="container" class="scene coverdiv">
        <!-- <SceneOptions
            v-show="isLoaded"
            :autoRotate="autoRotate"
            :showWireframes="showWireframes"
            @startAllOver="startAllOver"
            @toggleRotate="toggleRotate"
            @setActiveMesh="setActiveMesh"
            @toggleWireframes="toggleWireframes"
        /> -->

        <!-- <v-overlay :value="!isLoaded" absolute color="grey lighten-2">
            <v-progress-circular indeterminate></v-progress-circular>
        </v-overlay> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';

// import { findArraySibling } from '~/utils/findArraySibling.js';

import SceneInit from './js/Scene.init';


// import SceneOptions from './Scene.options';
export default {
    // components: { SceneOptions },
    data() {
        return {
            model: {},
            objects: [],
            activeMesh: {},
            isLoaded: false,
            showWireframes: true,
            autoRotate: false,
            // cameraPos: {
            //     x: 0, 
            //     y: 0,
            //     z: 10,
            // },
        };
    },
    computed: {
        // editorCanvas() {
        //     return document.getElementById('editor-canvas');
        // },
        ...mapState('scene', ['cameraPos']),
    },
    watch: {
        // cameraPos: {
        //     handler:  function () {
        //         if (this.scene) {
        //             this.scene.setCameraPos({x: this.cameraPos.x, y:this.cameraPos.y, z: this.cameraPos.z})
        //         }
        //     },
        //     deep: true
        // }
        
    },
    created() {
        // this.$nuxt.$on('MESH_UPDATE', this.updateMesh);
    },
    destroyed() {
        // this.$nuxt.$off('MESH_UPDATE', this.updateMesh);
    },
    mounted() {
        const { autoRotate } = this;
        this.scene = SceneInit({ rootEl: this.$refs.container, autoRotate, store: this.$store });
        this.loadModel();
        // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        // this.scene.add( light );
        // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        // this.scene.add( directionalLight );
    },
    methods: {
        // ...mapMutations('scene', ['setCameraPos']),
        /**
         * updateMesh - Updating the material map of the active mesh with the editor canvas
        */
        // updateMesh() {
        //     if (!this.activeMesh?.material) {
        //         return;
        //     }
        //     this.activeMesh.material.map.needsUpdate = true;
        // },
        /**
         * setActiveMesh - Set active mesh, assign a material map that duplicates the editor canvas
         *
         * @param {string} mesh          model mesh
         * @param {boolean} forward      go to the next or previous sibling
         * @param {boolean} onModelLoad  On model load
         *
        */
        // setActiveMesh({ mesh, forward = true, onModelLoad = false } = {}) {
        //     // const material = new THREE.Texture(this.editorCanvas);
        //     // const material = new THREE.MeshBasicMaterial({
        //     //     color: 0xFF8844,
        //     // });

        //     const loader = new THREE.TextureLoader();

        //     const material = new THREE.MeshBasicMaterial({
        //         map: loader.load('/model/textures/texture1.jpg'),
        //     });
        //     // navigation button event
        //     if (!mesh) {
        //         mesh = findArraySibling({
        //             arr: this.objects,
        //             current: this.activeMesh,
        //             pName: 'name',
        //             forward
        //         });
        //         if (!mesh) {
        //             return;
        //         }
        //     }
        //     // assign duplicated material map
        //     mesh.material = new THREE.MeshStandardMaterial({ map: material });
        //     this.activeMesh = mesh;
        //     // this.updateMesh();
        //     // ignore the new editor color call
        //     if (!onModelLoad) {
        //         this.$nuxt.$emit('ACTIVE_MESH_CHANGED');
        //     }
        // },
        /**
         * createWireframe - Create a wireframe and add it to the mesh
        */
        createWireframe({ mesh, color = 0x000000, linewidth = 4 } = {}) {
            const material = new THREE.LineBasicMaterial({ color, linewidth });
            const geometry = new THREE.EdgesGeometry(mesh.geometry);
            const wireframe = new THREE.LineSegments(geometry, material);
            wireframe.name = '_wireframe';
            wireframe.renderOrder = 1;
            mesh.add(wireframe);
        },
        /**
         * toggleWireframes - Toggle the wireframe visibility
        */
        toggleWireframes() {
            this.showWireframes = !this.showWireframes;
            // Iterator through the model's children
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    const wireframe = child.getObjectByName('_wireframe');
                    wireframe.visible = this.showWireframes;
                }
            });
        },
        // setCameraPos({x, y, z}){
        //     this.cameraPos.x = x;
        //     this.cameraPos.y = y;
        //     this.cameraPos.z = z;
        // },
        // initCameraAnimation(){
        //     this.scene.initCameraAnimation(
        //         (camera)=>{
        //             // this.target.x = ( 1 - this.mouse.x ) * 0.002;
        //             // this.target.y = ( 1 - this.mouse.y ) * 0.002;
                    
        //             // camera.rotation.x += 0.05 * ( this.target.y - camera.rotation.x );
        //             // camera.rotation.y += 0.05 * ( this.target.x - camera.rotation.y );
        //         }
        //     )
        // },
        /**
         * loadModel - Loading a model, adding wireframes to its meshes and defining the active object
        */
        loadModel() {
            this.isLoaded = false;
            this.scene.loadModel('model/Hand.gltf', (model) => {
                const loader = new THREE.TextureLoader();
    			// const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x666666, opacity: 0.3, wireframe: false, transparent: false } );
                // const material = new THREE.MeshBasicMaterial({
                //     map: loader.load('/model/textures/initialShadingGroup_normal.png'),
                // });
                const material = new THREE.MeshNormalMaterial();
                // let mesh = new THREE.Mesh(model, material);
                model.translateX(-0.3);
                model.translateY(0.7);
                // model.rotateX(-1);

                model.rotateZ(-0.3);
                model.name = 'hand';
                // Iterator through the model's children
                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        // reset original material
                        child.material = material;
                        // child.material = wireframeMaterial;

                        // create wireframes
                        // // this.createWireframe({ mesh: child });
                        // // // push to local array
                        // this.objects.push(child);
                    }
                });
                // set the first child as active
                // this.setActiveMesh({ mesh: this.objects[2], onModelLoad: true });



                // this.model = model;

                this.scene.add(model );
                setTimeout(() => {
                    this.isLoaded = true;
                }, 200);
            });
        },
        /**
         * toggleRotate - Toggle auto-rotation
        */
        toggleRotate() {
            this.autoRotate = !this.autoRotate;
            this.scene.autoRotate = this.autoRotate;
        },
        /**
         * startAllOver - Reload model
        */
        startAllOver() {
            this.objects = [];
            this.scene.remove('headphones');
            this.loadModel();
        }
    }
};
</script>

<style lang="sass">
.coverdiv
    position: absolute
    z-index: -1
    height: 100%
    width: 100%
</style>