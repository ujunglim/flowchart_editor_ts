import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';
import styled from 'styled-components';

export default function EditableNode({onDelete, children}) {
  const deleteRef = useRef();

  const onMouseEnter = () => {
    // console.log("enter");
    deleteRef.current.style.display = "block";    
  }
  
  const onMouseLeave = () => {
    // console.log("leave");
    deleteRef.current.style.display = "none";
  }

  return (
    <NodeContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      <DeleteBTN onClick={onDelete} ref={deleteRef} icon={<DeleteOutlined />}/>
    </NodeContainer>
  );
}

//============ Styled Component ===============
const NodeContainer = styled.div`
  // border: 3px dashed purple; 
  width: 100%; 
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteBTN = styled(Button)`
  position: absolute;
  right: 0%;
  transform: translateX(15px);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: none;
  transition: 100ms all ease-in-out;
  border: 1px solid lightgrey;
  background-color: white;
  cursor: pointer;

  &:hover {
    color: #1890FF;
    border-color: #1890FF;
  }
`;