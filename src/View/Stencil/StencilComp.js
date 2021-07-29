import { Addon } from "@antv/x6";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import StencilGroup_Relation from "./Group/StencilGroup_Relation";
import StencilGroup_Service from "./Group/StencilGroup_Service";

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

            // 判断交叉，有没有child
            if(dropBBox.isIntersectWithRect(emptyBBox) && node.getChildCount() === 0){
              // 剧中
              const {x: emptyX, y: emptyY} = node.position();
              const {width: emptyW} = node.size();
              const {width: dropW} = droppingNode.size();
              droppingNode.position(emptyX + (emptyW - dropW)/2, emptyY);

              //绑定 父子
              node.addChild(droppingNode);  // trigger change:children
              
              // empty Node 跟 dropping Node一样大小
              node.fit();
              node.trigger("fit", []);   // 记得写 arg
              
              return true;
            }
          }
        }
        return false;
      }
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
  width: 230px;
  border: 1px solid #f0f0f0;
  position: relative; /* !!! */
`;
