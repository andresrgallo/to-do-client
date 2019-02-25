import React from 'react';

const ResetMessage = () => {
	return (
		<div class="row">
			<div
				class="col s12 m8 l6 offset-m2 offset-l3"
				style={{ marginTop: '2.8rem' }}
			>
				<div class="card horizontal">
					<div class="card-stacked">
						<div class="card-content">
							<p style={{ fontSize: '20px', color: 'rgba(50, 51, 78, 0.87)' }}>
								A new temporary password will be sent to your email account.
								After following instructions and when you are logged in, please
								remember to change the password to one that suits you by
								clicking "Profile" at the navigation bar.
							</p>
						</div>
						<div class="card-action">
							<a href="/reset-password">Reset Password</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetMessage;
