import grants from '../config/permission.json';
import {AccessControl} from 'role-acl';

const accessControl = new AccessControl(grants);

export const checkAccess = (role, action, resource, req, res, next) => {
    return (req, res, next) => {
        accessControl.can(role).execute(action).sync().on(resource);
    }
};

export function getPermissions() {
    return grants;
};