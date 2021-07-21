import ContactsAppConfig from './staffs/ContactsAppConfig';
import StoreConfig from './stores/StoreConfig';

import FuseUtils from '../../../@fuse/utils';
import { authRoles } from '../../auth';

const manageConfigs = [StoreConfig];

export default FuseUtils.addAuthToConfigs(manageConfigs, authRoles.staff);
