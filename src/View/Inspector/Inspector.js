import { DownOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import styled from "styled-components";

const { SubMenu } = Menu;

export default function Inspector() {

	const onClick = () => console.log("click dropdown")

	return(
		<InspectorDIV>
			<Header>关系配置</Header>
			<Menu
				onClick={onClick}
        style={{ padding: "5px", background: "pink" }}
        defaultOpenKeys={['路线']}
        mode="inline"
			>
				<SubMenu key="路线" title="路线" icon={<DownOutlined />}>

					<div style={{dispay: "flex", flexDirection: "row", background: "coral"}}>
						<Menu.Item>线路数:</Menu.Item>
						<input type="text"></input>
					</div>
					
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
