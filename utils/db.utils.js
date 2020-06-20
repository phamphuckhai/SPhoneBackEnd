import { sequelize } from "../models";
export const createTransaction = async function (
  func = async () => {},
  showLogs = false
) {
  try {
    const result = await sequelize.transaction(async (t) => {
      return await func(t);
    });
  } catch (error) {
    if (showLogs) console.log(error);
    return undefined;
  }
};
