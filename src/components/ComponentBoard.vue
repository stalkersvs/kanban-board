<template>
  <div :id='id' class="board">
    <div class='header'>
      <input v-if='edit' v-model='selectedValue' type='text'>
      <h2 v-else v-html='value'></h2>
      <div class='controls' v-if='!readonly'>
        <button @click='toggleEdit' >
          <font-awesome-icon icon="edit" v-if='!edit' />
          <font-awesome-icon icon="check" v-else />
        </button>
        <button @click='reset' v-if='edit'>
          <font-awesome-icon icon="times" />
        </button>
        <slot name='remove'></slot>
      </div>
    </div>
    <slot name='lists'></slot>
    <slot name='edit'></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ComponentBoard extends Vue {
  private selectedValue = '';

  private edit = false;

  @Prop() private id!: string;

  @Prop() private value!: string;

  @Prop() private readonly !: boolean;

  /**
   * Reset inserted value
   */
  reset() {
    this.edit = false;

    this.selectedValue = this.value;
  }

  /**
   * Toggle input for editing via v-model
   */
  toggleEdit() {
    if (this.edit) {
      this.$emit('input', this.selectedValue);
    }

    this.edit = !this.edit;
  }

  constructor() {
    super();

    console.log('TEST', this.value);

    this.selectedValue = this.value;
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

    height: fit-content;

    @media (max-width: 520px) {
      margin-right: 0;
      margin-bottom: 1em;
    }

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
      align-items: flex-start;

      margin-left: 1em;
      flex-shrink: 0;
    }

    .header{
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      padding: 0 0 1em;
    }

    h2{
      color: #9a9cae;
      font-size: 18px;
      font-weight: 500;

       margin: 0;
    }

    input{
      border-radius: 5px;
      border: 1px solid black;
      padding: 0 0.5em;
      width: 100%;
    }

    button{
      border-radius: 5px;
      transition: 0.25s;
      cursor: pointer;

      border:2px solid #f4f4f5;
      background: #e5e9ef;

      &:hover{
        border-color: black;
      }
    }
  }
</style>
