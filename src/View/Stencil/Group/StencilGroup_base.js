import { ReactShape } from "@antv/x6-react-shape";

export default class StencilGroup_base {
  constructor() {
    this.titles = [];
    this.groupName = "";
    this.Component = <></>;
  }

  // create different nodes by title
  init() {
    this.nodes = [];
    for (let i = 0; i < this.titles.length; i++) {
      const title = this.titles[i];
      const node = new ReactShape({
        width: 170,
        height: 35,
        shape: "react-shape", //*  !!!!  *//
        component: <this.Component>{title}</this.Component>
      });
      this.nodes.push(node);
    }
  }

  // 模板节点添加到指定的群组中
  load(stencil) {
    stencil.load(this.nodes, this.groupName);
  }
}
