<template>
  <section class="home" >
    <div class='table' v-if='board.id'>
      <section class="table" >
          <ComponentBoard
                v-model='board.name'
          >
            <template #remove>
             <button class='icon' @click='removeBoard()'>
               <font-awesome-icon icon="trash-alt" />
             </button>
            </template>
            <template #lists>
              <template v-for='(item_l,idx_l) in board.lists'>
                <ComponentList v-model='item_l.name'
                               :key='idx_l'
                              >
                  <template #remove>
                    <button class='icon' @click='removeList(idx_l)'>
                      <font-awesome-icon icon="trash-alt" />
                    </button>
                  </template>
                  <template #items>
                    <template v-for='(item_i,idx_i) in item_l.items'>
                      <ComponentItem
                              v-model='item_i.name'
                              :key='idx_i+idx_l'
                              >
                        <template #remove>
                          <button class='icon' @click='removeItem(idx_l, idx_i)'>
                            <font-awesome-icon icon="trash-alt" />
                          </button>
                        </template>
                      </ComponentItem>
                    </template>
                    <button  class='btn newItem' @click='addItem( idx_l)'>
                      <font-awesome-icon icon="plus" />
                    </button>
                  </template>
                </ComponentList>
              </template>
              <button  class='btn newList' @click='addList()'>
                <font-awesome-icon icon="plus" />
              </button>
            </template>
          </ComponentBoard>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ComponentList from '@/components/ComponentList.vue';
import ComponentBoard from '@/components/ComponentBoard.vue';
import ComponentItem from '@/components/ComponentItem.vue';
import {
  Board, Item, Kanban, List,
} from '@/api/api';
import { Sync } from 'vuex-pathify';
import { KanbanApp } from '@/utils/interfaces';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');

@Component({
  components: {
    ComponentList,
    ComponentBoard,
    ComponentItem,
  },
})
export default class Detail extends Vue {
  @Sync('data') private data!: Kanban;

  private board: Board = {} as Board;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: KanbanApp = this.$parent as any;

  async created() {
    this.board = await this.$api.getBoard(this.$route.params.id);
  }

  /**
   * Watch board for changes and update in database
   *
   * @param {Board} val
   */
  @Watch('board', { deep: true })
  watchBoard(val: Board) {
    this.$api.updateBoard(val.id, val);
  }

  /**
   * Remove board and return to home
   */
  async removeBoard() {
    this.parent.setLoadingOn();

    const resp: boolean = await this.$api.deleteBoard(this.board.id);

    this.parent.setLoadingOff();

    if (resp) {
      this.$router.push({ name: 'Home' });
    }
  }

  /**
   * Remove list from board list array by index
   *
   * @param {listId: number} listId
   */
  removeList(listId: number) {
    this.board.lists.splice(listId, 1);
  }

  /**
   * Remove item from list from board list array by index
   *
   * @param { number} listId
   * @param { number} itemId
   */
  removeItem(listId: number, itemId: number) {
    this.board.lists[listId].items.splice(itemId, 1);
  }

  /**
   * Generate new list and create
   */
  addList() {
    const list: List = {
      name: 'Nový list',
      id: uuidv4(),
      items: [],
    };

    this.board.lists.push(list);
  }

  /**
   * Add new item to list by id in board list array
   *
   * @param {number} listId
   */
  addItem(listId: number) {
    const item: Item = {
      name: 'Nový item',
      id: uuidv4(),
    };

    const list: List = this.board.lists[listId];

    list.items.push(item);
  }
}
</script>
<style lang='scss'>

  .home{
    padding: 1em;
  }

  .table{
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;

    .icon{
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;

    }
    .btn{
      font-size: 14px;
      color: black;
      cursor: pointer;

      border-radius: 5px;

      &.newBoard{
        width: 100px;
        flex-shrink: 0;
        font-size: 32px;

        border:2px solid #f4f4f5;
        background: #e5e9ef;

      }
      &.newList{
        width: 100%;
        border:2px solid #e1e3e9;
        background: #f4f4f5;
      }
      &.newItem{
        width: 100%;
        border:2px solid white;
        background: #e1e3e9;
      }

      transition: 0.25s;

      &:hover{
        border-color: black;
      }
    }
  }
</style>
