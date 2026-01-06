export type DashboardKpi = {
  label: string;
  value: number;
};

export type ActivityItem = {
  id: string;
  message: string;
  createdAt: string; // ISO string
};

export type DashboardVm = {
  kpis: DashboardKpi[];
  activity: ActivityItem[];
};
