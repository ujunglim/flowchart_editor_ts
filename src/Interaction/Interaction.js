import EmptyNode from "../View/Graph/EmptyNode";
import { PolygonFinishNode, PolygonStartNode } from "../View/Graph/PolygonNode";
import ServiceNode from '../View/Graph/ServiceNode';

class Interaction {
	constructor() {
		
	}

	// 只是检查 true or false 能不能放node
	validateNode(droppingNode, options, graph) {
		this.graph = graph;

		// find empty node
		for(let node of graph.getNodes()) {
			if(node.id === 'empty') {
				const emptyBBox = node.getBBox();
				const dropBBox = droppingNode.getBBox();

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
		const serviceNode = this.graph.addNode(serviceNodeSetting)

		// 根据 oldNode 拿到他的 edges
		const incomingEdge = this.graph.getIncomingEdges(oldNode)[0];
		const outgoingEdge = this.graph.getOutgoingEdges(oldNode)[0];

		// get in and out edge of empty node, then reconnect with new polygon node
		incomingEdge.setTarget(serviceNode);
		outgoingEdge.setSource(serviceNode);
	}

	addParallelNode(oldNode) {
		// 创建新的 poly instances，根据 oldNode 剧中他们
		const startInstance = new PolygonStartNode(oldNode, this.graph, (currNode) => this.deleteParalleleNode(currNode));
		const finishInstance = new PolygonFinishNode(oldNode, this.graph);

		// 根据 oldNode 拿到他的 edges
		const incomingEdge = this.graph.getIncomingEdges(oldNode)[0];
		const outgoingEdge = this.graph.getOutgoingEdges(oldNode)[0];

		// get in and out edge of empty node, then reconnect with new polygon node
		incomingEdge.setTarget(startInstance.node);
		outgoingEdge.setSource(finishInstance.node);

		// add poly instances 之间的 edge
		this.graph.addEdge({
			source: startInstance.node,
			target: finishInstance.node,
			attrs: {
				line: {
					stroke: "red",
					sourceMarker: "circle"
					// size: 1
				}
			}
		})

		this.graph.trigger("AddParallel");
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