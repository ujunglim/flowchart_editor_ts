import styled from 'styled-components';

export default function SingleNode({title}) {

  return <SNode>{title}</SNode>
}


//=========== Styled Components ==============
const SNode = styled.div`
  width: 170px;
  height: 35px;
  background: white;
  border: 1px solid #1890FF;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;