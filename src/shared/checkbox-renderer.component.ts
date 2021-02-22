import { Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'checkbox-renderer',
    template: `
    <input style="margin-left=10px;"
      type="checkbox" (click)="checkedHandler($event)"
      [checked]="params.value"      
    />
`,
})
export class CheckboxRenderer implements ICellRendererAngularComp {
    public params: any;
    private cubed: number;

    agInit(params: any): void {
        this.params = params;
    }

    checkedHandler(event) {
        let checked = event.target.checked;
        let colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
    }

    // called when the cell is refreshed
    refresh(params: any): boolean {
        this.params = params;
        this.cubed = this.params.data.value * this.params.data.value * this.params.data.value;
        return true;
    }

}
