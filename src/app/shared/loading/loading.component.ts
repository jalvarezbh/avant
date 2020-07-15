import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from '../../core/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 70;
  isLoading: Subject<boolean> = this.loadingService.isLoading;
  constructor(private loadingService: LoadingService) { }
}
