<template>
    <header>
        <h1>
            Kanban
        </h1>
        <div>
            <router-link tag='button' to="/">Boards</router-link>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {

}
</script>

<style scoped lang="scss">
    header{
        padding: 1em;
        display: flex;
        background: linear-gradient(90deg, #9aa8fb,#8bacfa,#70b4f8);

        h1{
            padding: 0;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            color: white;
        }

        div{
            position: relative;
            &:before{
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 2px;
                background: #e5e9ef;
                transform:translateX(-0.5em);
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
