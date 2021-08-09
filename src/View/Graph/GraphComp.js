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
      // grid: {
      //   size: 10,
      //   visible: true,
      //   type: "dot",
      //   args: {
      //     color: "grey",  /*#a0a0a0*/
      //     thickness: 1
      //   }
      // },
      background: { color: '#F7FBFF' },
      interacting: {
        nodeMovable: false
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
  border: 1px solid lightgrey;
  border-right: none;
`;
