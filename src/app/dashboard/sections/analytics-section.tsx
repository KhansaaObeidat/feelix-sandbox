"use client";

import { useEffect, useState } from "react";
import { apiService } from "../../services/api-service";
import {
  IAnalyticsResponse,
  IAnalyticsSection,
} from "../models/analystics-section-models";

const AnalyticsSection = ({ time, category, status }: IAnalyticsSection) => {
  const [data, setData] = useState<IAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (time) params.set("time", time);
        if (category) params.set("category", category);
        if (status) params.set("status", status);

        const response = await apiService<IAnalyticsResponse>(
          `/api/analytics?${params.toString()}`
        );

        if (
          !response ||
          typeof response.totalUsers !== "number" ||
          typeof response.totalOrders !== "number"
        ) {
          throw new Error("Unexpected analytics response");
        }

        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load analytics"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [time, category, status, retryKey]);

  if (loading) return <p>Loading analytics…</p>;

  if (error)
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => setRetryKey((v) => !v)}>Retry</button>
      </div>
    );

  if (!data) return <p>No data available</p>;

  if (data.totalUsers === 0 && data.totalOrders === 0) {
    return <p>No analytics data for selected filters.</p>;
  }

  return (
    <section>
      <p>Total Users: {data.totalUsers}</p>
      <p>Total Orders: {data.totalOrders}</p>
    </section>
  );
};

export default AnalyticsSection;
