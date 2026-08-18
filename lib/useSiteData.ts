"use client";

import { useEffect, useState } from "react";
import { SiteData } from "../types";

let cachedData: SiteData | undefined;
let fetchPromise: Promise<SiteData> | null = null;

const fetchSiteData = (): Promise<SiteData> => {
    if (!fetchPromise) {
        fetchPromise = fetch("/api")
            .then((res) => res.json())
            .then((data: SiteData) => {
                cachedData = data;
                return data;
            })
            .catch((error) => {
                fetchPromise = null;
                throw error;
            });
    }
    return fetchPromise;
};

export const useSiteDatas = () => {
    const [siteData, setSiteData] = useState<SiteData | undefined>(cachedData);
    const [loading, setLoading] = useState(!cachedData);

    useEffect(() => {
        if (cachedData) {
            setSiteData(cachedData);
            setLoading(false);
            return;
        }

        let isMounted = true;

        fetchSiteData()
            .then((data) => {
                if (isMounted) {
                    setSiteData(data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { siteData, loading };
};