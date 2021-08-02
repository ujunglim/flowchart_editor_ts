import styled from 'styled-components';
import EditableNode from './EditableNode';

export default class EmptyNode {
  constructor(onDelete) {
    this.shape = "react-shape";
    this.x = 250;
    this.y = 125;
    this.width = 250;
    this.height = 70;
    this.id = "empty";
    this.component = (node) => (
      <EditableNode onDelete={onDelete}>
        <Empty>请将左侧服务或关系拖入框内</Empty>
      </EditableNode> 
    )
  }
}

//=========== Styled Components ==========
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