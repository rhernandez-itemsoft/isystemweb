import { Component, OnInit, Input, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ColumnsITable } from './models/entities';
class IDataSource implements DataSource<any> {
  public data: Array<any> = null;
  private statusSubject = new BehaviorSubject<any[]>([]);
  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();

  constructor(private http: HttpClient) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.statusSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.statusSubject.complete();
    this.loading.complete();
  }

  public load(urlService: string): Observable<any> {
    this.loading.next(true);

    return this.http.get(urlService)
      .pipe(
        map((response: any) => {
          if (response === undefined || response === null || response.Data === undefined || response === null) {
            this.data = null;
          } else {
            this.data = response.Data.Rows;
            this.statusSubject.next(this.data);
          }
          this.loading.next(false);
          return response;
        })
      )
      ;
  }
}

@Component({
  selector: 'app-itable',
  templateUrl: './itable.component.html',
  styleUrls: ['./itable.component.scss'],

})
export class ItableComponent implements OnInit {

  // Contiene la información de las columnas
  @Input() inColumns: ColumnsITable[];
  // Es la url a la que se llamará para llenar de datos la tabla
  @Input() inServiceApi: string;
  // Default page size
  @Input() inPageSize: number;
  // Default page size options
  @Input() inPageSizeOptions: number[];

  public dataSource: IDataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  totalRows = 0;
  selection = new SelectionModel<any>(true, []);
  rowSelected: any;
  displayedColumns: string[] = ['select', 'id', 'firstname', 'lastname', 'mlastname', 'email', 'actions'];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource = new IDataSource(this.http);
    this.loadData(null);
    console.log(this.inPageSizeOptions);
  }

  loadData(event: PageEvent) {
    let pageIndex = event && event.pageIndex ? event.pageIndex : 0;
    const pageSize = event && event.pageSize ? event.pageSize : this.inPageSize;
    pageIndex = pageIndex * pageSize;

    const url = `${environment.getUrl(this.inServiceApi)}/${pageIndex}/${pageSize}`;
    this.dataSource.load(url).subscribe(
      response => {
        if (response === undefined || response === null || response.Data === undefined || response === null) {
          return response;
        }
        this.totalRows = response.Data.Total;

        // `http://localhost:8080/users/${pageIndex}/${pageSize}`
        response.Data.Rows.forEach(row => {
          this.selection.selected.forEach(rowSelected => {
            if (row.id === rowSelected.id) {
              this.selection.select(row);
              return;
            }
          });
        });

      }
    );
  }

  showActions(row) {
    this.rowSelected = row;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows || numSelected > numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  selectedToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}



