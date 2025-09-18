import { getUserInfoMapper } from "../../mappers/userMapper";
import { UserMock } from "../mocks/userMock";

export const userStub = getUserInfoMapper(UserMock)
module.exports = {
  userStub
}