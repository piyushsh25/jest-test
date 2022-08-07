import getUser from "./user";
import * as axios from "axios";

jest.mock("axios");

describe("get user service", () => {

    test("should return user when API call is successful", async () => {
        axios.get.mockResolvedValue({
            data: {
                name: "Piyush",
                age: 20,
            }
        })
        const user = await getUser()
        expect(user).toEqual({
            name: "Piyush",
            age: 20
        });

    });

});