import { useState, useEffect, useCallback } from 'react';
import { fetchCampaigns, fetchDatasetsByCampaign } from '@/services/api';
import type { Campaign, Dataset, ApiError } from '@/types/api';

/**
 * State shape for the useCampaigns hook
 */
interface CampaignsState {
  /** List of fetched campaigns */
  campaigns: Campaign[];
  /** Whether the initial fetch is in progress */
  loading: boolean;
  /** Error message if the fetch failed */
  error: string | null;
  /** Refetch campaigns from the API */
  refetch: () => void;
}

/**
 * Custom hook to fetch campaigns from the backend API.
 *
 * Gracefully handles the case where the backend is not yet available
 * by catching errors and setting a user-friendly error message.
 * This allows the rest of the app to continue functioning with
 * local fixture data while the backend is being developed.
 *
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} pageSize - Number of items per page (default: 50)
 * @returns {CampaignsState} Campaigns data, loading state, error, and refetch function
 */
export const useCampaigns = (page = 1, pageSize = 50): CampaignsState => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchCampaigns(page, pageSize);
      setCampaigns(response.data);
    } catch (err) {
      const apiError = err as ApiError;
      const message =
        apiError.status === 0 || apiError.message?.includes('fetch')
          ? 'Backend not available — using local data. Start the dashboard_server to enable live data.'
          : `Failed to fetch campaigns: ${apiError.message}`;
      setError(message);
      setCampaigns([]);
      console.warn('[useCampaigns]', message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  return { campaigns, loading, error, refetch: loadCampaigns };
};

/**
 * State shape for the useCampaignDatasets hook
 */
interface CampaignDatasetsState {
  /** List of datasets for the selected campaign */
  datasets: Dataset[];
  /** Whether the fetch is in progress */
  loading: boolean;
  /** Error message if the fetch failed */
  error: string | null;
}

/**
 * Custom hook to fetch datasets for a specific campaign.
 *
 * @param {number | null} campaignId - Campaign ID to fetch datasets for. Pass null to skip.
 * @returns {CampaignDatasetsState} Datasets data, loading state, and error
 */
export const useCampaignDatasets = (
  campaignId: number | null,
): CampaignDatasetsState => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (campaignId === null) {
      setDatasets([]);
      return;
    }

    let cancelled = false;

    const loadDatasets = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchDatasetsByCampaign(campaignId);
        if (!cancelled) {
          setDatasets(data);
        }
      } catch (err) {
        if (!cancelled) {
          const apiError = err as ApiError;
          setError(`Failed to fetch datasets: ${apiError.message}`);
          setDatasets([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDatasets();

    return () => {
      cancelled = true;
    };
  }, [campaignId]);

  return { datasets, loading, error };
};
