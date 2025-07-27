export class DialogResult<T = any> {
    readonly data?: T;
    readonly accepted: boolean;
    constructor(data?: T, accepted?: boolean) {
        this.data = data;
        this.accepted = !!accepted || !!data;
    }
}

class DialogModel<T = any> {
    result!: DialogResult<T>;
    opened: boolean = false;
    id: string;
    constructor(id: string) {
        this.id = id;
    }
    open(): Promise<DialogResult<T>> {
        return Promise.reject();
    }

    close(): Promise<DialogResult<T>> {
        return Promise.reject();
    }
}
export class DialogService {
    private dialogs: Array<DialogModel> = [];
    private static _instance: DialogService;
    private constructor() {
        this.dialogs = [];
    }

    public static getInstance(): DialogService {
        if (!this._instance) this._instance = new DialogService();
        return this._instance;
    }
    public static async getDialog<T>(id: string): Promise<DialogModel<T>> {
        let dialog: DialogModel<T> | undefined = this._instance.dialogs.find((e) => e.id == id);
        if (dialog) return Promise.resolve(dialog);
        else {
            dialog = new DialogModel(Date.now().toString());
            this._instance.dialogs.push(dialog);
            return Promise.resolve(dialog);
        }
    }
}
