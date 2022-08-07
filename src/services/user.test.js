import getUser from "./user";
import * as axios from "axios";

jest.mock("axios");

describe("get user service", () => {
    beforeAll(() => console.log('1 - beforeAll'));
    afterAll(() => console.log('1 - afterAll'));
    beforeEach(() => console.log('1 - beforeEach'));
    afterEach(() => console.log('1 - afterEach'));
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
    test("should return error on API fail", async () => {
        axios.get.mockRejectedValue({ isAxiosError: true, response: { data: { errorMessage: "NOT FOUND" } } })
        axios.isAxiosError.mockImplementation((payload) => true)
        const user = await getUser();
        expect(user).toEqual({ errorMessage: "NOT FOUND" });
        // expect(axios.isAxiosError).toBeCalledTimes(1)
    })
    test("should return program fail", async () => {
        axios.get.mockRejectedValue({ isAxiosError: false, errorMessage: "something went wrong!" })
        axios.isAxiosError.mockImplementation(() => false)
        const user = await getUser()
        expect(user).toEqual({ errorMessage: "something went wrong!" });
    })
});
// // // // // // // // // // // // // // // // // // // // //
// order of execution
// beforeAll(() => console.log('1 - beforeAll'));
// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));

// test('', () => console.log('1 - test'));

// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));

//   test('', () => console.log('2 - test'));
// });

//  // // // // answer // // // //
// 1-beforeAll
// 1-beforeEach
// 1-test
// 1-afterEach
// 2-beforeAll
// 1-beforeEach
// 2-beforeEach
// 2-test
// 2-afterEach
// 1-afterEach
// 2-afterAll
// 1-afterAll