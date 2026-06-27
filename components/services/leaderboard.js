import { api } from './api';

export const leaderboardService = {
  async fetchTopRankings(timeframe = 'weekly', limit = 10) {
    // Calls GET /leaderboard?timeframe=weekly&limit=10
    return api.get(`/leaderboard?timeframe=${timeframe}&limit=${limit}`);
  },

  async getUserRank(userId) {
    return api.get(`/leaderboard/user/${userId}`);
  }
};