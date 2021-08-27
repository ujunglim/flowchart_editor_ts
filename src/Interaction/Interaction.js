import store, { routeSlice } from "../Redux/store";
import { EmptyNode, EmptyParallelNode } from "../View/Graph/EmptyNode";
import { PolygonFinishNode, PolygonStartNode } from "../View/Graph/PolygonNode";
import ServiceNode from '../View/Graph/ServiceNode';
import { Modal } from "antd";
import "antd/dist/antd.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

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
			else if(node.id.includes('emptyParallel_')) {
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
			(currNode) => {
				confirm({
					icon: <ExclamationCircleOutlined/>,
					title: "提示",
					content: "您确定要删除该节点吗？",
					onOk: () => this.deleteServiceNode(currNode),
					onCancel: () => {}
				})
			});
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

			// close relation setting panel
			store.dispatch(routeSlice.actions.setRelation(false));
		}

		// remove empty node
		this.graph.removeNode(oldNode);
	}

	addParallelNode(oldNode) {
		// open relation setting panel
		store.dispatch(routeSlice.actions.setRelation(true));

		// container node is invisible
		this.containerNode = this.graph.addNode({
			id: 'container_node',
			// width: 100, height: 100
		});

		// 创建新的 poly instances，根据 oldNode 剧中他们
		const startInstance = new PolygonStartNode(oldNode, 
			(startNode) => {
				confirm({
					icon: <ExclamationCircleOutlined/>,
					title: "提示",
					content: "删除节点时，将同时删除其他节点中的相关数据关系！是否确认删除？",
					onOk: () => this.deleteParalleleNode(startNode, finishNode),
					onCancel: () => {}
				})
			});
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
				vertices: [{x: 245 + 260*i, y: 220}]
			}));

			parallelDownEdges.push(this.graph.addEdge({
				...edgeSetting,
				id: `downEdge_${i}`,
				source: parallelNodes[i],
				target: finishNode,
				vertices: [{x: 310 + 130*i, y: 350}]

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
			const index = routeNum - 1;
			const action = store.getState().action;

			if(action === "plus") {
				// translate previous nodes, vertices
				for(let i = 0; i < index; i++) {
					parallelNodes[i].translate(-130, undefined);
					// translate vertices
					const {x:up_x} = parallelUpEdges[i].getVertices()[0];
					const {x:down_x} = parallelDownEdges[i].getVertices()[0];
					parallelUpEdges[i].setVertices([{x: up_x - 130, y: 220}]);
					parallelDownEdges[i].setVertices([{x: down_x - 65, y: 350}]);
				}

				// add new node, edges
				parallelNodes.push(this.graph.addNode(new EmptyParallelNode(120 + 260*index - (routeNum-2)*130, `emptyParallel_${index}`)));
				
				parallelUpEdges.push(this.graph.addEdge({
					...edgeSetting,
					id: `upEdge_${index}`,
					source: startNode,
					target: parallelNodes[index],
					vertices: [{x: 245 + 260*index-(routeNum-2)*130, y: 220}]
				}));

				parallelDownEdges.push(this.graph.addEdge({
					...edgeSetting,
					id: `downEdge_${index}`,
					source: parallelNodes[index],
					target: finishNode,
					vertices: [{x: 310 + 130*index-(routeNum-2)*65, y: 350}]
				}));

				// addChild to containerNode
				this.containerNode.addChild(parallelNodes[index]);
				this.containerNode.addChild(parallelUpEdges[index]);
				this.containerNode.addChild(parallelDownEdges[index]);
			}
			else if(action === "minus") {
				// translate previous nodes
				for(let i = 0; i < routeNum; i++) {
					parallelNodes[i].translate(130, undefined);
					// translate vertices
					const {x:up_x} = parallelUpEdges[i].getVertices()[0];
					const {x:down_x} = parallelDownEdges[i].getVertices()[0];
					parallelUpEdges[i].setVertices([{x: up_x + 130, y: 220}]);
					parallelDownEdges[i].setVertices([{x: down_x + 65, y: 350}]);
				}
				
				// pop nodes, edges
				parallelNodes.pop();
				parallelUpEdges.pop();
				parallelDownEdges.pop();
				// remove node
				this.graph.removeNode(`emptyParallel_${routeNum}`);
			}
			else if(action === 'reset') {
				// return to default parallel tree
				parallelNodes = parallelNodes.slice(0, 2);
				parallelUpEdges = parallelUpEdges.slice(0, 2);
				parallelDownEdges = parallelDownEdges.slice(0, 2);
			}
			console.log(store.getState());  // why repetetive

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

		// remove empty node
		this.graph.removeNode(oldNode);
	}

	deleteServiceNode(serviceNode) {
		const {x} = serviceNode.position();
		const id = serviceNode.id;
		let newEmptyNode = null;

		// add new empty node
		if(id === 'empty_Service') {
			newEmptyNode = this.graph.addNode(new EmptyNode());
		}
		// add new empty parallel node
		else if(id.includes('emptyParallel_')) {
			const i = id.slice(14, 15);
			// newEmptyNode = this.graph.addNode(new EmptyParallelNode(120 + 260*i, `emptyParallel_${i}`));
			newEmptyNode = this.graph.addNode(new EmptyParallelNode(x-15, `emptyParallel_${i}`));
			
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
		// reset routeNum
		store.dispatch(routeSlice.actions.reset());


		// close relation setting panel
		store.dispatch(routeSlice.actions.setRelation(false));

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