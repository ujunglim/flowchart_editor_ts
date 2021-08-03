import EditableNode from "./EditableNode";
import Polygon from "./Polygon";

export default class PolygonNode {
	constructor(emptyNode, onDelete) {
		const {x, y} = emptyNode.position();
		const {width} = emptyNode.size();

		this.shape = 'react-shape';
		this.width = 220;
		this.height = 70;
		this.x = x + (width - this.width)/2;
		this.y = y;
		this.id = "polygonNode";
		this.component = (node) => (
			<EditableNode onDelete={() => onDelete(node)}>
				<Polygon fillColor={"none"} strokeColor={"#1890FF"} strokeWidth={"1px"}/>
			</EditableNode>
		)

	}
}