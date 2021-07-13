<template>
    <header>
       <div>
           <h1>
               Kanban
           </h1>
           <div class='nav'>
               <router-link tag='button' to="/">Boards</router-link>
           </div>
       </div>
        <router-link  v-if='headerVisibility'
                        tag='button'
                        :to='{
                            params: { anchor: `${$route.params.id}`},
                            name: `Home`,
                        }'>
            Späť
        </router-link>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { Kanban } from '@/api/api';

@Component
export default class Header extends Vue {
    @Get('data') private data!: Kanban;

    /**
     * Get hader visibility if router param is listed
     */
    get headerVisibility() {
      return this.$route.params.id !== undefined;
    }
}
</script>

<style scoped lang="scss">
    header{
        padding: 1em;
        display: flex;
        background: linear-gradient(90deg, #9aa8fb,#8bacfa,#70b4f8);

        height: 60px;

        flex-direction: row;
        justify-content: space-between;

        >button{
            padding: 0em 2em;

            flex-shrink: 0;

            background: transparent;
            border: 2px solid white;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: 500;
        }

        h1{
            padding: 0;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            color: white;
        }

        >div{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .nav{

            position: relative;
            &:before{
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                height: 200%;
                width: 2px;
                background: #e5e9ef;
                transform: translateX(-0.5em) translateY(-25%);
            }
            display: flex;
            margin-left: 1em;
            button{
                background: transparent;
                border: none;
                font-size: 16px;
                padding: 0;
                cursor: pointer;
                transition: 0.25s;
                color: #e5e9ef;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>
