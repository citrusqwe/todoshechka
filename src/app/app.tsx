import styled from 'styled-components';
import './styles/app.css';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const App = () => {
  return (
    <div>
      <Wrapper>
        <Title>Title</Title>
      </Wrapper>
    </div>
  );
};

export default App;
