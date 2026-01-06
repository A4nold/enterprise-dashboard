import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { DashboardVm } from './dashboard.api';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // flip this to true to test error UI
  private readonly shouldFail = false;

  getDashboard(): Observable<DashboardVm> {
    if (this.shouldFail) {
      return throwError(() => new Error('Failed to load dashboard data')).pipe(delay(600));
    }

    return of({
      kpis: [
        { label: 'Active Markets', value: 12 },
        { label: 'Open Tickets', value: 7 },
        { label: 'API Errors (24h)', value: 3 },
        { label: 'Users Online', value: 41 },
      ],
      activity: [
        { id: '1', message: 'User created: a.eke...', createdAt: new Date().toISOString() },
        { id: '2', message: 'Order #1042 processed', createdAt: new Date(Date.now() - 3600_000).toISOString() },
        { id: '3', message: 'Deployment: v1.2.0', createdAt: new Date(Date.now() - 7200_000).toISOString() },
      ],
    }).pipe(delay(600));
  }
}
