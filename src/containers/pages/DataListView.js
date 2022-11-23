import React from 'react';
import { Card, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import moment from 'moment';

export const dictionaryStatus = {
  0: { status: 'DECLINED', color: 'danger' },
  1: { status: 'APPROVED', color: 'success' },
  2: { status: 'CAPTURED', color: 'primary' },
  3: { status: 'REFUNDED', color: 'warning' },
};

const DataListView = ({ transaction, isSelect, collect }) => {
  const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger
        id="menu_id"
        data={transaction?.idTransaction}
        collect={collect}
      >
        <Card
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink
                to={`?p=${transaction?.idTransaction}`}
                className="w-40 w-sm-100"
              >
                <p className="list-item-heading mb-1 truncate">
                  {moment(transaction?.dateTms).format('DD/MM/YYYY hh:mm:ss a')}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {transaction?.codOper}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={dictionaryStatus[transaction?.status].color} pill>
                  {dictionaryStatus[transaction?.status].status}
                </Badge>
              </div>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {transaction?.cardholderFullName}
                <br />
                {transaction?.email}
                <br />
                {transaction?.cardType} - ****{transaction?.displayCardNum}
              </p>
              <p className="mb-1 text-muted text-small w-sm-100">
                {formatCurrency.format(transaction?.amount)}
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
