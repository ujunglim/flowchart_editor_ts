import styled from "styled-components";
import StencilGroup_base from "./StencilGroup_base";

export default class StencilGroup_service extends StencilGroup_base {
  constructor() {
    super();
    this.titles = [
      "人脸相关能力",
      "text_lang",
      "文本校对",
      "IFOCR",
      "测试自定义用例"
    ];
    this.groupName = "讯飞服务";
    this.Component = ServiceNode;
    this.init();
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
