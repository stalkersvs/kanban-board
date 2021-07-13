<template>
  <section class="home" >
    {{ data }}
    <div class='table' v-if='data'>
      <section class="table" v-if='data'>
        <template v-for='(item_b,idx_b) in data.boards'>
          <ComponentBoard :name='item_b.name' :key='idx_b'>
            <template #remove>
             <div class='icon' >
               <font-awesome-icon @click='removeBoard(idx_b)' icon="trash-alt" />
             </div>
            </template>
            <template #edit>
              <font-awesome-icon icon="edit" />
            </template>
            <template #lists>
              <template v-for='(item_l,idx_l) in item_b.lists'>
                <ComponentList :name='item_l.name' :key='idx_l+idx_b'>
                  <template #remove>
                    <div class='icon' >
                      <font-awesome-icon @click='removeList(idx_b, idx_l)' icon="trash-alt" />
                    </div>
                  </template>
                  <template #edit>
                    <font-awesome-icon icon="edit" />
                  </template>
                  <template #items>
                    <template v-for='(item_i,idx_i) in item_l.items'>
                      <ComponentItem :name='item_i.name' :key='idx_i+idx_l+idx_b'>
                        <template #remove>
                          <div class='icon no-padding' >
                            <font-awesome-icon
                                    @click='removeItem(idx_b, idx_l, idx_i)'
                                    icon="trash-alt"
                            />
                          </div>
                        </template>
                        <template #edit>
                          <font-awesome-icon icon="edit" />
                        </template>
                      </ComponentItem>
                    </template>
                    <button class='btn newItem' @click='addItem(idx_b, idx_l)'>
                      <font-awesome-icon icon="plus" />
                    </button>
                  </template>
                </ComponentList>
              </template>
              <button class='btn newList' @click='addList(idx_b)'>
                <font-awesome-icon icon="plus" />
              </button>
            </template>
          </ComponentBoard>
        </template>
        <button class='btn newBoard' @click='addBoard'>
          <font-awesome-icon icon="plus" />
        </button>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ComponentList from '@/components/ComponentList.vue';
import ComponentBoard from '@/components/ComponentBoard.vue';
import ComponentItem from '@/components/ComponentItem.vue';
import {
  Board, Item, Kanban, List,
} from '@/api/api';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');

@Component({
  components: {
    ComponentList,
    ComponentBoard,
    ComponentItem,
  },
})
export default class Home extends Vue {
  private data: Kanban | null = null;

  async mounted() {
    this.data = await this.$api.getKanban();

    return true;
  }

  removeBoard(boardId: number) {
    if (this.data) {
      this.data.boards.splice(boardId, 1);
    }
  }

  removeList(boardId: number, listId: number) {
    if (this.data) {
      this.data.boards[boardId].lists.splice(listId, 1);
    }
  }

  removeItem(boardId:number, listId: number, itemId: number) {
    if (this.data) {
      this.data.boards[boardId].lists[listId].items.splice(itemId, 1);
    }
  }

  addBoard() {
    const board: Board = {
      name: 'test',
      id: uuidv4(),
      lists: [],
    };

    if (this.data) {
      this.data.boards.push(board);
    }
  }

  addList(boardId: number) {
    const list: List = {
      name: 'test',
      id: uuidv4(),
      items: [],
    };

    if (this.data) {
      const board: Board = this.data.boards[boardId];

      console.log(board);

      board.lists.push(list);
    }
  }

  addItem(boardId: number, listId: number) {
    console.log(this.data?.boards[boardId].lists[listId]);

    const item: Item = {
      name: 'test',
      id: uuidv4(),
    };

    if (this.data) {
      const board: Board = this.data.boards[boardId];

      const list: List = board.lists[listId];

      list.items.push(item);
    }
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

      padding: 0 0 0 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 1em;

      &.no-padding{
        padding-bottom: 0;
      }

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
