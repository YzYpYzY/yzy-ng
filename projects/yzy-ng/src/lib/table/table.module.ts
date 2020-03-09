import { DropdownModule } from './../dropdown/dropdown.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { CellComponent } from './cell/cell.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
    declarations: [TableComponent, CellComponent, PaginatorComponent],
    imports: [CommonModule, FormsModule, DropdownModule],
    exports: [TableComponent]
})
export class TableModule {}
