import GraphEditor from "./GraphEditor";

export default function App() {
  return <GraphEditor 
    relations={["并行节点", "条件节点"]} 
    services={["人脸相关能力", "text_lang", "文本校对", "IFOCR", "测试自定义用例"]} 
  />
}