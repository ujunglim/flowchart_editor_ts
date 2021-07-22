import { usePortal } from "@antv/x6-react-shape";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import GraphComp from "./View/Graph/GraphComp";
import GraphInitialize from "./View/Graph/GraphInitialize";
import StencilComp from "./View/Stencil/StencilComp";

const GRAPH_1 = "GRAPH_1";

export default function GraphEditor() {
  const [Portal, setPortalGraph] = usePortal(GRAPH_1);
  // const bound = useRef([]);
  const graphRef = useRef(null);
  const stencilRef = useRef(null);

  useEffect(() => {
    // set bound node array
    GraphInitialize(graphRef.current);

    // bound.current = boundNodeArr;

    setPortalGraph(graphRef.current);
  }, [Portal]);

  return (
    <DIV>
      <GraphComp graphRef={graphRef} />
      <StencilComp graphRef={graphRef} stencilRef={stencilRef} />
    </DIV>
  );
}

//============ styled components ==============
const DIV = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
`;
