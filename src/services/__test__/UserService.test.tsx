import { UserMock } from "../mocks/userMock";
import { getUserInfo } from "../UserService";
import { userStub } from "../stubs/userMapperStub";

const MockFetch = (data: any, status = 200, ok = true) => {
    const fn = jest.fn().mockImplementationOnce(() => {
        const response = {
            ok,
            status,
            json: () => Promise.resolve(data)
        };
        return Promise.resolve(response)
    });
    global.fetch = fn;
    return fn
}

describe("Prueba Unitaria: UserService", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });
    afterEach(() => {
        jest.resetModules();
        global.fetch = fetch;
    })
    it("Retorno de un usuario correctamente", async () => {
        MockFetch(UserMock);
        const accessToken = "accesoNecesario"
        const user = await getUserInfo(accessToken);
        expect(user).toBeDefined();
        expect(user).toEqual(userStub)
    })
    it("Error cuando la API responde diferente a 200", async () => {
        MockFetch({}, 401, false);
        const accessToken = "tokenInvalido"
        const userPromise =  getUserInfo(accessToken);
        await expect(userPromise).rejects.toThrow(
            "Algo salió mal, inténtelo más tarde"
        );
    });
})