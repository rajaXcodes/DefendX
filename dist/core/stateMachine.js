export var JobState;
(function (JobState) {
    JobState["FETCHING"] = "FETCHING";
    JobState["ANALYZING"] = "ANALYZING";
    JobState["REPORT_READY"] = "REPORT_READY";
    JobState["REMEDIATING"] = "REMEDIATING";
    JobState["COMPLETED"] = "COMPLETED";
    JobState["ERROR"] = "ERROR";
})(JobState || (JobState = {}));
