export class ColumnsITable {
    public matColumnDef: string;
    public title: string;
    public name: string;

    constructor( imatColumnDef: string, ititle: string, iname: string ) {
        this.matColumnDef = imatColumnDef;
        this.title = ititle;
        this.name = iname;
    }
}
