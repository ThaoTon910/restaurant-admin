import LoginConfig from 'app/main/auth/login/LoginConfig';
import LogoutConfig from 'app/main/auth/logout/LogoutConfig';
import RegisterConfig from 'app/main/auth/register/RegisterConfig';
import VerifyCodeConfig from 'app/main/auth/verifyCode/VerifyCodeConfig';
import ResetPasswordConfig from './resetPassword/ResetPasswordConfig';
import NewPasswordConfig from './newPassword/NewPasswordConfig';

const authConfigs = [
	LoginConfig,
	LogoutConfig,
	RegisterConfig,
	VerifyCodeConfig,
	ResetPasswordConfig,
	NewPasswordConfig
];

export default authConfigs;
