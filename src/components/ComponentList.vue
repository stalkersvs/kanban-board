<template>
  <div :id='id' class="list">
    <div class='header'>
      <input v-if='edit' type='text'>
      <h3 v-else v-html='name'></h3>
      <div class='controls'>
        <button @click='toggleEdit'>
          <slot name='edit'></slot>
        </button>
        <slot name='remove'></slot>
      </div>
    </div>
    <slot name='items'></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ComponentList extends Vue {
  @Prop() private id!: string;

  @Prop() private name!: string;

  @Prop({ default: true }) private edit!: boolean;

  toggleEdit() {

  }
}
</script>

<style scoped lang="scss">
  .list{
    padding: 1em;
    margin-bottom: 1em;

    h3{
      font-size: 16px;
      font-weight: 500;
    }

    background: #e1e3e9;
    box-shadow: 0px 0px 5px 1px #e1e3e9;

    .header{
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }

    .controls{
      display: flex;
    }
  }
</style>
