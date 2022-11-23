import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';

function collect(props) {
  return { data: props };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  const dictionaryOptions = (transaction, display) => {
    const modes = {
      list: (
        <DataListView
          key={transaction?.idTransaction}
          transaction={transaction}
          isSelect={selectedItems.includes(transaction?.idTransaction)}
          collect={collect}
        />
      ),
    };

    return modes[display];
  };

  return (
    <Row>
      {items?.map((transaction) => dictionaryOptions(transaction, displayMode))}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
