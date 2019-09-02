import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../shared/services/UserService';
import { User } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';



class UserDataSource implements DataSource<User> {
  public data: Array<User> = null;
  private statusSubject = new BehaviorSubject<User[]>([]);
  private loading = new BehaviorSubject<boolean>(false);

  public loading$ = this.loading.asObservable();

  constructor(private http: HttpClient, private userSvc: UserService) { }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.statusSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.statusSubject.complete();
    this.loading.complete();
  }

  public load(pageIndex, pageSize): Observable<any> {
    this.loading.next(true);

    return this.http.get(`http://localhost:8080/users/${pageIndex}/${pageSize}`)
    .pipe(
      map( (result: any) => {
        this.data = result.Data.Rows;
        this.statusSubject.next(this.data);
        this.loading.next(false);
        return result;
      })
    )
    ;
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'firstname', 'lastname', 'mlastname', 'email', 'actions'];
  dataSource: UserDataSource;
  selection = new SelectionModel<User>(true, []);
  rowSelected: User = new User();
  indexRow = 0;
  totalRows = 0;
  pageSize = 10;
  pageSizeOptions = [10, 50, 100];
  


  constructor(private http: HttpClient, private userSvc: UserService) {  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new UserDataSource(this.http, this.userSvc);
    this.loadData(null);
  }
  loadData(event: PageEvent) {
    let pageIndex = event && event.pageIndex ? event.pageIndex : 0;
    this.pageSize = event && event.pageSize ? event.pageSize : this.pageSize;
    pageIndex = pageIndex * this.pageSize;

    this.dataSource.load(pageIndex, this.pageSize).subscribe(
      response => {
      this.totalRows = response.Data.Total;
      response.Data.Rows.forEach(row => {
        this.selection.selected.forEach(rowSelected => {
          if (row.id === rowSelected.id){
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
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  selectedToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}






