import { usePortal } from "@antv/x6-react-shape";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import GraphComp from "./View/Graph/GraphComp";
import GraphInitialize from "./View/Graph/GraphInitialize";
import StencilComp from "./View/Stencil/StencilComp";

const GRAPH_1 = "GRAPH_1";

export default function GraphEditor() {
  const [Portal, setPortalGraph] = usePortal(GRAPH_1);
  const graphRef = useRef(null);
  const stencilRef = useRef(null);

  useEffect(() => {
    GraphInitialize(graphRef.current);
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
  justify-content: center;
  flex-direction: row-reverse;
  width: 100%;
`;
