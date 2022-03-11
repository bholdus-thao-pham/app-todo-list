import { FIRE_BASE_URL } from "../utils/const";
import User from "../models/user";

const getAllUser = async (): Promise<User[]> => {
  console.log("Call API get all user");
  const response = await fetch(`${FIRE_BASE_URL}/users.json`);
  const data = await response.json();
  const convertedUsers = [] as User[];
  for (let id in data) {
    convertedUsers.push({
      id: id,
      ...data[id],
    });
  }
  return convertedUsers;
};

const userApi = {
  getAllUser,
};

export default userApi;
