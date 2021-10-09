import styled from 'styled-components';
import EditableNode from './EditableNode';

export default class ServiceNode {
  width: number;
	height: number;
	x: number;
	y: number;
	shape: string;
	id: string;
	component: any;

  constructor(emptyNode: any, title: string, onDelete: any) {
    const {x, y} = emptyNode.position();
    const {width} = emptyNode.size();

    this.shape = "react-shape";
    this.width = 220;
    this.height = 35;
    this.x = x + (width - this.width)/2;
    this.y = y;
    this.id = `${emptyNode.id}_Service`;
    this.component = (node: any) => (
      <EditableNode onDelete={() => onDelete(node)}>
        <SNode>{title}</SNode>
      </EditableNode> 
    )
 }
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