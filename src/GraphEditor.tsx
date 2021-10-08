import { usePortal } from "@antv/x6-react-shape";
import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import GraphComp from "./View/Graph/GraphComp";
import GraphInitialize from "./View/Graph/GraphInitialize";
import Inspector from "./View/Inspector/Inspector";
import StencilComp from "./View/Stencil/StencilComp";

const GRAPH_1 = "GRAPH_1";

type Props = {
  relations: string[],
  services: string[]
}

export default function GraphEditor({relations, services}: Props) {
  const [Portal, setPortalGraph] = usePortal(GRAPH_1);
  const graphRef = useRef(null);
  const stencilRef = useRef(null);

  useEffect(() => {
    GraphInitialize(graphRef.current);
    // setPortalGraph(graphRef.current);
  }, [Portal]);

  return (
    <DIV>
      <GlobalStyle />
      <Inspector />
      <GraphComp graphRef={graphRef} />
      <StencilComp graphRef={graphRef} stencilRef={stencilRef} relations={relations} services={services} />
    </DIV>
  );
}

//============ styled components ==============
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

const DIV = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  width: 100%;
`;