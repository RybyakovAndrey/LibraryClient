import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

export interface IssueData {
  title: string;
  dateOfIssue: string;
  returnDate: string;
  isOverdue?: boolean;
}

@Component({
  selector: 'app-circulation-list-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule],
  templateUrl: './circulation-list-page.html',
  styleUrl: './circulation-list-page.scss'
})
export class CirculationListPage implements AfterViewInit, OnChanges {
  @Input() data: IssueData[] = [];
  @Input() type: 'current' | 'history' = 'current';

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<IssueData>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.displayedColumns = this.type === 'current' 
        ? ['title', 'dateOfIssue', 'returnDate'] 
        : ['title', 'dateOfIssue', 'returnDate']; 
    }

    if (changes['data']) {
      this.dataSource.data = this.data || [];
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  }
}