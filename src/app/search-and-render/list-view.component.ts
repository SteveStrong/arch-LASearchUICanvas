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
    @Input() searchTextList: Array<string>;

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
        // for (const propName in changes) {
        //     const chng = changes[propName];
        //     const cur = JSON.stringify(chng.currentValue);
        //     const prev = JSON.stringify(chng.previousValue);
        //     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        // }
    }



    getColDefinitions(isSmall: boolean) {
        return [
            { headerName: 'Text', field: 'sentence.text', hide: false },
            { headerName: 'Sentence Type', width: 30, field: 'sentence.rhetLabel', cellStyle: { 'text-align': 'right' }, hide: false },
            {
                headerName: 'Sentence Id', width: 30, field: 'sentence.sentID', cellStyle: { 'text-align': 'right' }, hide: false,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
                        '</div>'
                }
            },
            {
                headerName: 'Score', width: 10, field: 'formatedScore',
                cellStyle: { 'text-align': 'right' }, type: 'rightaligned', hide: false,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
                        '</div>'
                }

            },
            {
                headerName: 'Case Number', width: 30, field: 'sentence.caseNumber', cellStyle: { 'text-align': 'center' }, hide: false,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
                        '</div>'
                }
            }
        ];
    }

    ngOnInit() {}

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
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
