import { HomePage } from 'pages/todo';
import styled from 'styled-components';
import './styles/app.css';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const App = () => (
  <Wrapper>
    <HomePage />
  </Wrapper>
);

export default App;
