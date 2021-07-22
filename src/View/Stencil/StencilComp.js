import { Addon } from "@antv/x6";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import StencilGroup_Relation from "./Group/StencilGroup_Relation";
import StencilGroup_Service from "./Group/StencilGroup_Service";

export default function StencilComp({ graphRef, stencilRef }) {
  const container = useRef(null);

  useEffect(() => {
    if (!graphRef.current) {
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
      stencilGraphWidth: 200,
      stencilGraphHeight: 100,
      layoutOptions: {
        columns: 1,
        dx: 0,
        dy: 0,
        center: true,
        columnWidth: 200,
        rowHeight: 50
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
      ]
      // validateNode(droppingNode, options) {
      //   const { width, height } = droppingNode.getProp("size");
      //   const dropBBox = droppingNode.getBBox();

      //   const b = bound.current;
      //   for (let i = 0; i < b.length; i++) {
      //     const boundNode = b[i];
      //     const boundBBox = boundNode.getBBox();

      //     // drop box inside of bound
      //     if (dropBBox.isIntersectWithRect(boundBBox)) {
      //       // 绑定 父子
      //       droppingNode.setParent(boundNode);
      //       boundNode.setChildren([droppingNode]);
      //       // 居中
      //       const { x: boundX, y: boundY } = boundNode.position();
      //       const { width: boundW, height: boundH } = boundNode.size();
      //       droppingNode.position(
      //         boundX + (boundW - width) / 2,
      //         boundY + (boundH - height) / 2
      //       );
      //       // bound invisible
      //       // boundNode.hide();
      //       return true;
      //     }
      //   }
      //   return false;
      // }
    });
    stencilRef.current = stencil;
    container.current.appendChild(stencil.container);

    const serviceGroup = new StencilGroup_Service();
    serviceGroup.load(stencil);

    const relationGroup = new StencilGroup_Relation();
    relationGroup.load(stencil);
  }, []);

  return <StencilContainer ref={container}></StencilContainer>;
}

//============ styled components ==============
const StencilContainer = styled.div`
  width: 200px;
  border: 1px solid #f0f0f0;
  position: relative; /* !!! */
`;
