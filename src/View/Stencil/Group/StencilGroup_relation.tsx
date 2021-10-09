import styled from "styled-components";
import StencilGroup_base from "./StencilGroup_base";

export default class StencilGroup_relation extends StencilGroup_base {
  constructor(relations: string[]) {
    super();
    this.titles = relations;
    this.groupName = "关系节点";
    this.Component = RelationNode;
    this.init("relation");
  }
}

//========= Styled Component ============
const RelationNode = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  border: 2px dashed lightgrey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
