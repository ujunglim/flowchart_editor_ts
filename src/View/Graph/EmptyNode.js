import styled from 'styled-components';
import EditableNode from './EditableNode';

export default class EmptyNode {
  constructor(deleteNode) {
    this.width = 250;
    this.height = 70;

    if(deleteNode) {
      // 居中
      const {x, y} = deleteNode.position();
      const {width} = deleteNode.size();
      this.x = x + (width - this.width)/2;
      this.y = y;
    }
    else {
      this.x = 250;
      this.y = 125;
    }

    this.shape = "react-shape";
    this.id = "empty";
    this.component = (node) => (
      <EditableNode onDelete={() => {}}>
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