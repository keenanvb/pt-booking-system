import React, { Fragment } from 'react';

const Footer = (props) => {
	return (
		<Fragment>
			<div className="footer-container">
				<div className="footer-line"></div>
				<div className="footer-text">
					<div className="tag">2020</div>
					<div className="footer-social">
						<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
							<i style={{ color: '#fb3958' }} className="fab fa-instagram fa-2x" />
						</a>
						<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
							<i style={{ color: '#0e76a8' }} className="fab fa-linkedin fa-2x" />
						</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Footer.propTypes = {};

export default Footer;
