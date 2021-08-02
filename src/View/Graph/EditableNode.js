import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import styled from 'styled-components';

export default function EditableNode({onDelete, children}) {
  const deleteRef = useRef();
  const [isEmpty, setIsEmpty] = useState(true);

  const onMouseEnter = () => {
    console.log("enter");
    deleteRef.current.style.display = "block";    
  }
  
  const onMouseLeave = () => {
    console.log("leave");
    deleteRef.current.style.display = "none";
  }

  return (
    <NodeContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {/* {children} */}
      {isEmpty && <Empty>请将左侧服务或关系拖入框内</Empty>}
      <DeleteBTN onClick={onDelete} ref={deleteRef} icon={<DeleteOutlined />}/>
    </NodeContainer>
  );
}

//============ Styled Component ===============
const NodeContainer = styled.div`
  border: 3px dashed purple;
  width: 100%; 
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Empty = styled.div`
  width: 80%;
  height: 100%;
  border: 2px dashed grey;
  font-size: small;
  color: grey;
  padding: 1px;
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