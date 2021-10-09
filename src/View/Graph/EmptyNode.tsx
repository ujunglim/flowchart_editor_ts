import styled from 'styled-components';
import EditableNode from './EditableNode';

export class EmptyNode {
  width: number;
	height: number;
	x: number;
	y: number;
	shape: string;
	id: string;
	component: any;

  constructor() {
    this.width = 250;
    this.height = 70;
    this.x = 250;
    this.y = 125;
    this.shape = "react-shape";
    this.id = "empty";
    this.component = (node: any) => (
      <EditableNode onDelete={() => {}}>
        <Empty>请将左侧服务或关系拖入框内</Empty>
      </EditableNode> 
    )
  }
}

export class EmptyParallelNode {
  width: number;
	height: number;
	x: number;
	y: number;
	shape: string;
	id: string;
	component: any;

  constructor(x: number, id: string) {
    this.width = 250;
    this.height = 70;
    this.x = x;
    this.y = 250;
    this.shape = "react-shape";
    this.id = id;
    this.component = (node: any) => (
      <EditableNode>
        <Empty>请将左侧服务拖入框内</Empty>
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