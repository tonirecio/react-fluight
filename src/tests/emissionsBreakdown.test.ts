import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { expect } from "vitest";
import * as steps from "../steps/emissionsBreakdown.steps";

const feature = await loadFeature("./src/features/emissionsBreakdown.feature");

let mockData: {
  averageEmissions: number | null;
  currentEmissions: number | null;
};

describeFeature(
  feature,
  ({
    BeforeAllScenarios,
    AfterAllScenarios,
    BeforeEachScenario,
    AfterEachScenario,
    ScenarioOutline,
    Scenario,
  }) => {
    BeforeAllScenarios(() => {});
    AfterAllScenarios(() => {});
    BeforeEachScenario(() => {
      mockData = { averageEmissions: 0, currentEmissions: 0 };
    });
    AfterEachScenario(() => {});

    ScenarioOutline(
      `Not receiving valid emissions props - Displaying alternative text`,
      ({ Given, When, Then, And }, variables) => {
        Given(
          `the props provided are <averageEmissions> and <currentEmissions>`,
          () => {
            mockData = {
              averageEmissions: variables.averageEmissions,
              currentEmissions: variables.currentEmissions,
            };
          }
        );
        When(`the component is rendered`, () => {
          steps.renderBreakdownEmissions(
            mockData.averageEmissions,
            mockData.currentEmissions
          );
        });
        Then(`the emissions component should not show the table`, () => {
          expect(steps.checkEmissionsTable()).toBe(false);
        });
        And(
          `the emissions component should show the text "Emissions are not available for this flight"`,
          () => {
            expect(
              steps.checkAlternativeText(
                "Emissions are not available for this flight"
              )
            ).toBe(true);
          }
        );
      }
    );

    ScenarioOutline(
      `Receiving one valid emission prop - Displaying only valid emission row`,
      ({ Given, When, Then, And }, variables) => {
        Given(
          `the props provided are <averageEmissions> and <currentEmissions>`,
          () => {
            mockData = {
              averageEmissions: variables.averageEmissions,
              currentEmissions: variables.currentEmissions,
            };
          }
        );
        When(`the component is rendered`, () => {
          steps.renderBreakdownEmissions(
            mockData.averageEmissions,
            mockData.currentEmissions
          );
        });
        Then(`the table should only show <displayedRow>`, () => {
          expect(steps.checkOnlyDisplayedRow(variables.displayedRow)).toBe(
            true
          );
        });
        And(`the table title should show <tableTitle>`, () => {
          expect(steps.checkEmissionsTitle(variables.tableTitle)).toBe(true);
        });
      }
    );

    Scenario(
      `Receiving valid emissions props - Displaying default table text`,
      ({ Given, When, Then, And }) => {
        Given(`the props provided are both valid`, () => {
          mockData = { averageEmissions: 123, currentEmissions: 123 };
        });
        When(`the component is rendered`, () => {
          steps.renderBreakdownEmissions(
            mockData.averageEmissions,
            mockData.currentEmissions
          );
        });
        Then(`the first row, left column should show "This journey"`, () => {
          expect(
            steps.checkRowDefaultText("first", "left", "This journey")
          ).toBe(true);
        });
        And(
          `the second row, left column should show "Typical for this route"`,
          () => {
            expect(
              steps.checkRowDefaultText(
                "second",
                "left",
                "Typical for this route"
              )
            ).toBe(true);
          }
        );
        And(
          `the table caption should show "Emissions are calculated for 1 passanger in this class"`,
          () => {
            expect(
              steps.checkTableCaption(
                "Emissions are calculated for 1 passanger in this class"
              )
            ).toBe(true);
          }
        );
      }
    );

    ScenarioOutline(
      `Receiving valid emissions props - Displaying recieved props`,
      ({ Given, When, Then, And }, variables) => {
        Given(
          `the props provided are <averageEmissions> and <currentEmissions>`,
          () => {
            mockData = {
              averageEmissions: variables.averageEmissions,
              currentEmissions: variables.currentEmissions,
            };
          }
        );
        When(`the component is rendered`, () => {
          steps.renderBreakdownEmissions(
            mockData.averageEmissions,
            mockData.currentEmissions
          );
        });
        Then(
          `the typical route row right column should show <averageEmissionsText>`,
          () => {
            expect(
              steps.checkRowDefaultText(
                "second",
                "right",
                variables.averageEmissionsText
              )
            ).toBe(true);
          }
        );
        And(
          `the journey emissions row right column should show <journeyEmissionsText>`,
          () => {
            expect(
              steps.checkRowDefaultText(
                "first",
                "right",
                variables.journeyEmissionsText
              )
            ).toBe(true);
          }
        );
        And(
          `if the <averageEmissions> is higher than <currentEmissions> the journeyEmissionsText should be highlighted`,
          () => {
            if (variables.averageEmissions > variables.currentEmissions) {
              expect(
                steps.getElementByDataTestId(
                  "emissions-table-variable-emissions"
                )
              ).toHaveStyleRule("color", "#409e4f");
            } else {
              expect(
                steps.getElementByDataTestId("emissions-table-variable-title")
              ).toHaveStyleRule("color", "#000000");
            }
          }
        );
      }
    );

    ScenarioOutline(
      `Receiving valid emission props - Displaying table title`,
      ({ Given, When, Then, And }, variables) => {
        Given(
          `the props provided are <averageEmissions> and <currentEmissions>`,
          () => {
            mockData = {
              averageEmissions: variables.averageEmissions,
              currentEmissions: ariables.currentEmissions,
            };
          }
        );
        When(`the component is rendered`, () => {
          steps.renderBreakdownEmissions(
            mockData.averageEmissions,
            mockData.currentEmissions
          );
        });
        Then(`the table title should show <tableTitle>`, () => {
          expect(steps.checkEmissionsTitle(variables.tableTitle)).toBe(true);
        });
        And(
          `if the <averageEmissions> are higher than the <currentEmissions> the first word of the title should be highlighted`,
          () => {
            if (variables.averageEmissions > variables.currentEmissions) {
              expect(
                steps.getElementByDataTestId("emissions-table-variable-title")
              ).toHaveStyleRule("color", "#409e4f");
            } else {
              expect(
                steps.getElementByDataTestId("emissions-table-variable-title")
              ).toHaveStyleRule("color", "#000000");
            }
          }
        );
      }
    );

    ScenarioOutline(
      `Receiving valid emission props - Calculating and displaying emissions percentage`,
      ({ Given, When, Then }, variables) => {
        Given(
          `the props provided are <averageEmissions> and <currentEmissions>`,
          () => {
            const avgPer = variables.averageEmissions;
            const curPer = variables.currentEmissions;
            mockData = {
              averageEmissions: avgPer,
              currentEmissions: curPer,
            };
          }
        );
        When(`the component is rendered`, () => {
          steps.renderBreakdownEmissions(
            mockData.averageEmissions,
            mockData.currentEmissions
          );
        });
        Then(
          `the percentage difference between the flight emissions and average emissions should be displayed as <calculatedPercentageText>`,
          () => {
            expect(
              steps.checkCalculatedPercentageText(
                variables.calculatedPercentageText
              )
            ).toBe(true);
          }
        );
      }
    );
    ScenarioOutline(
      `Receiving valid emission props - Calculating and displaying emissions difference`,
      ({ Given, When, Then }, variables) => {
        Given(
          `the props provided are <averageEmissions> and <currentEmissions>`,
          () => {
            mockData = {
              averageEmissions: variables.averageEmissions,
              currentEmissions: variables.currentEmissions,
            };
          }
        );
        When(`the component is rendered`, () => {
          steps.renderBreakdownEmissions(
            mockData.averageEmissions,
            mockData.currentEmissions
          );
        });
        Then(
          `the difference between the flight emissions and average emissions should be displayed as <calculatedDifferenceText>`,
          () => {
            expect(
              steps.checkCalculatedDifferenceText(
                variables.calculatedDifferenceText
              )
            ).toBe(true);
          }
        );
      }
    );
  }
);
