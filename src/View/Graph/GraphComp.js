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
        nodeMovable: true
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
  border: 3px solid lightgrey;
  border-radius: 10px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
`;
