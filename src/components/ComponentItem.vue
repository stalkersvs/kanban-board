<template>
  <div :id='id' class="item">
    <input v-if='edit' type='text'>
    <p v-else v-html='name'></p>
    <div class='controls'>
      <button @click='toggleEdit'>
        <slot name='edit'></slot>
      </button>
      <slot name='remove'></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ComponentItem extends Vue {
  @Prop() private id!: string;

  @Prop() private name!: string;

  @Prop({ default: true }) private edit!: boolean;

  toggleEdit() {

  }
}
</script>

<style scoped lang="scss">
  .item{
    background: white;
    padding: 0.5em;

    display: flex;
    justify-content: space-between;
    align-items: center;

    p{
      margin: 0;

      font-size: 14px;
      font-weight: 400;
      color: #ababb5;
    }
    border-radius: 5px;
    margin-bottom: 0.5em;

    .controls{
      display: flex;
    }
  }
</style>
