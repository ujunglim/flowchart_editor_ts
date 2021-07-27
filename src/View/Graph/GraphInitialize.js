import styled from "styled-components";
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

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

//=========================== when click plus it shows up ================================
  const emptySetting = {
    shape: "react-shape", //*  !!!!  *//
    component: <Empty> <EmptyText 
    i
    onMouseEnter={() => {
      console.log("enter");
      const deleteBTNDOM = document.querySelector("#delete_btn");
      deleteBTNDOM.style.opacity = 1;

    }}
    onMouseLeave={() => {
      console.log("leave")
      const deleteBTNDOM = document.querySelector("#delete_btn");
      deleteBTNDOM.style.opacity = 0;

    }}>请将左侧服务或关系拖入框内<DeleteBTN id="delete_btn" icon={<DeleteOutlined />}/></EmptyText></Empty>,
    x: 275,
    y: 125,
    width: 200,
    height: 70,
    id: "empty",
  };

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
}

//============ Styled Component ===============
const Empty = styled.div`
  width: 100%;
  height: 100%;
  border: 2px dashed grey;
  font-size: small;
  color: grey;
`;

const EmptyText = styled.div`
  /* border: 3px dashed purple; */
  width: 130%;  /*  140%  */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translateX(-13%);
`;

const DeleteBTN = styled(Button)`
  position: absolute;
  right: 0%;
  transform: translateX(15px);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 100ms all ease-in-out;
  opacity: 0;
  border: 1px solid lightgrey;
  background-color: white;
  cursor: pointer;

  &:hover {
    color: #1890FF;
    border-color: #1890FF;
  }
`;