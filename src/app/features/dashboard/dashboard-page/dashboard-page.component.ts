import { Component, computed, effect, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { DashboardVm } from '../dashboard.api';

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'loaded'; data: DashboardVm }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly state = signal<LoadState>({ status: 'idle' });

  readonly vm = computed(() => {
  const state = this.state();
  return state.status === 'loaded' ? state.data : null;
});

readonly isLoading = computed(() => this.state().status === 'loading');

readonly errorMessage = computed(() => {
  const state = this.state();
  return state.status === 'error' ? state.message : null;
});

  constructor() {
    this.load();
  }

  load(): void {
    this.state.set({ status: 'loading' });

    this.dashboardService.getDashboard().subscribe({
      next: data => this.state.set({ status: 'loaded', data }),
      error: err =>
        this.state.set({
          status: 'error',
          message: err instanceof Error ? err.message : 'Unknown error',
        }),
    });
  }
}

