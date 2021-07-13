import Api from './api/api';

declare module 'vue/types/vue' {

    interface Vue {
        $api: Api
    }
}
