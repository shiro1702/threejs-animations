<template>
  <div class="container">
    <div>
      <!-- <Logo /> -->


      <!-- <canvas id="editor-canvas" ref="canvas"></canvas> -->
      
      <h1 class="title">
        best-site
      </h1>
      <div class="links">
        <div class="button--green" @click="setCameraPos({x: 0, y: 0,z: 10})"> 1 </div>
        <div class="button--green" @click="setCameraPos({x: 30, y: 20,z: 20})"> 2 </div>
        <div class="button--green" @click="setCameraPos({x: -20, y: 7,z: 8})"> 3 </div>
      </div>
      <div class="links">
        <div class="button--green" @click="setCameraLookAtPos({x: 0, y: 0,z: 0})"> 0 </div>
        <div class="button--green" @click="setCameraLookAtPos({x: 0, y: 0,z: 1})"> 1 </div>
        <div class="button--green" @click="setCameraLookAtPos({x: 1, y: 0,z: 0})"> 2 </div>
        <div class="button--green" @click="setCameraLookAtPos({x: 0, y: 1,z: 0})"> 3 </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

import Scene from '@/components/Scene/Scene';
export default {
  components: {
    Scene,
  },
  methods: {
    ...mapMutations('scene', ['setCameraPos', 'setCameraLookAtPos']),
    
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
