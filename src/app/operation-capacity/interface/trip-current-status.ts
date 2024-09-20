import { SelectItem } from "primeng/api";

export class TripCurrentStatusHelper {
    static GetList():SelectItem[]{
        let list: SelectItem[]= [
            {label:'All', value:0},
            {label:'Finalized', value:1},
            {label:'Not Finalized', value:2},
            {label:'Picker Pending', value:3},
            {label:'Manual', value:4},
            {label:'Ready to Finalize', value:5},
        ];
        return list;
    }
}
