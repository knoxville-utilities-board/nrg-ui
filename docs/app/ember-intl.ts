import type { Formats } from 'ember-intl';

export const formats: Formats = {
  formatTime: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
  formatDate: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
  formatNumber: {
    compact: {
      notation: 'compact',
    },
    EUR: {
      style: 'currency',
      currency: 'EUR',
    },
    USD: {
      style: 'currency',
      currency: 'USD',
    },
  },
};
