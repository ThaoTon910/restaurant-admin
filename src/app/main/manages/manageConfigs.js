import StoreConfig from './stores/StoreConfig';
import CategoryConfig from './categories/categoryConfig';
import FuseUtils from '../../../@fuse/utils';
import { authRoles } from '../../auth';

const manageConfigs = [StoreConfig, CategoryConfig];

export default FuseUtils.addAuthToConfigs(manageConfigs, authRoles.staff);
