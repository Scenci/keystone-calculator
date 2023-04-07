import { useState, useEffect } from 'react';
import axios from 'axios';

const useAffixes = () => {
  const [affixes, setAffixes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAffixes = async () => {
      try {
        const response = await axios.get('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en');
        setAffixes(response.data.title);
      } catch (error) {
        console.error("Error fetching affixes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAffixes();
  }, []);

  return { affixes, isLoading };
};

export default useAffixes;
