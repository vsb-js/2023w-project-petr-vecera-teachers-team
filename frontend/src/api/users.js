import { API_URL } from "../config";

const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();

  return users;
};

export { getUsers };
