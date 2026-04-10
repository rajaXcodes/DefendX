import { convertBigIntToTime } from "./timeFormatter.js";
export function formatJobsBatch(jobs, format = "iso") {
    return jobs.map((job) => ({
        ...job,
        windowFrom: convertBigIntToTime(job.windowFrom, format),
        windowTo: convertBigIntToTime(job.windowTo, format),
    }));
}
