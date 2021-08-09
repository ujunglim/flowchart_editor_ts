import { Addon } from "@antv/x6";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import interaction from "../../Interaction/Interaction";
import StencilGroup_relation from "./Group/StencilGroup_relation";
import StencilGroup_service from "./Group/StencilGroup_service";

export default function StencilComp({ graphRef, stencilRef, relations, services }) {
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
        rowHeight: 50
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
      validateNode: (droppingNode, options) => interaction.validateNode(droppingNode, options, graphRef.current)
    });

    stencilRef.current = stencil;
    container.current.appendChild(stencil.container);

    // add service, relation group to stencil
    const serviceGroup = new StencilGroup_service(services);
    serviceGroup.load(stencil);

    const relationGroup = new StencilGroup_relation(relations);
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
