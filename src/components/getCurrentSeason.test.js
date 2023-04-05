
import { getCurrentSeason } from './App.js';

describe('getCurrentSeason', () => {
  const mockSeasons = [
    {
      slug: 'season-df-2',
      starts: { us: null },
      ends: { us: null },
    },
    {
      slug: 'season-df-1',
      starts: { us: '2022-11-28T23:00:00Z' },
      ends: { us: '2023-05-01T23:00:00Z' },
    },
  ];

  test('returns null when no season is active', () => {
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => new Date('2022-11-01T00:00:00Z'));

    expect(getCurrentSeason(mockSeasons)).toBeNull();
  });

  test('returns the correct season when one is active', () => {
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => new Date('2022-12-01T00:00:00Z'));

    expect(getCurrentSeason(mockSeasons)).toEqual(mockSeasons[1]);
  });

  test('returns null when the season has ended', () => {
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => new Date('2023-05-02T00:00:00Z'));

    expect(getCurrentSeason(mockSeasons)).toBeNull();
  });
});

