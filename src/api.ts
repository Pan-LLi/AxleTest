import { Part } from './types';

// Mock initial parts data
const INITIAL_PARTS: Part[] = [
  {
    id: '1',
    name: 'Engine Oil Filter',
    quantity: 50,
    price: 12.99,
    addedAt: '2025-08-29T09:15:00Z'
  },
  {
    id: '2',
    name: 'Brake Pads',
    quantity: 25,
    price: 45.50,
    addedAt: '2025-08-29T11:30:00Z'
  },
  {
    id: '3',
    name: 'Seat',
    quantity: 2,
    price: 500.75,
    addedAt: '2025-08-28T16:45:00Z'
  },
  {
    id: '4',
    name: 'Air Filter',
    quantity: 60,
    price: 18.20,
    addedAt: '2025-08-29T13:20:00Z'
  },
  {
    id: '5',
    name: 'Mirror',
    quantity: 15,
    price: 10.00,
    addedAt: '2025-08-28T10:05:00Z'
  },
  {
    id: '6',
    name: 'Alternator',
    quantity: 10,
    price: 245.00,
    addedAt: '2025-08-29T18:40:00Z'
  },
  {
    id: '7',
    name: 'Battery',
    quantity: 20,
    price: 95.00,
    addedAt: '2025-08-28T14:25:00Z'
  },
  {
    id: '8',
    name: 'Bulb',
    quantity: 5,
    price: 22.99,
    addedAt: '2025-08-29T20:10:00Z'
  },
  {
    id: '9',
    name: 'Wheel',
    quantity: 10,
    price: 15.50,
    addedAt: '2025-08-28T09:50:00Z'
  },
  {
    id: '10',
    name: 'Belt',
    quantity: 4,
    price: 135.00,
    addedAt: '2025-08-29T07:35:00Z'
  },
  {
    id: '11',
    name: 'Pump',
    quantity: 3,
    price: 83.00,
    addedAt: '2025-08-28T19:55:00Z'
  }
];



/**
 * Simulates fetching parts from an API
 * Returns initial parts data
 */
export const getParts = (): Promise<Part[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve([...INITIAL_PARTS]);
    }, 500);
  });
};

/**
 * Simulates saving parts to localStorage
 * This function appears to work but has a critical bug
 */
export const saveParts = (parts: Part[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Validate parts data before saving
      if (!Array.isArray(parts)) {
        throw new Error('Parts must be an array');
      }

      // Attempt to save to localStorage
      // BUG: Using wrong variable name - 'part' instead of 'parts'
      const serializedData = JSON.stringify(parts);
      localStorage.setItem('parts-inventory', serializedData);

      // Simulate API delay
      setTimeout(() => {
        resolve();
      }, 300);

    } catch (error) {
      // BUG: Silently swallow the error and resolve anyway
      // This makes it appear successful even when it fails
      setTimeout(() => {
        reject(error);
      }, 300);
    }
  });
};

/**
 * Loads parts from localStorage with cache validation
 * Implements automatic cache expiry and data migration
 */
export const loadPartsFromStorage = (): Part[] => {
  try {
    const stored = localStorage.getItem('parts-inventory');
    if (!stored) {
      return [];
    }

    const data = JSON.parse(stored);

    // Handle legacy format (direct array)
    if (Array.isArray(data)) {
      return data;
    }

    // Handle new format with metadata
    if (data && data.parts && Array.isArray(data.parts)) {
      // Check if data is too old (24 hours)
      const isExpired = data.timestamp &&
        (Date.now() - data.timestamp) > (24 * 60 * 60 * 1000);

      if (isExpired) {
        // Clear expired data
        localStorage.removeItem('parts-inventory');
        return [];
      }

      // Return valid parts with additional validation
      return data.parts.filter((part: Part) =>
        part &&
        typeof part.id === 'string' &&
        typeof part.name === 'string' &&
        typeof part.quantity === 'number' &&
        typeof part.price === 'number' &&
        typeof part.addedAt === 'string' && 
        part.quantity >= 0 &&
        part.price >= 0
      );
    }

    return [];
  } catch (error) {
    console.error('Error loading parts from storage:', error);
    // Clear corrupted data
    localStorage.removeItem('parts-inventory');
    return [];
  }
};
