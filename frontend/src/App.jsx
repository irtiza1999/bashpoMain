import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header";
import HeaderBar from "./components/HeaderBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/footer";
import styled from 'styled-components';
import { Container, Row, Col } from "react-bootstrap";

const MainContent = styled.div`
  margin-top: 60px; /* Adjust the margin based on your header height */
  @media (max-width: 768px) {
    margin-top: 0; /* Remove the margin on smaller screens */
  }
`;

const App = () => {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith("/admin");

  return (
    <Container fluid>
      <div className="my-2">
        <Row>
          <Col md={3} xs={12}>
            <HeaderBar />
          </Col>
          <Col md={9} xs={12}>
            {!isAdminPanel && (
              <>
                <ToastContainer
                  position="bottom-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  theme="light"
                />
              </>
            )}
            <MainContent>
              <Outlet />
              {!isAdminPanel && <Footer />}
            </MainContent>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default App;
