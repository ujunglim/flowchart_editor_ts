import { Form, Input, InputNumber, Menu, Radio } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { connect } from "react-redux";
import store from "../../Redux/reducer";

const { SubMenu } = Menu;

function Inspector(props) {
	const [radioValue, setRadioValue] = useState("合并通行(JoinAll)");
	const plainOptions = ["合并通行(JoinAll)", "最快通行(JoinOne)"];

	// console.log(props.state)

	const onChangeRadio = (evt) => {
		setRadioValue(evt.target.value);
	}

	let routeNum = store.getState().routeNum;

	const onChangeInput = (value) => {
		// compare previous routeNum, current routeNum
		if(routeNum < value) {
			store.dispatch({type: "PLUS"});
		}
		else if(routeNum > value) {
			store.dispatch({type: "MINUS"});
		}
		routeNum = value;
	}

	return(
		<InspectorDIV>
			<Header>关系配置</Header>
			<Menu
        defaultOpenKeys={['sub_pass','sub_route']}
        mode="inline"
			>
				{/* <FORM initialValues={{"nodeName": "并行节点1"}}>
					<Form.Item label="节点名称" name="nodeName">
						<Input placeholder="请填写节点名称"></Input>
					</Form.Item>
				</FORM>

				<SubMenu key="sub_pass" title="通行" icon={<DownOutlined />}>
					<FORM>
						<Form.Item label="通行方式">
							<Radio.Group
								options={plainOptions}
								onChange={onChangeRadio}
								value={radioValue}
								optionType="button"
								buttonStyle="solid"
							/>
						</Form.Item>
					</FORM>
				</SubMenu> */}

				<SubMenu key="sub_route" title="路线" icon={<DownOutlined />}>
					<Menu.Item key="route">
						线路数:
						<InputNumber min={2} defaultValue={2} onChange={onChangeInput}/>
					</Menu.Item>
				</SubMenu>
			
			</Menu>

		</InspectorDIV>

	);
}

// get current state from store
function getCurrentState(state, ownProps) {
	// console.log(state, ownProps);
	return {state};
}

// get state from store, then give to Inspector component
export default connect(getCurrentState)(Inspector);


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