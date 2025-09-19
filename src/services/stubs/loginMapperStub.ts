import { loginMapper } from "../../mappers/loginMapper";
import { AuthMock } from "../mocks/authMock";

export const authStub = loginMapper(AuthMock);
