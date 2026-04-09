import { lokiClient } from "../config";

const LOKI_URL = process.env.LOKI_URL!;

export async function pushLogs(streams: any[]) {
    if (!streams || !Array.isArray(streams))
        throw new Error("streams array is required");

    try {
        await lokiClient.post(`/loki/api/v1/push`, { streams });
    } catch (err: any) {
        console.error("Failed to push logs:", err.message);
        throw err;
    }
}

// Returns raw log lines
export async function fetchLogs(
    limit: number = 1000,
    forward: boolean = true
): Promise<string[]> {

    const LIMIT_DEFAULT = 1000;
    const QUERY_DEFAULT = '{service=~".+"}';
    const TEN_MINUTES_MS = 60 * 60 * 1000;

    const now = Date.now() * 1_000_000;
    const tenMinutesAgo = (Date.now() - TEN_MINUTES_MS) * 1_000_000;

    const query = QUERY_DEFAULT;
    const from = tenMinutesAgo;
    const to = now;

    try {
        const response = await lokiClient.get(`/loki/api/v1/query_range`, {
            params: {
                query,
                start: from,
                end: to,
                limit: limit || LIMIT_DEFAULT,
                direction: forward ? "FORWARD" : "BACKWARD",
            },
        });

        console.log("📦 Loki Raw Result Count:", response.data?.data?.result?.length);

        const streams = response.data?.data?.result || [];

        // Extract log lines
        const logs: string[] = streams.flatMap((stream: any) =>
            stream.values.map((v: any) => v[1])
        );

        return logs;

    } catch (err: any) {
        console.error("Query failed. Falling back to empty logs.");
        console.error(err?.response?.data || err.message);

        return [];
    }
}