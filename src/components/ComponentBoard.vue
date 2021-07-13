<template>
  <div :id='id' class="board">
    <div class='header'>
      <input v-if='edit' type='text'>
      <h2 v-else v-html='name'></h2>
      <div class='controls'>
        <button @click='toggleEdit'>
          <slot name='edit'></slot>
        </button>
        <slot name='remove'></slot>
      </div>
    </div>
    <slot name='lists'></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ComponentBoard extends Vue {
  @Prop() private id!: string;

  @Prop() private name!: string;

  @Prop({ default: true }) private edit!: boolean;

  toggleEdit() {

  }
}
</script>

<style scoped lang="scss">

  @mixin random-bgr(){
    background: linear-gradient(
            90deg,
            rgb(random(255), random(255), random(255)),
            rgb(random(255), random(255), random(255))
    );
  }

  $num-colors: 10;

  .board{
    background: #f4f4f5;
    padding: 1em;

    width: 100%;

    margin-right: 1em;

    position: relative;

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    overflow:hidden;

    @for $i from 0 to $num-colors {
      &:nth-of-type(#{$i}) {
        &:before {
          @include random-bgr();
        }
      }
    }

    &:before{
      content: " ";
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 5px;
    }

    .controls{
      display: flex;
    }

    .header{
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }

    h2{
      color: #9a9cae;
      font-size: 18px;
      font-weight: 500;
    }
  }
</style>
