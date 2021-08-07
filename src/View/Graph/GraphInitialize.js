import { EmptyNode } from './EmptyNode';

// setting of initial nodes(source, target, plusNode)
const nodeSetting = {
  shape: "circle",
  width: 50,
  height: 50,
  attrs: {
    body: {
      stroke: "lightgrey",
      strokeWidth: 1
    }
  }
};

export default function GraphInitialize(graph) {
  const source = graph.addNode({
    ...nodeSetting,
    x: 350,
    y: 30,
    attrs: {
      label: {
        text: "开始"
      }
    }
  });

  const target = graph.addNode({
    ...nodeSetting,
    x: 350,
    y: 140,
    attrs: {
      label: {
        text: "结束"
      }
    }
  });

  // listener of add parallel node event 
  graph.on("AddParallel", () => {
    target.translate(undefined, 250);
  })

  // listener of delete parallel node event 
  graph.on("DeleteParallel", () => {
    target.translate(undefined, -250);
  })

  const plusNode = graph.addNode({
    ...nodeSetting,
    id: "plus",
    x: 367,
    y: 80,
    width: 13,
    height: 13,
    attrs: {
      label: {
        text: "+"
      }
    }
  });

//========================= Edges ===============================
  const edgeAttrs = {
    attrs: {
      line: {
        stroke: "#1890FF",
        sourceMarker: "circle"
        // size: 1
      }
    }
  };

  graph.addEdge({
    ...edgeAttrs,
    source: plusNode,
    target
  });

  graph.on("node:click", ({ node }) => {
    // click plus
    if (node.id === "plus") {
      // add emptyNode
      const emptyNode = graph.addNode(new EmptyNode());
      target.translate(undefined, 100);
      // plus is invisible
      plusNode.hide();
      // add 上面edge
      graph.addEdge({
        ...edgeAttrs,
        source,
        target: emptyNode
      });
      // add 下面edge
      graph.addEdge({
        ...edgeAttrs,
        source: emptyNode,
        target
      });
    }
  });
}
