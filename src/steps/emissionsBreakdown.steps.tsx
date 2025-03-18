import EmissionsBreakdownTable from "../components/EmissionsBreakdownTable";
import { render, screen } from "@testing-library/react";

export function renderBreakdownEmissions(
  averageEmissions: number | null,
  currentEmissions: number | null
): void {
  render(
    <EmissionsBreakdownTable
      averageEmissions={averageEmissions}
      currentEmissions={currentEmissions}
    />
  );
}

export function checkEmissionsTitle(emissionsTitleExpected: string): boolean {
  const emissionsTitle = screen.getByTestId("emissions-table-title");
  return emissionsTitle.textContent === emissionsTitleExpected;
}

export function checkEmissionPercentage(
  percentageMessageExpected: string
): boolean {
  const emissionsPercentage = screen.getByTestId(
    "emissions-table-percentage-msg",
    { exact: false }
  );
  return (
    emissionsPercentage.textContent?.toLowerCase() ===
    percentageMessageExpected.toLowerCase()
  );
}

export function checkDifferenceMessage(
  differenceMessageExpected: string
): boolean {
  const differenceMessage = screen.getByTestId(
    "emissions-table-difference-msg",
    { exact: false }
  );
  return (
    differenceMessage.textContent?.toLowerCase() ===
    differenceMessageExpected.toLowerCase()
  );
}

export function checkEmissionsTable(): boolean {
  if (screen.queryByTestId("emissions-table") === null) return false;
  else return true;
}

export function checkAlternativeText(alternativeTextExpected: string): boolean {
  const alternativeText = screen.queryByTestId("emissions-alternative-text");
  if (alternativeText == null) return false;
  return alternativeText.textContent === alternativeTextExpected;
}

export function checkRowDefaultText(
  row: string,
  column: string,
  expectedText: string
): boolean {
  let selectedColumn: HTMLElement | null = null;
  if (row === "first" && column === "right")
    selectedColumn = screen.queryByTestId("emissions-table-row1-column2");
  else if (row === "first" && column === "left")
    selectedColumn = screen.queryByTestId("emissions-table-row1-column1", {
      exact: true,
    });
  else if (row === "second" && column === "right")
    selectedColumn = screen.queryByTestId("emissions-table-row2-column2");
  else if (row === "second" && column === "left")
    selectedColumn = screen.queryByTestId("emissions-table-row2-column1", {
      exact: true,
    });

  if (selectedColumn == null || selectedColumn.textContent !== expectedText)
    return false;
  else return true;
}

export function checkOnlyDisplayedRow(rowName: string): boolean {
  const rows = screen.getAllByTestId("emissions-table-rows");
  let validRow = false;
  rows.forEach((row) => {
    if (row.getAttribute("data-row-name") === rowName) validRow = true;
  });
  return validRow;
}

export function checkCalculatedPercentageText(expectedText: string): boolean {
  const percentageText = screen.getByTestId("emissions-table-percentage-msg");
  if (percentageText.textContent !== expectedText) return false;
  else return true;
}

export function checkCalculatedDifferenceText(expectedText: string): boolean {
  const percentageText = screen.getByTestId("emissions-table-difference-msg");
  if (percentageText.textContent !== expectedText) return false;
  else return true;
}

export function checkTableCaption(expectedCaption: string): boolean {
  const tableCaption = screen.queryByTestId("emissions-table-caption");
  if (tableCaption == null || tableCaption.textContent !== expectedCaption)
    return false;
  else return true;
}

export function checkElementColour(
  elementTestId: string,
  colour: string
): boolean {
  const selectedElement = screen.queryByTestId(elementTestId);
  if (selectedElement == null || selectedElement.style.color !== colour)
    return false;
  else return true;
}

export function getElementByDataTestId(elementName: string): Element | null {
  const selectedElement = screen.queryByTestId(elementName);
  return selectedElement;
}
