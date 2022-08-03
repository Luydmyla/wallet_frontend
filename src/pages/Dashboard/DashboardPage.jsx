import {
  DashboardFirstSectionWrapper,
  DashboardSecondSectionWrapper,
  DashboardWrapper,
  DashboardSeparator,
  Dashboard
} from './DashboardPage.styled';
import { lazy } from 'react';
import { Container } from 'stylesheet/Container.styled';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ButtonAddTransactions } from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import { ModalAddTransactions } from 'components/ModalAddTransaction/ModalAddTransaction'; 
import Media from 'react-media';
const Header = lazy(() =>
  import('../../components/Header' /* webpackChunkName: "Header" */)
);
const Navigation = lazy(() =>
  import('../../components/Navigation' /* webpackChunkName: "Navigation" */)
);
const Balance = lazy(() =>
  import('../../components/Balance' /* webpackChunkName: "Balance" */)
);
const HomeTab = lazy(() =>
  import('../../components/HomeTab' /* webpackChunkName: "HomeTab" */)
);
const Currency = lazy(() =>
  import('../../components/Currency' /* webpackChunkName: "Currency" */)
);
const DiagramTab = lazy(() =>
  import('../../components/DiagramTab' /* webpackChunkName: "DiagramTab" */)
);
export const DashboardPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const modalAddTransactionStatus = useSelector(state=>
    state.modal.isModalAddTransactionOpen); 

  return (
    <>
      <Header />
      <Dashboard pathname={pathname}>
        <Container>
          <DashboardWrapper>
            <DashboardFirstSectionWrapper>
              <div>
                <Navigation />
                <Balance />
                <Media queries={{ mobile: { maxWidth: 767 } }}>
                  {matches =>
                    matches.mobile && (
                      <div>
                        <Currency />
                      </div>
                    )
                  }
                </Media>
              </div>
              <Media queries={{ table: { minWidth: 768 } }}>
                {matches =>
                  matches.table && (
                    <div>
                      <Currency />
                    </div>
                  )
                }
              </Media>
            </DashboardFirstSectionWrapper>
            <DashboardSeparator></DashboardSeparator>
            {pathname === '/wallet_frontend/diagram' && <DiagramTab />}
            <DashboardSecondSectionWrapper>
              {location.pathname === '/wallet_frontend/home' && <HomeTab />}
            </DashboardSecondSectionWrapper>
          </DashboardWrapper>
          {modalAddTransactionStatus && <ModalAddTransactions/>}
        </Container>        
      </Dashboard>
      {location.pathname === '/wallet_frontend/home' && <ButtonAddTransactions/>}
    </>
  );
};