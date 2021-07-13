<template>
  <div :id='id' class="list">
    <div class='header'>
      <input v-if='edit' v-model='selectedValue' type='text'>
      <h3 v-else v-html='value'></h3>
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
    <slot name='items'></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ComponentList extends Vue {
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

    this.selectedValue = this.value;
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

      margin: 0;
    }

    background: #e1e3e9;
    box-shadow: 0px 0px 5px 1px #e1e3e9;

    .header{
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      margin-bottom: 1em;
    }

    .controls{
      display: flex;
      align-items: flex-start;

      margin-left: 1em;
      flex-shrink: 0;
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

      border:2px solid #e1e3e9;
      background: #f4f4f5;

      &:hover{
        border-color: black;
      }
    }
  }
</style>
