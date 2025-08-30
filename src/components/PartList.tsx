import React from 'react';
import { Part } from '../types';
import { SortControls } from './SortControls';
import { Pagination } from './Pagination';


interface PartListProps {
  parts: Part[];
  totalCount: number;
  grandTotal: number;
  onDeletePart: (id: string) => void;
  sortField: 'name' | 'quantity' | 'price';
  sortOrder: 'asc' | 'desc';
  setSortField: (field: 'name' | 'quantity' | 'price') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export const PartList: React.FC<PartListProps> = ({
  parts,
  totalCount,
  grandTotal,
  onDeletePart,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  currentPage,
  totalPages,
  goToPage
}) => {
  if (parts.length === 0) {
    return (
      <div className="card">
        <h2>Parts Inventory</h2>
        <div className="empty-state">
          <p>No parts in inventory</p>
          <p>Add your first part using the form on the left.</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getTotalValue = (): string => {
    const total = parts.reduce(
      (sum, part) => sum + part.quantity * part.price,
      0
    );
    return formatPrice(total);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 style={{ margin: 0 }}>
          Parts Inventory ({totalCount} items)
        </h2>

        <SortControls
          sortField={sortField}
          sortOrder={sortOrder}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
        />
      </div>

      <div className="parts-list">
        <table className="parts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
              <th>Added At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parts.map((part) => (
              <tr key={part.id}>
                <td>{part.name}</td>
                <td>{part.quantity}</td>
                <td>{formatPrice(part.price)}</td>
                <td>{formatPrice(part.quantity * part.price)}</td>
                <td>{new Date(part.addedAt).toLocaleString()}</td>
                <td>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${part.name}"?`)) {
                      onDeletePart(part.id);
                    }
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            textAlign: 'right'
          }}
        >
          <strong style={{ display: 'block'}}>
            Current Page Inventory Value: {getTotalValue()}
          </strong>
          <strong style={{ display: 'block' }}>
            Total Inventory Value: {formatPrice(grandTotal)}
          </strong>
        </div>
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        goToPage={goToPage} 
      />

    </div>
  );
};
