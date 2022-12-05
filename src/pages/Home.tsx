import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/store';

import { Categories, Sort, sortList, Skeleton, Pagination, SupplementBlock } from '../components';
import { fetchSupplements } from '../redux/supplements/slice';
import { SearchSupplementsParams } from '../redux/supplements/types';
import { setActiveCategory, setCurrentPage, setFilters } from '../redux/filter/slice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue, activeCategory, selectedSort, currentPage } = useSelector(
    (state: any) => state.filter,
  );
  const { supplements, status } = useSelector((state: any) => state.supplements);

  const getSupplements = () => {
    const category = activeCategory ? `category=${activeCategory}` : '';
    const sort = selectedSort.sortName === 'rating' ? '&order=desc' : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchSupplements({
        currentPage,
        category,
        sort,
        search,
        sortBy: selectedSort.sortName,
      }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as SearchSupplementsParams;
      const selectedSort = sortList.find((sortBy) => sortBy.sortName === params.sortBy)!;
      dispatch(
        setFilters({
          searchValue: params.search,
          activeCategory: params.category ? Number(params.category) : 0,
          currentPage: params.currentPage,
          selectedSort: selectedSort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getSupplements();
    }
    isSearch.current = false;
  }, [activeCategory, selectedSort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: selectedSort.sortName,
        activeCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, selectedSort, currentPage]);

  const skeletons = [...new Array(10)].map((_, index) => {
    return <Skeleton key={index} />;
  });

  const supplementsRend = supplements
    .filter((supplement: any) => supplement.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((supplement: any) => {
      return <SupplementBlock key={supplement.id} {...supplement} />;
    });

  const onSelectCategory = React.useCallback(
    (categoryIndex: number) => dispatch(setActiveCategory(categoryIndex)),
    [],
  );

  return (
    <>
      <div className="content__top">
        <Categories activeCategory={activeCategory} onSelectCategory={onSelectCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All supplements</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Failed while fetching data</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : supplementsRend}</div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(pageNumber: number) => dispatch(setCurrentPage(pageNumber))}
      />
    </>
  );
};
