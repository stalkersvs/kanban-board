<template>
  <main id="app">
    <Header></Header>
    <div class='loader' v-show='loading'>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" display="block"><circle cx="50" cy="50" fill="none" stroke="#70b4f8" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"/></circle></svg>
    </div>
    <div class='content' v-show='!loading'>
      <router-view v-if='!modale'/>
      <div class='modale' v-else>
          <p>
            Api is currently unavailable
          </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/parts/Header.vue';
import { Sync } from 'vuex-pathify';
import { Kanban } from '@/api/api';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { KanbanApp } from '@/utils/interfaces';

@Component({
  components: { Header },
})
export default class App extends Vue implements KanbanApp {
    @Sync('data') private data!: Kanban;

    modale = false;

    loading = false;

    /**
     * Set loading on
     */
    setLoadingOn() {
      console.log('LOADING ON');
      this.loading = true;
    }

    /**
     * Set loading off
     */
    setLoadingOff() {
      console.log('LOADING OFF');
      this.loading = false;
    }

    /**
     * Get list of all boards
     */
    async loadKanban() {
      await this.$api.getKanban()
        .then((resp: Kanban) => {
          this.data = resp;
        })
        .catch((err) => {
          this.modale = true;
          throw err;
        });
    }

    /**
     * Bootstap of application
     */
    created() {
      const axios: AxiosInstance = this.$api.getAxiosInstance();

      axios.interceptors.request.use((config: AxiosRequestConfig) => {
        this.loading = true;

        console.log(axios.defaults);

        // eslint-disable-next-line no-param-reassign
        config.headers.common = {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/json',
        };

        return config;
      });

      axios.interceptors.response.use(
        (response) => {
          setTimeout(() => {
            this.loading = false;
          }, 100);
          return response;
        },
        (error) => Promise.reject(error),
      );
    }
}
</script>

<style lang="scss" >

  html,body{
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  .loader{
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
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
