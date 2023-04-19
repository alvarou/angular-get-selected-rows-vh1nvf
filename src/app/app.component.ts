import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridApi, SelectionChangedEvent } from 'ag-grid-community';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="getSelectedRowData()">Get Selected Rows</button>
    <ag-grid-angular
      style="width: 95vw; height: 100vh;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="onSelectionChanged($event)"
      rowSelection="multiple"
    ></ag-grid-angular>
  `,
  styles: ['button { margin: 10px; }'],
})
export class AppComponent {
  private gridApi: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'athlete',
      minWidth: 150,
    },
    {
      field: 'age',
      maxWidth: 90,
    },
    {
      field: 'country',
      minWidth: 150,
    },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowData: any[];

  constructor(private http: HttpClient) {}

  getSelectedRowData() {
    const selectedData = this.gridApi.getSelectedRows();
    alert(`Selected Data:\n${JSON.stringify(selectedData)}`);
    return selectedData;
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApi.getSelectedRows();
    console.log('Selection Changed', selectedData);
  }

  onGridReady(params) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
