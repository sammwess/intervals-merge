import { Interval } from "./interval";

export class IntervalsMerge {

    private isIntersesction(a, b) {
        return (
            (a[0] >= b[0] && a[0] <= b[1]) // Pair 'a' init is inside pair 'b'
            || (a[1] >= b[0] && a[1] <= b[1]) // Pair 'a' end is inside pair 'b'
            || (b[1] >= a[0] && b[1] <= a[1]) // Pair 'b' init is inside pair 'a'
            || (b[1] >= a[0] && b[1] <= a[1]) // Pair 'b' end is inside pair 'a'
        );
    }

    private filterIntersections(interval: Interval, intervals: Interval[]) {

        return intervals.filter(i =>
            ((interval.start >= i.start) && (interval.start <= i.end)) // Pair 'a' init is inside pair 'b'
            || ((interval.end >= i.start) && (interval.end <= i.end)) // Pair 'a' end is inside pair 'b'
            || ((i.start >= interval.start) && (i.start <= interval.end)) // Pair 'b' init is inside pair 'a'
            || ((i.end >= interval.start) && (i.end <= interval.end)) // Pair 'b' end is inside pair 'a'
        );
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

    public mergeV2(objInput) {
         return this.mergePairs(objInput.pop(), objInput);
    }

    private mergePairs(pair, input) {
        let nextInput = []; // List for not merged
        let p = input.pop(); // Next pair to compare
        while (p) {
            if (this.isIntersesction(pair, p)) {
                // New merged pair with min init and max end
                pair = [Math.min(pair[0], p[0]), Math.max(pair[1], p[1])];
            } else {
                // Store for next merge() call
                nextInput.push(p);
            }
            p = input.pop(); // Next pair to compare
        }
        let res = [pair]; // The result with the verified pair
        // Calling recursively if we have elements not merged
        if (nextInput.length > 0) {
            let p = nextInput.pop(); // Next pair to compare
            res = res.concat(this.mergePairs(p, nextInput)); // Recursively if we've not merged elements
        }

        // The result
        return res;
    }
}
