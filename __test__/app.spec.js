import { getGeonamesData } from '../src/client/js/app'

describe("getGeonamesData handles city names", () => {
    test("function exists", () => {
        expect(getGeonamesData).toBeDefined();
    });
});