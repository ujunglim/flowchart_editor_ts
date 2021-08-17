import store from "../Redux/reducer";
import { EmptyNode, EmptyParallelNode } from "../View/Graph/EmptyNode";
import { PolygonFinishNode, PolygonStartNode } from "../View/Graph/PolygonNode";
import ServiceNode from '../View/Graph/ServiceNode';

class Interaction {
	constructor() {
		// create container node, 用来一次性 delete 整个 parallel node 树
		this.containerNode = null;
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
			else if(node.id === 'emptyParallel_0' || node.id === 'emptyParallel_1') {
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
		// container node is invisible
		this.containerNode = this.graph.addNode({id: 'container_node'});

		// 创建新的 poly instances，根据 oldNode 剧中他们
		const startInstance = new PolygonStartNode(oldNode, 
			(startNode) => this.deleteParalleleNode(startNode, finishNode));
		const finishInstance = new PolygonFinishNode(oldNode);

		// add start, finish nodes
		const startNode = this.graph.addNode(startInstance);
		const finishNode = this.graph.addNode(finishInstance);

		// ================== default parallel nodes, edges ================
		let routeNum = 2; //default number of router
		let parallelNodes = [];
		let parallelUpEdges = [];
		let parallelDownEdges = [];
		// default setting of parallel edges  
		const edgeSetting = {
			router: 'orth',
			attrs: {
				line: {
					stroke: "#1890FF",
					sourceMarker: "circle"
				}
			}
		}

		for(let i = 0; i < 2; i++) {
			// nodes
			parallelNodes.push(this.graph.addNode(new EmptyParallelNode(120 + 260*i, `emptyParallel_${i}`)));
			// edges
			parallelUpEdges.push(this.graph.addEdge({
				...edgeSetting,
				id: `upEdge_${i}`,
				source: startNode,
				target: parallelNodes[i],
				vertices: [{x: 300 + 100*i, y: 220}]
			}));

			parallelDownEdges.push(this.graph.addEdge({
				...edgeSetting,
				id: `downEdge_${i}`,
				source: parallelNodes[i],
				target: finishNode,
				vertices: [{x: 300 + 100*i, y: 350}]
			}))

			// add to containerNode
			this.containerNode.addChild(parallelNodes[i]);
			this.containerNode.addChild(parallelUpEdges[i]);
			this.containerNode.addChild(parallelDownEdges[i]);
		}

		// ===================== change on parallel nodes, edges ===========================
		const onChangeRouteNum = () => {
			// get routeNum from redux store
			routeNum = store.getState().routeNum;
			
			// remove previous parallelNodes, edges
			for(let i = 0; i <= routeNum; i++) {
				this.graph.removeNode(`emptyParallel_${i}`);
			}
			parallelNodes = [];
			parallelUpEdges = [];
			parallelDownEdges = [];

			// add parallel nodes, edges and addChild to containerNode
			for(let i = 0; i < routeNum; i++) {
				// nodes
				parallelNodes.push(this.graph.addNode(new EmptyParallelNode(120 + 260*i, `emptyParallel_${i}`)));

				// edges
				parallelUpEdges.push(this.graph.addEdge({
					...edgeSetting,
					id: `upEdge_${i}`,
					source: startNode,
					target: parallelNodes[i],
					vertices: [{x: 300 + 100*i, y: 220}],
					attrs: {
						line: {
							stroke: "#1890FF",
							sourceMarker: "circle"
						}
					}
				}));

				parallelDownEdges.push(this.graph.addEdge({
					...edgeSetting,
					id: `downEdge_${i}`,
					source: parallelNodes[i],
					target: finishNode,
					vertices: [{x: 300 + 100*i, y: 350}],
					attrs: {
						line: {
							stroke: "#1890FF",
							sourceMarker: "circle"
						}
					}
				}))	

				// addChild to containerNode
				this.containerNode.addChild(parallelNodes[i]);
				this.containerNode.addChild(parallelUpEdges[i]);
				this.containerNode.addChild(parallelDownEdges[i]);
			}

			// console.log(routeNum);
			// console.log(parallelNodes);
			// console.log(parallelUpEdges);
			// console.log(parallelDownEdges);
			// console.log(this.graph.getNodes());
			// console.log(this.graph.getEdges());
		}
		store.subscribe(onChangeRouteNum);

		// 根据 oldNode 拿到他的 edges
		const incomingEdge = this.graph.getIncomingEdges(oldNode)[0];
		const outgoingEdge = this.graph.getOutgoingEdges(oldNode)[0];

		// get in and out edge of empty node, then reconnect with start, finish nodes
		incomingEdge.setTarget(startNode);
		outgoingEdge.setSource(finishNode);

		// add start, finish nodes to containerNode
		this.containerNode.addChild(startNode);
		this.containerNode.addChild(finishNode);

		// listen AddParallelService, and add serviceNode to containerNode
		this.graph.on("AddParallelService", (serviceNode) => {
			this.containerNode.addChild(serviceNode);
		})

		// trigger of add parallel node event 
		this.graph.trigger("AddParallel");
	}

	deleteServiceNode(serviceNode) {
		const id = serviceNode.id;
		let newEmptyNode = null;

		// add new empty node
		if(id === 'empty_Service') {
			newEmptyNode = this.graph.addNode(new EmptyNode());
		}
		else if(id === 'emptyParallel_0_Service') {
			newEmptyNode = this.graph.addNode(new EmptyParallelNode(120, 'emptyParallel_0'));
			// add new emptyNode to containerNode
			this.containerNode.addChild(newEmptyNode);
		}
		else if(id === 'emptyParallel_1_Service') {
			newEmptyNode = this.graph.addNode(new EmptyParallelNode(380, 'emptyParallel_1'));
			// add new emptyNode to containerNode
			this.containerNode.addChild(newEmptyNode);
		}

		// get in, out edges of service node, then reconnect with newEmptyNode
		this.graph.getIncomingEdges(serviceNode)[0].setTarget(newEmptyNode);
		this.graph.getOutgoingEdges(serviceNode)[0].setSource(newEmptyNode);

		// delete service node
		this.graph.removeNode(serviceNode);
	}

	deleteParalleleNode(startNode, finishNode) {
		// add new emptyNode
		const newEmptyNode = this.graph.addNode(new EmptyNode());

		// get in, out edges of polygonStart, finish node, then reconnect with newEmptyNode
		this.graph.getIncomingEdges(startNode)[0].setTarget(newEmptyNode);
		this.graph.getOutgoingEdges(finishNode)[0].setSource(newEmptyNode);

		// delete containerNode
		this.graph.removeNode(this.containerNode);

		// trigger of delete parallel node event
		this.graph.trigger("DeleteParallel");
	}
}

const interaction = new Interaction();
export default interaction;