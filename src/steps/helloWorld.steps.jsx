import React from "react";
import { render, screen } from "@testing-library/react";
import { HelloWorld } from "../components/HelloWorld.jsx";
// import "@testing-library/jest-dom/extend-expect";
// import "@testing-library/jest-dom/vitest";
// import "@testing-library/jest-dom";
import { expect } from "vitest";

export const helloWorldSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then,
}) => {
  Given(/^Hello World$/, () => {
    console.log(
      "Hello World-----------------------------------------------------"
    );
    render(<HelloWorld />);
  });
  Then(/^I should see "([^"]*)"$/, (text) => {
    const helloWorld = screen.getByTestId("helloWorldSteps");
    expect(helloWorld).toHaveTextContent(text);
  });
};
export default helloWorldSteps;
