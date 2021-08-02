import EditableNode from './EditableNode';

export default class EmptyNode {
  constructor(onDelete) {
    this.shape = "react-shape";
    this.x = 250;
    this.y = 125;
    this.width = 250;
    this.height = 70;
    this.id = "empty";
    this.component = (node) => <EditableNode onDelete={onDelete} />
  }
}