"use client";

import { useEffect, useState } from "react";
import { SiteData } from "../types";

export const useSiteDatas = () => {
    const [siteData, setSiteData] = useState<SiteData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiteData = async () => {
            try {
                const res = await fetch("/api");
                const data: SiteData = await res.json();
                setSiteData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSiteData();
    }, []);

    return { siteData, loading };
};