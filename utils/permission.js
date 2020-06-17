import grants from "../config/permission.json";
import { AccessControl } from "role-acl";

const accessControl = new AccessControl(grants);

export const authorize = (action, resource) => {
  return (req, res, next) => {
    const { role } = req.user;
    const canAccess = accessControl
      .can(role)
      .execute(action)
      .sync()
      .on(resource).granted;
    if (canAccess) next();
    else {
      res.sendStatus(401);
    }
  };
};

export function getPermissions() {
  return grants;
}
