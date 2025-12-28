"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AnalyticsSection from "./sections/analytics-section";

const DashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const time = searchParams.get("time") ?? "";
  const category = searchParams.get("category") ?? "";
  const status = searchParams.get("status") ?? "";

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`/dashboard?${params.toString()}`);
  };

  const filters = useMemo(
    () => ({ time, category, status }),
    [time, category, status]
  );

  return (
    <main>
      <h1>Dashboard</h1>

      <div>
        <label>
          Time
          <input
            placeholder="Enter day, week"
            value={filters.time}
            onChange={(e) => setParam("time", e.target.value)}
          />
        </label>

        <label>
          Category
          <input
            placeholder="Enter product"
            value={filters.category}
            onChange={(e) => setParam("category", e.target.value)}
          />
        </label>

        <label>
          Status
          <input
            placeholder="Enter status"
            value={filters.status}
            onChange={(e) => setParam("status", e.target.value)}
          />
        </label>
      </div>

      <AnalyticsSection {...filters} />
    </main>
  );
};

export default DashboardPage;
