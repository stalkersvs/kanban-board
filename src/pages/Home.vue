<template>
  <section class="home" >
    <div class='table' v-if='data'>
      <section class="table" v-if='data'>
        <template v-for='(item_b,idx_b) in data.boards'>
          <ComponentBoard
                  v-model='item_b.name'
                  :key='idx_b'
                  :id='item_b.id'
                  :readonly='true'>
            <template #edit>
              <button class='icon' @click='selectBoard(item_b.id)'>
                Vybrať board
              </button>
            </template>
            <template #lists>
              <template v-for='(item_l,idx_l) in item_b.lists'>
                <ComponentList v-model='item_l.name'
                               :id='item_l.id'
                               :key='idx_l+idx_b'
                               :readonly='true'>
                  <template #items>
                    <template v-for='(item_i,idx_i) in item_l.items'>
                      <ComponentItem
                              v-model='item_i.name'
                              :id='item_i.id'
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import ComponentList from '@/components/ComponentList.vue';
import ComponentBoard from '@/components/ComponentBoard.vue';
import ComponentItem from '@/components/ComponentItem.vue';
import { Board, Kanban } from '@/api/api';
import { Sync } from 'vuex-pathify';
import { Route } from 'vue-router';
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
export default class Home extends Vue {
  @Sync('data') private data!: Kanban;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: KanbanApp = this.$parent as any;

  /**
   * Watch rount param anchor for change
   *
   * @param {Route} val
   */
  @Watch('$route', { immediate: true })
  watchRoute(val: Route) {
    this.$nextTick(() => {
      if (val.params.anchor) {
        const id = val.params.anchor;
        const elem = document.getElementById(id);

        if (elem) {
          document.documentElement.scrollTo(0, elem.offsetTop);
        }
      }
    });
  }

  /**
   * Open board detail via board id
   *
   * @param {string} boardId
   */
  selectBoard(boardId: string) {
    this.$router.push({
      name: 'Detail',
      params: {
        id: boardId,
      },
    });
  }

  /**
   * Create new board
   */
  async addBoard() {
    this.parent.setLoadingOn();

    const board: Board = {
      name: 'Nový board',
      id: uuidv4(),
      lists: [],
    };

    await this.$api.createBoard(board);

    await this.parent.loadKanban();

    this.parent.setLoadingOff();
  }

  /**
   * Load board list
   */
  async created() {
    await this.parent.loadKanban();
  }
}

</script>
<style lang='scss' scoped>

  .home{
    padding: 1em;
  }

  .table{
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;

    @media (max-width: 520px) {
      flex-direction: column;
    }

    .icon{
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      font-weight: 500;
      border: 2px solid black;
      padding: 0.5em;

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

        @media (max-width: 520px) {
         width: 100%;
        }

      }

      transition: 0.25s;

      &:hover{
        border-color: black;
      }
    }
  }
</style>
