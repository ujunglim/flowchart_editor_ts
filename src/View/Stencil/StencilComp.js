import { Addon } from "@antv/x6";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import interaction from "../../Interaction/Interaction";
import PolygonNode from "../Graph/PolygonNode";
import ServiceNode from '../Graph/ServiceNode';
import StencilGroup_relation from "./Group/StencilGroup_relation";
import StencilGroup_service from "./Group/StencilGroup_service";

export default function StencilComp({ graphRef, stencilRef }) {
  const container = useRef(null);

  useEffect(() => {
    if(!graphRef.current) {
      return;
    }
    // create stencil instance
    const stencil = new Addon.Stencil({
      title: "Components",
      target: graphRef.current,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: "全部服务/节点",
      notFoundText: "Not Found",
      collapsable: true,
      stencilGraphWidth: 230,
      stencilGraphHeight: 100,
      layoutOptions: {
        columns: 1,
        dx: 0,
        dy: 0,
        center: true,
        columnWidth: 200,
        rowHeight: 50,

      },
      stencilGraphOptions: {
        background: {color: '#ffffff',}
      },
      groups: [
        {
          name: "关系节点",
          title: "关系节点"
        },
        {
          name: "讯飞服务",
          title: "讯飞服务",
          graphHeight: 300
        }
      ],
      validateNode(droppingNode, options) {
        const graph = graphRef.current;
        for(let node of graph.getNodes()) {
          if(node.id === 'empty') {
            const emptyBBox = node.getBBox();
            const dropBBox = droppingNode.getBBox();

            const incomingEdge = graph.getIncomingEdges(node)[0];
            const outgoingEdge = graph.getOutgoingEdges(node)[0];


            // 判断交叉，有没有child
            if(dropBBox.isIntersectWithRect(emptyBBox) && node.getChildCount() === 0) {
              // get title and group of dropping node
              const {title, group} = droppingNode.getData();
              let newNode = null;

              // 判断 relation or service node
              if(group === "service") {
                const serviceNodeSetting = new ServiceNode(node, title, 
                  (currNode) => interaction.deleteServiceNode(currNode, graph));
                
                // add new graph node
                newNode = graph.addNode(serviceNodeSetting);
              }
              else if(group === "relation") {
                // add Polygon node
                const polygonNodeSetting = new PolygonNode("并行开始", node, 
                  (currNode) => interaction.deleteParalleleNode(currNode, graph));

                newNode = graph.addNode(polygonNodeSetting);
              }

              // get in and out edge of empty node, then reconnect with new polygon node
              incomingEdge.setTarget(newNode);
              outgoingEdge.setSource(newNode);

              // remove empty node
              graph.removeNode(node);

              return false;
            }
          }
        }
        return false;
      }
    });

    stencilRef.current = stencil;
    container.current.appendChild(stencil.container);

    const serviceGroup = new StencilGroup_service();
    serviceGroup.load(stencil);

    const relationGroup = new StencilGroup_relation();
    relationGroup.load(stencil);
  }, []);

  return <StencilContainer ref={container}></StencilContainer>;
}

//============ styled components ==============
const StencilContainer = styled.div`
  width: 230px;
  border: 1px solid #f0f0f0;
  position: relative; /* !!! */
`;
