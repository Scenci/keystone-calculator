import {useMemo} from 'react';


const getSortedRuns = (combinedData) => {
    //console.log(combinedData);
    const sortedRuns = sortRunsByDungeon(combinedData.mythic_plus_best_runs, combinedData.mythic_plus_alternate_runs);
    console.log(sortedRuns);
    return sortedRuns;
    
    // You can set this sortedRuns object to a new state if you want to use it later in your component
  };

  
  const sortRunsByDungeon = (bestRuns, alternateRuns) => {
    let sortedRuns = {};
  
    // Iterate over best runs and store them in the sortedRuns object
    bestRuns.forEach((run) => {
      const dungeonName = run.dungeon;
      if (!sortedRuns[dungeonName]) {
        sortedRuns[dungeonName] = {
          bestRun: run,
          alternateRun: null,
        };
      } else {
        sortedRuns[dungeonName].bestRun = run;
      }
    });
  
    // Iterate over alternate runs and store them in the sortedRuns object
    alternateRuns.forEach((run) => {
      const dungeonName = run.dungeon;
      if (!sortedRuns[dungeonName]) {
        sortedRuns[dungeonName] = {
          bestRun: null,
          alternateRun: run,
        };
      } else {
        sortedRuns[dungeonName].alternateRun = run;
      }
    });
  
    return sortedRuns;
  };

  const useSortedRuns = (data) => {

    const sortedRuns = useMemo(() => {
        if (data.length === 0) return [];
        return getSortedRuns(data);
    }, [data])

    return sortedRuns;

  }

export default useSortedRuns;