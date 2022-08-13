import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
};

export default Layout;

const Frame = styled.div`
  width: 1200px;
  height: 100vh;
  margin: 0 auto;
`;
