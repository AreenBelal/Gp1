import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ page, setPage, totalPages }) => {
  const next = () => {
    if (page === 10) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={page === 1}
        className="dark:border-white"
      >
        <ArrowRightIcon
          strokeWidth={2}
          className="h-4 w-4 dark:text-darkMode-dark50"
        />
      </IconButton>
      <Typography
        color="gray"
        className="font-normal dark:text-darkMode-dark50"
      >
        صفحة{" "}
        <strong className="text-gray-900 dark:text-mainColor500">{page}</strong>{" "}
        من{" "}
        <strong className="text-gray-900 dark:text-darkMode-dark50">
          {totalPages}
        </strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={page === totalPages}
        className="dark:border-white dark:text-darkMode-dark50"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default Pagination;
