import MenuConfig from './menu/menuConfig';
import FuseUtils from '../../../@fuse/utils';
import { authRoles } from '../../auth';

const manageConfigs = [MenuConfig];

export default FuseUtils.addAuthToConfigs(manageConfigs, authRoles.staff);
