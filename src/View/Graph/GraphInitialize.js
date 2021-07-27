import styled from "styled-components";

// setting of initial nodes(开始，结束，+)
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
  // const bounds = useRef([]);

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

  // const deleteSetting = {
  //   ...nodeSetting,
  //   id: "delete",
  //   x: 480,
  //   y: 150,
  //   width: 20,
  //   height: 20,
  //   attrs: {
  //     label: {
  //       text: "🧺"
  //     }
  //   }
  // };
//==============================================================
  const deleteBTNDOM = document.querySelector("#delete_btn");

  const emptySetting = {
    shape: "react-shape", //*  !!!!  *//
    component: <Empty> <EmptyText 
    onMouseEnter={() => {
      console.log("enter");
      // deleteBTNDOM.style.opacity = "0.5";

    }}
    onMouseLeave={() => {
      console.log("leave")

    }}>请将左侧服务或关系拖入框内<DeleteBTN id="delete_btn">🧺</DeleteBTN></EmptyText></Empty>,
    x: 270,
    y: 130,
    width: 200,
    height: 70,
    id: "empty",
    attrs: {
      body: {
        // fill: "pink"
      }
    }
  };
//==============================================================

  const deleteSetting = {
    shape: "react-shape", //*  !!!!  *//
    component: <Delete>🧺</Delete>,
    x: 480,
    y: 150,
    width: 25,
    height: 25,
    id: "delete"
  };

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

  let emptyNode = null;
  graph.on("node:click", ({ node }) => {
    // click plus
    if (node.id === "plus") {
      // add emptyNode
      emptyNode = graph.addNode(emptySetting);
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
    else if(node.id === "delete") {
      console.log("clicked delete");
    }
  });

  let deleteNode = null;
  deleteNode = graph.addNode(deleteSetting);
  deleteNode.hide();

  // graph.on("node:mouseenter", ({ node }) => {
  //   console.log("enter: ", node.id);
  //   if (node.id === "empty" || node.id === "delete") {
  //     deleteNode.show(); // deleteNode = graph.addNode(deleteSetting);
  //     // bind 
  //     emptyNode.addChild(deleteNode);
  //     // node.addTools([
  //     //   {
  //     //     name: "button-remove",
  //     //     args: {
  //     //       x: "100%",
  //     //       y: 0
  //     //       // offset: { x: 20, y: 25 }
  //     //     }
  //     //   }
  //     // ]);
  //   }
  // });

  // graph.on("node:mouseleave", ({ node }) => {
  //   console.log("leave: ", node.id);
  //   if (node.id === "empty") {
  //     // graph.removeNode(deleteNode);
  //     deleteNode.hide();
  //     // node.removeTools();
  //   }
  // });
}

//========= Styled Component ==========
const Empty = styled.div`
  /* margin: 0 20px; */
  width: 100%;
  height: 100%;
  /* background: white; */
  border: 2px solid red;
  font-size: small;
  color: lightgrey;
`;

const Delete = styled.div`
  background: red;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.div`
  border: 3px dashed purple;
  width: 130%;  /*  140%  */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translateX(-13%);
  
`;

const DeleteBTN = styled.button`
  position: absolute;
  right: 0%;
  transform: translateX(10px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;