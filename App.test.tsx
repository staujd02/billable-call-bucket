import { shallow } from "enzyme"
import React from "react";
import App from "./App";

describe("I can test things", () => {
    it("can test stuff too", () => {
        const app = shallow(<App />);
        expect(app.first().first().text()).toEqual("Open up App.tsx to start working on your app!");
    })
})