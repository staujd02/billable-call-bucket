import { shallow } from "enzyme"
import React from "react";
import App from "./App";
import MainNavigation from "./MainNavigation";

describe("The App element", () => {
    it("contains the root navigation", () => {
        const app = shallow(<App />);
        expect(app.children().first()).toEqual(<MainNavigation />);
    })
})