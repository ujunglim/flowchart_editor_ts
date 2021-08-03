import EmptyNode from "../View/Graph/EmptyNode";
import PolygonNode from "../View/Graph/PolygonNode";
import ServiceNode from '../View/Graph/ServiceNode';


class Interaction {
	constructor() {
		
	}

	validateNode(droppingNode, options, graph) {
		this.graph = graph;

		// find empty node
		for(let node of graph.getNodes()) {
			if(node.id === 'empty') {
				const emptyBBox = node.getBBox();
				const dropBBox = droppingNode.getBBox();

				const incomingEdge = graph.getIncomingEdges(node)[0];
				const outgoingEdge = graph.getOutgoingEdges(node)[0];

				// 判断交叉，有没有child
				if(dropBBox.isIntersectWithRect(emptyBBox) && node.getChildCount() === 0) {
					// get title and group of dropping node
					const {title, group} = droppingNode.getData();
					let newNode = null;

					// 判断 relation or service node
					if(group === "service") {
						newNode = this.addServiceNode(node, title);
					}
					else if(group === "relation") {
						newNode = this.addParallelNode(node, newNode);
					}

					// get in and out edge of empty node, then reconnect with new polygon node
					incomingEdge.setTarget(newNode, title, newNode);
					outgoingEdge.setSource(newNode, title, newNode);

					// remove empty node
					graph.removeNode(node);

					return false;
				}
			}
		}
		return false;
	}

	addServiceNode(oldNode, title) {
		const serviceNodeSetting = new ServiceNode(oldNode, title, 
			(currNode) => this.deleteServiceNode(currNode));
						
		// add service node
		return this.graph.addNode(serviceNodeSetting);
	}

	addParallelNode(oldNode) {
		const polygonNodeSetting = new PolygonNode("并行开始", oldNode, 
		(currNode) => this.deleteParalleleNode(currNode));

		// add Polygon node
		return this.graph.addNode(polygonNodeSetting);
	}

	deleteServiceNode(serviceNode) {
		// add new emptyNode
		const newEmptyNode = this.graph.addNode(new EmptyNode());

		// get in, out edges of service node, then reconnect with newEmptyNode
		this.graph.getIncomingEdges(serviceNode)[0].setTarget(newEmptyNode);
		this.graph.getOutgoingEdges(serviceNode)[0].setSource(newEmptyNode);

		// delete service node
		this.graph.removeNode(serviceNode);
	}

	deleteParalleleNode(polygonNode) {
		// add new emptyNode
		const newEmptyNode = this.graph.addNode(new EmptyNode());

		// get in, out edges of polygon node, then reconnect with newEmptyNode
		this.graph.getIncomingEdges(polygonNode)[0].setTarget(newEmptyNode);
		this.graph.getOutgoingEdges(polygonNode)[0].setSource(newEmptyNode);

		// delete polygon node
		this.graph.removeNode(polygonNode);
	}
}

const interaction = new Interaction();
export default interaction;