import { useState, useEffect } from 'react';
import axios from 'axios';

const useStaticData = () => {
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState();
  const [currentDungeons, setCurrentDungeons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const response = await axios.get('https://raider.io/api/v1/mythic-plus/static-data?expansion_id=9');

        // We do not care about response.data.dungeons because that only accounts for Dragonflight dungeons.
        // We care about M+ Seasonal dungeons which is stored under the season object.
        // We use season short_name to identify the season and season start to know when the current season is.
        setSeasons(response.data.seasons);
      } catch (error) {
        console.error("Error fetching static data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaticData();
  }, []);

  useEffect(() => {
    const getCurrentSeason = (seasons) => {
      const currentTime = new Date();
      for (let season of seasons) {
        if (season.starts.us === null) {
          continue;
        }
        const start = new Date(season.starts.us);
        const end = season.ends.us ? new Date(season.ends.us) : null;
        if (currentTime >= start && (end === null || currentTime <= end)) {
          return season;
        }
      }
      return null;
    };
    if (seasons.length > 0) {
        const currentSeason = getCurrentSeason(seasons)
        setCurrentSeason(currentSeason);
        setCurrentDungeons(currentSeason.dungeons);
    }
  }, [seasons]);

  return { seasons, currentSeason, currentDungeons, isLoading };

}

export default useStaticData;