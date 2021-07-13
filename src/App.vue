<template>
  <main id="app">
    <Header></Header>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/parts/Header.vue';

  @Component({
    components: { Header },
  })
export default class App extends Vue {}
</script>

<style lang="scss" >

  html,body{
    margin: 0;
    padding: 0;
  }

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

  *{
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  main{
    min-height: 100vh;
    background: #e5e9ef;
  }
</style>
