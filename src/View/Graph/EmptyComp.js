import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function EmptyComp({node, onDelete}) {
  const emptyRef = useRef();
  const deleteRef = useRef();

  useEffect(() => {
    node.once("fit", () => emptyRef.current.style.display = "none")
  }, []);

  const onMouseEnter = () => {
    // console.log("enter");
    deleteRef.current.style.display = "inline";    
  }
  
  const onMouseLeave = () => {
    // console.log("leave");
    deleteRef.current.style.display = "none";
  }

  return (
    <Empty ref={emptyRef}> 
      <EmptyText onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        请将左侧服务或关系拖入框内
        <DeleteBTN onClick={onDelete} ref={deleteRef} icon={<DeleteOutlined />}/>
      </EmptyText>
    </Empty>
  );
}

//============ Styled Component ===============
const Empty = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed grey;
  font-size: small;
  color: grey;
`;

const EmptyText = styled.div`
  /* border: 3px dashed purple; */
  width: 130%; 
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translateX(-13%);
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