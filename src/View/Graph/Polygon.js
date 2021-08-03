import styled from "styled-components";

export default function Polygon({fillColor, strokeColor, strokeWidth, children}) {
	return (
		<PolygonBox>
			<svg width="100%" height="100%" viewBox="0 0 111 44">
				<g transform="matrix(1,0,0,1,-386.202,-492.831)">
					<g transform="matrix(1,0,0,1.07965,3.97193,-33.3985)">
						<path d="M402.079,526.733L383.272,507.553L402.079,488.373L472.937,488.373L491.744,507.553L472.937,526.733L402.079,526.733Z" style={{fill: fillColor, stroke:strokeColor, strokeWidth:strokeWidth}}/>
					</g>
				</g>
			</svg>
			<PolygonTitle>{children}</PolygonTitle>
		</PolygonBox>
	);
}

//========== Styled Components ==========
const PolygonBox = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PolygonTitle = styled.span`
	position: absolute;
`;
