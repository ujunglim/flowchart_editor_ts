import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function GraphComp({ graphRef }) {
  const container = useRef(null);

  useEffect(() => {
    // create graph instance
    graphRef.current = new Graph({
      container: container.current,
      // autoResize: true,
      width: 800,
      height: 700,
      // grid: {visible: true},
      background: { color: '#F7FBFF' },
      interacting: {
        nodeMovable: false
      },
      scroller: {
        enabled: true,
        // pageVisible: true,
        // pageBreak: true,
      },
      // embedding: {
      //   enabled: true
      // }
    });
  }, []);

  return <GraphContainer ref={container}></GraphContainer>;
}

//============ styled components ==============
const GraphContainer = styled.div`
  // border: 1px solid lightgrey;
  // border-right: none;
`;
