import styled from 'styled-components';

const h2Style = styled.h2`
	@media (max-width: 992px) {
		font-size: 40px;
	}
	@media (max-width: 768px) {
		font-size: 35px;
	}
	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

const cardPanelStyle = styled.div`
	margin-top: 2.8rem;
`;

export { h2Style, cardPanelStyle };
