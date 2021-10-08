import EditableNode from "./EditableNode";
import Polygon from "./Polygon";

export class PolygonStartNode {
	public width: number;
	public height: number;
	public x: number;
	public y: number;
	public shape: string;
	public id: string;
	public component: any;

	constructor(emptyNode: any, onDelete: any) {
		const {x, y} = emptyNode.position();
		const {width} = emptyNode.size();

		this.width = 210;
		this.height = 50;
		this.x = x + (width - this.width)/2;
		this.y = y;
		this.shape = 'react-shape';
		this.id = "polygonStartNode";
		this.component = (node: any) => (
			<EditableNode onDelete={() => onDelete(node)}>
				<Polygon fillColor={"none"} strokeColor={"#1890FF"} strokeWidth={"1px"}>并行开始</Polygon>
			</EditableNode>
		)
	}
}

export class PolygonFinishNode {
	public width: number;
	public height: number;
	public x: number;
	public y: number;
	public shape: string;
	public id: string;
	public component: any;

	constructor(emptyNode: any) {
		const {x, y} = emptyNode.position();
		const {width} = emptyNode.size();

		this.width = 210;
		this.height = 50;
		this.x = x + (width - this.width)/2;
		this.y = y + 270;
		this.shape = 'react-shape';
		this.id = "polygonFinishNode";
		this.component = <Polygon fillColor={"none"} strokeColor={"#1890FF"} strokeWidth={"1px"}>并行结束</Polygon>
	}
}