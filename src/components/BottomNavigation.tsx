import { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`join-item btn btn-sm h-6 min-h-6 text-[8px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type BottomNavigationProps = {
  options: number[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  setItemsPerPage: (index: number) => void;
};

function BottomNavigation({
  options,
  totalItems,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  setItemsPerPage,
}: BottomNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between items-center p-4 sm:p-6 text-[10px]">
      <div>{`${totalItems} results`}</div>

      <div className="join">
        <Button
          className={currentPage === 1 ? "btn-disabled" : undefined}
          onClick={handlePreviousPage}
        >
          «
        </Button>

        <Button>{"Page " + currentPage}</Button>

        <Button
          className={currentPage === totalPages ? "btn-disabled" : undefined}
          onClick={handleNextPage}
        >
          »
        </Button>
      </div>

      <div className="flex flex-row items-center space-x-2">
        <div className="">Items per page</div>

        <select
          className="select select-bordered select-xs"
          onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
        >
          {options.map((o, i) => (
            <option key={`option${i}`} value={i}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BottomNavigation;
