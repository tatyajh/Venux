import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Home filters
  quickFilter: 'all', // 'all' | 'couples' | 'singles' | 'women'
  distanceKm: 100,
  showFiltersSheet: false,

  // Navigation
  bottomNavVisible: true,

  // Actions
  setQuickFilter: (filter) => set({ quickFilter: filter }),
  setDistanceKm: (distance) => set({ distanceKm: distance }),
  setShowFiltersSheet: (show) => set({ showFiltersSheet: show }),
  setBottomNavVisible: (visible) => set({ bottomNavVisible: visible }),
}));
