import { EmptyNode, EmptyParallelNode } from "../View/Graph/EmptyNode";
import { PolygonFinishNode, PolygonStartNode } from "../View/Graph/PolygonNode";
import ServiceNode from '../View/Graph/ServiceNode';

class Interaction {
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

					// 判断 relation or service node
					if(group === "service") {
						this.addServiceNode(node, title);
					}
					else if(group === "relation") {
						this.addParallelNode(node);
					}

					// remove empty node
					graph.removeNode(node);
					return false;
				}
			}
			else if(node.id === 'leftEmpty' || node.id === 'rightEmpty') {
				const emptyBBox = node.getBBox();
				const dropBBox = droppingNode.getBBox();

				// 判断交叉，有没有child
				if(dropBBox.isIntersectWithRect(emptyBBox) && node.getChildCount() === 0) {
					// get title and group of dropping node
					const {title, group} = droppingNode.getData();

					// 判断 relation or service node
					if(group === "service") {
						this.addServiceNode(node, title);
						// remove empty node
						graph.removeNode(node);
					}
					else if(group === "relation") {
						alert('Only Service Node is available at here.')
					}
					return false;
				}
			}
		}
		return false;
	}

	addServiceNode(oldNode, title) {
		const serviceNodeSetting = new ServiceNode(oldNode, title, 
			(currNode) => this.deleteServiceNode(currNode));
		const serviceNode = this.graph.addNode(serviceNodeSetting);

		// 根据 oldNode 拿到他的 edges
		const incomingEdge = this.graph.getIncomingEdges(oldNode)[0];
		const outgoingEdge = this.graph.getOutgoingEdges(oldNode)[0];

		// get in and out edge of empty node, then reconnect with new polygon node
		incomingEdge.setTarget(serviceNode);
		outgoingEdge.setSource(serviceNode);

		// trigger AddParallelService event, and pass serviceNode
		if(oldNode.id !== 'empty') {
			this.graph.trigger('AddParallelService', serviceNode);
		}
	}

	addParallelNode(oldNode) {
		// create container node, 用来一次性 delete 整个 parallel node 树
		const containerNode = this.graph.addNode({});

		// 创建新的 poly instances，根据 oldNode 剧中他们
		const startInstance = new PolygonStartNode(oldNode, 
			(startNode) => this.deleteParalleleNode(startNode, finishNode, containerNode));
		const finishInstance = new PolygonFinishNode(oldNode);

		// add nodes of parallel tree
		const startNode = this.graph.addNode(startInstance);
		const leftNode = this.graph.addNode(new EmptyParallelNode(120, 'leftEmpty'));
		const rightNode = this.graph.addNode(new EmptyParallelNode(380, 'rightEmpty'));
		const finishNode = this.graph.addNode(finishInstance);

		// 根据 oldNode 拿到他的 edges
		const incomingEdge = this.graph.getIncomingEdges(oldNode)[0];
		const outgoingEdge = this.graph.getOutgoingEdges(oldNode)[0];

		// get in and out edge of empty node, then reconnect with start, finish nodes
		incomingEdge.setTarget(startNode);
		outgoingEdge.setSource(finishNode);

		// add edges
		const edgeSetting = {
			router: 'orth',
			attrs: {
				line: {
					stroke: "#1890FF",
					sourceMarker: "circle"
				}
			}
		}

		const leftUpEdge = this.graph.addEdge({
			...edgeSetting,
			source: startNode,
			target: leftNode,
			vertices: [
        { x: 300, y: 220 },
      ]
		})

		const rightUpEdge = this.graph.addEdge({
			...edgeSetting,
			source: startNode,
			target: rightNode,
			vertices: [
        { x: 400, y: 220 },
      ]
		})

		const leftDownEdge = this.graph.addEdge({
			...edgeSetting,
			source: leftNode,
			target: finishNode,
			vertices: [
        { x: 300, y: 350 },
      ]
		})

		const rightDownEdge = this.graph.addEdge({
			...edgeSetting,
			source: rightNode,
			target: finishNode,
			vertices: [
        { x: 400, y: 350 },
      ]
		})

		// add child nodes, edges to containerNode
		containerNode.addChild(startNode);
		containerNode.addChild(leftNode);
		containerNode.addChild(rightNode);
		containerNode.addChild(finishNode);
		containerNode.addChild(leftUpEdge);
		containerNode.addChild(rightUpEdge);
		containerNode.addChild(leftDownEdge);
		containerNode.addChild(rightDownEdge);

		// listen AddParallelService, and add serviceNode to containerNode
		this.graph.on("AddParallelService", (serviceNode) => {
			containerNode.addChild(serviceNode);
		})

		// trigger of add parallel node event 
		this.graph.trigger("AddParallel");
	}

	deleteServiceNode(serviceNode) {
		const id = serviceNode.id;
		let newEmptyNode = null;

		// add new empty node
		if(id === 'emptyService') {
			newEmptyNode = this.graph.addNode(new EmptyNode());
		}
		else if(id === 'leftEmptyService') {
			newEmptyNode = this.graph.addNode(new EmptyParallelNode(120, 'leftEmpty'));
		}
		else if(id === 'rightEmptyService') {
			newEmptyNode = this.graph.addNode(new EmptyParallelNode(380, 'rightEmpty'));
		}


		// get in, out edges of service node, then reconnect with newEmptyNode
		this.graph.getIncomingEdges(serviceNode)[0].setTarget(newEmptyNode);
		this.graph.getOutgoingEdges(serviceNode)[0].setSource(newEmptyNode);

		// delete service node
		this.graph.removeNode(serviceNode);

	}

	deleteParalleleNode(startNode, finishNode, containerNode) {
		// add new emptyNode
		const newEmptyNode = this.graph.addNode(new EmptyNode());

		// get in, out edges of polygonStart, finish node, then reconnect with newEmptyNode
		this.graph.getIncomingEdges(startNode)[0].setTarget(newEmptyNode);
		this.graph.getOutgoingEdges(finishNode)[0].setSource(newEmptyNode);

		// delete containerNode
		this.graph.removeNode(containerNode);

		// trigger of delete parallel node event
		this.graph.trigger("DeleteParallel");
	}
}

const interaction = new Interaction();
export default interaction;