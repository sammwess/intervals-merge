import { Interval } from "./interval";

export class IntervalsMerge {

    private filterIntersections(interval: Interval, intervals: Interval[]) {

        return intervals.filter(i =>
            ((interval.start >= i.start) && (interval.start <= i.end))
            || ((interval.end >= i.start) && (interval.end <= i.end))
            || ((interval.start <= i.start) && (interval.end >= i.end)));
    }

    public merge(objInput) {

        // Mapping to interval list
        let intervalsInput: Interval[] = objInput.map(i => new Interval(i[0], i[1]));
        
        // The result list
        let mergedIntervals: Interval[] = [];

        // List to avoid treat the same interval twice
        let treatedIntervals: Interval[] = [];

        // Merging
        intervalsInput.forEach(interval => {

            // Avoiding treat the same interval twice
            if (!treatedIntervals.some(i => interval.equals(i))) {

                // Finding intersected intervals
                var intervalsToMerge = this.filterIntersections(interval, intervalsInput);
                if (intervalsToMerge.length > 0) {

                    // Adding already treated intervals
                    treatedIntervals.push(...intervalsToMerge);

                    // Finding minimum start
                    var defaultMinStart = intervalsToMerge[0].start;
                    var minStart = intervalsToMerge.reduce((acc, i) => { return Math.min(acc, (i.start)); }, defaultMinStart);

                    // Finding maximum start
                    var maxEnd = intervalsToMerge.reduce((acc, i) => { return Math.max(acc, (i.end)); }, 0);

                    // New interval
                    var newInterval = new Interval(minStart, maxEnd);

                    // Adding if it is not included yet
                    if (!mergedIntervals.some(i => newInterval.equals(i))) {
                        mergedIntervals.push(newInterval);
                    }
                }
            }
        });

        // Mapping and returning result
        return mergedIntervals.map(i => [i.start, i.end]);
    }
}
