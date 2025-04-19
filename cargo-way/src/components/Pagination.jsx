import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const canGoBack = currentPage > 0;
    const canGoForward = currentPage + 1 < totalPages;

    return (
        <div className="pagination">
            <button
                disabled={!canGoBack}
                onClick={() => onPageChange(currentPage - 1)}
                className={`pagination__btn ${!canGoBack ? "disabled" : ""}`}
            >
                ← Назад
            </button>

            <span className="pagination__info">
                Страница {currentPage + 1} из {totalPages}
            </span>

            <button
                disabled={!canGoForward}
                onClick={() => onPageChange(currentPage + 1)}
                className={`pagination__btn ${!canGoForward ? "disabled" : ""}`}
            >
                Вперёд →
            </button>
        </div>
    );
};

export default Pagination;
