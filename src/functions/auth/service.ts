import { DatabaseManager } from "@libs/index";
import { User } from "@entities/index";

export const getUser = async (email: string): Promise<User> => {
  const manager = await DatabaseManager.getManager();
  const user = await manager.findOne(User, { where: { email } });

  return user;
};

export const saveUser = async (email: string, hashedPassword: string, name): Promise<void> => {
  const manager = await DatabaseManager.getManager();
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  await manager.save(user);
}