<template>
  <img alt="logo" width="400" height="400" src="./assets/drama_myhead.jpeg">
  <DramaIndex msg="Welcome to Drama"/>
</template>

<script>
import DramaIndex from './components/DramaIndex.vue';

export default {
  name: 'App',
  components: { DramaIndex }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
