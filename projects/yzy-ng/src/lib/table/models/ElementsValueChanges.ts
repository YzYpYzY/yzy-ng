import { ElementValueChange } from './ElementValueChange';
/* tslint:disable no-unused-expression */
export class ElementsValueChanges {
    [key: string]: { [attribute: string] : any }

    toArray(): ElementValueChange[] {
        console.log(this);

        const changesAsArray = [];
        for(const id of Object.keys(this)){
            for(const attribute of Object.keys(this[id])){
                changesAsArray.push({
                    id,
                    attribute,
                    value: this[id][attribute],
                })
            };
        }
        console.log(changesAsArray);

        return changesAsArray;
    }
}
