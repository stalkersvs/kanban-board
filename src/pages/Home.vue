<template>
  <section class="home" >
    <div class='table' v-if='data'>
      <section class="table" v-if='data'>
        <template v-for='(item_b,idx_b) in data.boards'>
          <ComponentBoard
                  v-model='item_b.name'
                  :key='idx_b'
                  :readonly='true'>
            <template #edit>
              <button class='icon' @click='selectBoard(idx_b)'>
                Vybrať board
              </button>
            </template>
            <template #lists>
              <template v-for='(item_l,idx_l) in item_b.lists'>
                <ComponentList v-model='item_l.name'
                               :key='idx_l+idx_b'
                               :readonly='true'>
                  <template #items>
                    <template v-for='(item_i,idx_i) in item_l.items'>
                      <ComponentItem
                              v-model='item_i.name'
                              :key='idx_i+idx_l+idx_b'
                              :readonly='true'>
                      </ComponentItem>
                    </template>
                  </template>
                </ComponentList>
              </template>
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
import { Board, Kanban } from '@/api/api';
import { Sync } from 'vuex-pathify';

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
  @Sync('data') private data!: Kanban;

  selectBoard(boardId: number) {
    this.$router.push({
      name: 'Detail',
      params: {
        id: boardId,
      } as any,
    });
  }

  addBoard() {
    const board: Board = {
      name: 'Nový board',
      id: uuidv4(),
      lists: [],
    };

    if (this.data) {
      this.data.boards.push(board);
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

      transition: 0.25s;

      &:hover{
        border-color: black;
      }
    }
  }
</style>
