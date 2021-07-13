import { Vue } from 'vue-property-decorator';

export interface KanbanApp extends Vue{
    modale: boolean;
    loading: boolean;

    setLoadingOn(): void;
    setLoadingOff() : void;

    loadKanban(): void;
}
