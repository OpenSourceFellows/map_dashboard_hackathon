import { API_V1_URL } from './config';
import type { Campaign, Dataset, PaginatedResponse, ApiError } from '@/types/api';

/**
 * API service for fetching campaigns and datasets from the backend.
 *
 * All methods return typed promises. When the backend endpoints
 * are not yet available, errors are caught and logged with
 * meaningful messages so the frontend degrades gracefully.
 *
 * Expected backend endpoints (to be implemented):
 * - GET /api/v1/campaigns         → list all campaigns
 * - GET /api/v1/campaigns/:id     → get a single campaign
 * - GET /api/v1/campaigns/:id/datasets → list datasets for a campaign
 * - GET /api/v1/datasets          → list all datasets
 * - GET /api/v1/datasets/:id      → get a single dataset
 */

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string): Promise<T> {
  const url = `${API_V1_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: response.statusText,
    };

    try {
      const body = await response.json();
      error.message = body.message || error.message;
      error.details = body.details;
    } catch {
      // Response body wasn't JSON — keep the status text
    }

    throw error;
  }

  return response.json() as Promise<T>;
}

// ─── Campaigns ───────────────────────────────────────────────────────────

/**
 * Fetch all campaigns (paginated)
 * GET /api/v1/campaigns?page=1&pageSize=50
 */
export async function fetchCampaigns(
  page = 1,
  pageSize = 50,
): Promise<PaginatedResponse<Campaign>> {
  return apiFetch<PaginatedResponse<Campaign>>(
    `/campaigns?page=${page}&pageSize=${pageSize}`,
  );
}

/**
 * Fetch a single campaign by ID
 * GET /api/v1/campaigns/:id
 */
export async function fetchCampaignById(id: number): Promise<Campaign> {
  return apiFetch<Campaign>(`/campaigns/${id}`);
}

// ─── Datasets ────────────────────────────────────────────────────────────

/**
 * Fetch all datasets (paginated)
 * GET /api/v1/datasets?page=1&pageSize=50
 */
export async function fetchDatasets(
  page = 1,
  pageSize = 50,
): Promise<PaginatedResponse<Dataset>> {
  return apiFetch<PaginatedResponse<Dataset>>(
    `/datasets?page=${page}&pageSize=${pageSize}`,
  );
}

/**
 * Fetch a single dataset by ID
 * GET /api/v1/datasets/:id
 */
export async function fetchDatasetById(id: number): Promise<Dataset> {
  return apiFetch<Dataset>(`/datasets/${id}`);
}

/**
 * Fetch all datasets belonging to a specific campaign
 * GET /api/v1/campaigns/:campaignId/datasets
 */
export async function fetchDatasetsByCampaign(
  campaignId: number,
): Promise<Dataset[]> {
  return apiFetch<Dataset[]>(`/campaigns/${campaignId}/datasets`);
}
