import CategoryConfig from './menu/categoryConfig';
import FuseUtils from '../../../@fuse/utils';
import { authRoles } from '../../auth';

const manageConfigs = [CategoryConfig];

export default FuseUtils.addAuthToConfigs(manageConfigs, authRoles.staff);
