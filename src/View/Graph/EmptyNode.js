import EmptyComp from './EmptyComp';


export default class EmptyNode {
  constructor(onDelete) {
    this.shape = "react-shape";
    this.x = 275;
    this.y = 125;
    this.width = 200;
    this.height = 70;
    this.id = "empty";
    this.component = <EmptyComp onDelete={onDelete}/>;
  }
}