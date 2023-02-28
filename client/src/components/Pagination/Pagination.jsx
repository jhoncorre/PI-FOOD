import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/actions";

import s from "./pagination.module.css";

export default function Pagination({ totalPages }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.currentPage);

  const nextPage = async () => {
    dispatch(actions.setPage(page + 1));
  };
  const prevPage = () => {
    dispatch(actions.setPage(page - 1));
  };
  return (
    <div>
      <div className={s.container}>
        <button
          className={`${s.pageButton}`}
          disabled={page === 1}
          onClick={prevPage}
        >
          Prev
        </button>
        <p className={s.currentPage}>
          {page} to {totalPages}
        </p>
        <button
          className={`${s.pageButton}`}
          disabled={page === totalPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
