import EmptyNode from "../View/Graph/EmptyNode";

class Interaction {
	constructor() {
		
	}

	addServiceNode() {

	}

	addParallelNode() {
		
	}

	deleteServiceNode(serviceNode, graph) {
		// new emptyNode
		const newEmptyNode = graph.addNode(new EmptyNode());

		// get in, out edges of service node, then reconnect with newEmptyNode
		graph.getIncomingEdges(serviceNode)[0].setTarget(newEmptyNode);
		graph.getOutgoingEdges(serviceNode)[0].setSource(newEmptyNode);

		// delete service node, add empty node
		graph.removeNode(serviceNode);
	}

	deleteParalleleNode() {

	}
}

const interaction = new Interaction();
export default interaction;