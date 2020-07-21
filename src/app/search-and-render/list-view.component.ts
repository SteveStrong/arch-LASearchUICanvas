import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchResult } from '../models';

// https://www.ag-grid.com/example-angular-material-design/

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnChanges {
    @Input() searchResults: Array<SearchResult>;

    private gridApi: GridApi;
    gridOptions: GridOptions = {};
    rowSelection = 'single';

    defaultColumnDefs = {
        sortable: true,
        filter: true,
        resizeable: true,
        cellStyle: { textAlign: 'left' },
        lockPosition: false
    };
    columnDefs = this.getColDefinitions(false);

    constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
        
        breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]).subscribe(result => {
            const isSmall = result.matches;

            if (isSmall) {
                this.columnDefs = this.getColDefinitions(isSmall);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        // tslint:disable-next-line: forin
        for (const propName in changes) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    }

    formatIsPinned(cell: any) {
        const { value: isPinned } = cell;
        return isPinned ? 'PINNED' : '';
    }

    getColDefinitions(isSmall: boolean) {
        return [
            { headerName: 'text', field: 'sentence.text', hide: false },
            { headerName: 'class', width: 50, field: 'sentence.rhetClass', hide: false },
            { headerName: 'id', width: 30, field: 'sentence.sentID', hide: false },
            { headerName: 'case', width: 30, field: 'sentence.caseNumber', hide: false },
            { headerName: 'score', width: 30, field: 'formatedScore', hide: false }
        ];
    }

    ngOnInit() {}

    onGridReady(params) {
        this.gridApi = params.api;
        // this.gridApi.sizeColumnsToFit();
    }

    onRowClick(rowInfo) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { result: rowInfo.data };
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.gridApi?.sizeColumnsToFit();
    }
}
