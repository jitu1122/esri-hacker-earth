import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  balance: string;
  transDate: string;
  depositAMT: any;
  transDetails: string;
  withdrawalAMT: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['transDate', 'transDetails', 'depositAMT', 'withdrawalAMT', 'balance'];
  selectedAccount = '';
  showTable = false;

  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public appService: AppService) {
  }


  ngOnInit(): void {
    this.appService.getTransactions().subscribe(() => {
      console.log(this.appService.entries);
    });

  }

  onSelect() {
    this.showTable = true;
    console.log(this.selectedAccount);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.appService.entries[this.selectedAccount]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  objKeys(obj) {
    return Object.keys(obj);
  }
}
