import { ReactShape } from "@antv/x6-react-shape";

export default class StencilGroup_base {
  titles: string[];
  groupName: string;
  Component: any;
  nodes: string[];

  constructor() {
    this.titles = [];
    this.groupName = "";
    this.Component = <></>;
    this.nodes = [];
  }

  // create different nodes by title
  init(group: string) {
    for (let i = 0; i < this.titles.length; i++) {
      const title = this.titles[i];
      const node: any = new ReactShape({
        width: 170,
        height: 35,
        data: {title, group},
        shape: "react-shape", //*  !!!!  *//
        component: <this.Component>{title}</this.Component>
      });
      this.nodes.push(node);
    }
  }

  // 模板节点添加到指定的群组中
  load(stencil: any) {
    stencil.load(this.nodes, this.groupName);
  }
}
