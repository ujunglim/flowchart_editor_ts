import styled from "styled-components";
import StencilGroup_base from "./StencilGroup_base";

export default class StencilGroup_service extends StencilGroup_base {
  constructor(services: string[]) {
    super();
    this.titles = services;
    this.groupName = "讯飞服务";
    this.Component = ServiceNode;
    this.init("service");
  }
}

//========= Styled Component ===========
const ServiceNode = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid lightgrey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
