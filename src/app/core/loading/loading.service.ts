import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private loadingCount = 0;
    private ispLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() { }

    public get isLoading() {
        return this.ispLoading;
    }

    startLoading() {
        this.loadingCount++;
        this.ispLoading.next(true);
    }

    endLoading() {
        if (this.loadingCount > 0) {
            this.loadingCount--;
        }
        this.ispLoading.next(this.loadingCount > 0);
    }
}
