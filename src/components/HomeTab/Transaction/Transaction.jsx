import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import TransactionItem from './TransactionItem';
import PropTypes from 'prop-types';

import {
  TableContainer,
  TransactionsWrapper,
  List,
  Li,
} from './Transaction.styled';

const Transaction = ({ transactionsList }) => {
  const { t } = useTranslation();

  const columns = [
    {
      header: 'Date',
    },
    {
      header: 'Type',
    },
    {
      header: 'Category',
    },
    {
      header: 'Comment',
    },
    {
      header: 'Sum',
    },
    {
      header: 'Balance',
    },
  ];

  const tableHeaders = columns.map(({ header }) => {
    if (header === 'Balance') {
      return (
        <Li key={uuidv4()}>
          <span style={{ paddingRight: '50px' }}>
            {t(`${header.toLowerCase()}`)}
          </span>
        </Li>
      );
    }
    return <Li key={uuidv4()}>{t(`${header.toLowerCase()}`)}</Li>;
  });

  return (
    <TableContainer>
      <List>{tableHeaders}</List>
      <TransactionsWrapper>
        <List>
          {transactionsList.map(transaction => {
            return <TransactionItem key={uuidv4()} transaction={transaction} />;
          })}
        </List>
      </TransactionsWrapper>
      {/* <ButtonAddTransactions /> */}
    </TableContainer>
  );
};

Transaction.propTypes = {
  transactionsList: PropTypes.array,
};

export default Transaction;
