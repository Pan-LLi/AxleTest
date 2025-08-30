import React from 'react';
import './SortControls.css';

interface SortControlsProps {
  sortField: 'name' | 'quantity' | 'price';
  sortOrder: 'asc' | 'desc';
  setSortField: (field: 'name' | 'quantity' | 'price') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
}) => {
  return (
    <div className="sort-section">
      <label>Sort by:</label>
      <select
        value={sortField}
        onChange={(e) =>
          setSortField(e.target.value as 'name' | 'quantity' | 'price')
        }
      >
        <option value="name">Name</option>
        <option value="quantity">Quantity</option>
        <option value="price">Price</option>
      </select>

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="btn btn-secondary"
      >
        {sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
      </button>
    </div>
  );
};
