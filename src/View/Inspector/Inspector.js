import { Form, Input, InputNumber, Menu, Radio } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

const { SubMenu } = Menu;

export default function Inspector() {
	const [radioValue, setRadioValue] = useState("合并通行(JoinAll)");
	const plainOptions = ["合并通行(JoinAll)", "最快通行(JoinOne)"];

	const onChange = (evt) => {
		setRadioValue(evt.target.value);
	}

	return(
		<InspectorDIV>
			<Header>关系配置</Header>
			<Menu
        defaultOpenKeys={['pass','route']}
        mode="inline"
			>
				<FORM initialValues={{"nodeName": "并行节点1"}}>
					<Form.Item label="节点名称" name="nodeName">
						<Input placeholder="请填写节点名称"></Input>
					</Form.Item>
				</FORM>

				<SubMenu key="pass" title="通行" icon={<DownOutlined />}>
					<FORM>
						<Form.Item label="通行方式">
							<Radio.Group
								options={plainOptions}
								onChange={onChange}
								value={radioValue}
								optionType="button"
								buttonStyle="solid"
							/>
						</Form.Item>
					</FORM>
				</SubMenu>

				<SubMenu key="route" title="路线" icon={<DownOutlined />}>
					<FORM initialValues={{"routeNum": 2}}>
						<Form.Item label="线路数" name="routeNum" >
							<InputNumber min={2}/>
						</Form.Item>
					</FORM>
				</SubMenu>
			</Menu>

		</InspectorDIV>

	);
}

//============= Styled Components ===============
const InspectorDIV = styled.div`
	width: 400px;
	height: 700px;
	border: 1px solid lightgrey;
`;

const Header = styled.div`
	height: 45px;
	padding: 10px 20px;
	border-bottom: 1px solid lightgrey;
`;

const FORM = styled(Form)`
	padding: 4px 16px;
	background: white;
`;