import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { DashboardOverviewResponse } from "../types/dashboardOverview.types";

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export async function fetchDashboardOverview(): Promise<DashboardOverviewResponse> {
  try {
    const { data } = await api.get<DashboardOverviewResponse>(
      "/admin-dashboard/recent-orders-stats",
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
