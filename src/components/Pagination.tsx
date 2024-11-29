import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full flex justify-between items-center mt-6 space-x-4">
      <button
        onClick={handlePrevClick}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      
      <span className="text-lg font-semibold text-zinc-500">
        Página {currentPage} de {totalPages}
      </span>
      
      <button
        onClick={handleNextClick}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        disabled={currentPage === totalPages}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
