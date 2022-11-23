/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import ListPageHeading from 'containers/pages/ListPageHeading';
import ModalFiltersTransactions from 'containers/pages/ModalFiltersTransactions';
import ListPageListing from 'containers/pages/ListPageListing';
import { getTransaction } from 'redux/actions';
import moment from 'moment';

const orderOptions = [
  { column: 'dateTms', label: 'Latest date' },
  { column: '-dateTms', label: 'Recent date' },
  { column: 'codOper', label: 'Operation code' },
  { column: 'status', label: 'Status' },
  { column: 'email', label: 'Email' },
  { column: '-amount', label: 'Higher amount' },
  { column: 'amount', label: 'Lower amount' },
];
const pageSizes = [4, 8, 12, 20];

const Transactions = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, allTransfer, totalTransfer, transfersPerPage } = useSelector(
    (state) => state.transactions
  );

  const parsedTotalPage = (totalTransferParam, selectedPageSizeParam) => {
    return Math.ceil(totalTransferParam / selectedPageSizeParam);
  };

  const [form, setForm] = useState({
    dateTms: '2010-01-01',
    codOper: '',
    status: '',
    email: '',
    amountMin: '',
    amountMax: '',
    cardType: '',
    todayDate: moment().format('YYYY-MM-DD'),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(4);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'dateTms',
    label: 'Latest date',
  });

  const [totalItemCount, setTotalItemCount] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);

  const initTransfers = (currentPage - 1) * selectedPageSize;
  const maxTransfers = currentPage * selectedPageSize;

  const dispatchTx = () => {
    dispatch(
      getTransaction(
        initTransfers,
        maxTransfers,
        selectedOrderOption.column,
        search,
        form
      )
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    dispatchTx();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  useEffect(() => {
    setTotalPage(parsedTotalPage(totalTransfer, selectedPageSize));
    setItems(transfersPerPage);
    setSelectedItems([]);
    setTotalItemCount(totalTransfer);
  }, [allTransfer, loading, transfersPerPage, totalTransfer, selectedPageSize]);

  const onSubmitFilter = (e) => {
    e.preventDefault();

    dispatchTx();
  };

  const onContextMenuClick = (e, data) => {
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  const resetFilters = () => {
    setCurrentPage(1);
    setSelectedPageSize(4);
    setSelectedOrderOption({
      column: 'dateTms',
      label: 'Latest date',
    });
    setForm({
      dateTms: '2010-01-01',
      codOper: '',
      status: '',
      email: '',
      amountMin: '',
      amountMax: '',
      cardType: '',
      todayDate: moment().format('YYYY-MM-DD'),
    });
    setSearch('');
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const elementToRender = () => {
    if (loading) {
      return <div className="loading" />;
    }

    return (
      <div className="disable-text-selection">
        <ListPageHeading
          heading="Transactions"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          resetFilters={resetFilters}
        />

        <ModalFiltersTransactions
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          form={form}
          setForm={setForm}
          onSubmitFilter={onSubmitFilter}
        />

        {items?.length ? (
          <ListPageListing
            items={items}
            displayMode={displayMode}
            selectedItems={selectedItems}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={setCurrentPage}
          />
        ) : (
          <p>No items found</p>
        )}
      </div>
    );
  };

  return elementToRender();
};

export default Transactions;
