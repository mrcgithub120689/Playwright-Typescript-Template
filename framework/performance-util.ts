// // Function to log only "measure" entries and their durations
// export function logMeasureDurations(data: PerformanceEntry[]): void {
//   // Iterate over each group
//   data.forEach(entry => {
//     // Check if the entryType is "measure"
//     if (entry.entryType === "measure") {
//         // Log the name and duration of the measure entry
//         console.log(`Name: ${entry.name}, Duration: ${entry.duration}`);
//     }
//   });
// }

interface PerformanceDuration {
  name: string;
  duration: number;
}

// Function to get measure mark and map the name and duration
export function getMeasureDurations(data: PerformanceEntry[]): PerformanceDuration[] {
  return data
    .filter(entry => entry.entryType === "measure")
    .map(entry => ({
      name: entry.name,
      duration: entry.duration
    }));
}