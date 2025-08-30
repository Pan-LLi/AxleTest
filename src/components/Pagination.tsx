import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  return (
    <div className="pagination">
      <button
        className='btn btn-secondar'
        onClick={() => goToPage(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button 
        className='btn btn-secondar'
        onClick={() => goToPage(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
