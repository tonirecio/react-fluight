interface EmissionsBreakdownTableProps {
  averageEmissions: number | null;
  currentEmissions: number | null;
  testId?: string;
}

export default function EmissionsBreakdownTable({
  averageEmissions,
  currentEmissions,
  testId = "emissions-breakdown-table",
}: EmissionsBreakdownTableProps): JSX.Element {
  const allDataValid =
    (currentEmissions !== null && currentEmissions > 0) ||
    (averageEmissions !== null && averageEmissions > 0);
  let isHilighted = false;

  const getTitle = (): { variable: string; fixed: string } => {
    const title = { variable: "", fixed: "Emissions" };
    if (!validCurrentEmissions || !validAverageEmissions) {
      if (validCurrentEmissions) title.variable = "Current";
      if (validAverageEmissions) title.variable = "Average";
    } else {
      if (averageEmissions === currentEmissions) title.variable = "Typical";
      if (averageEmissions > currentEmissions) title.variable = "Lower";
      if (averageEmissions < currentEmissions) title.variable = "Higher";
    }
    if (title.variable === "Lower") isHilighted = true;

    return title;
  };

  const validCurrentEmissions =
    currentEmissions !== null && currentEmissions > 0;
  const validAverageEmissions =
    averageEmissions !== null && averageEmissions > 0;

  const getDifference = (): string => {
    if (allDataValid) {
      const difference =
        (currentEmissions as number) - (averageEmissions as number);
      const formattedDifference = parseFloat(difference.toFixed(2)); // so that .00 are not shown and numbers are rounded to 2 decimals

      return formattedDifference > 0
        ? `+${formattedDifference}`
        : `${formattedDifference}`;
    }
    return "0";
  };

  const getPercentage = (): string => {
    if (allDataValid) {
      const difference =
        (((currentEmissions as number) - (averageEmissions as number)) /
          (averageEmissions as number)) *
        100;
      let formattedDifference: string; // so that .00 are not shown and numbers are rounded to 2 decimals
      if (difference > 0) {
        formattedDifference = `${parseFloat(difference.toFixed(2))}% higher`;
      } else if (difference < 0) {
        formattedDifference = `${parseFloat(
          Math.abs(difference).toFixed(2)
        )}% lower`;
      } else {
        return "0% typical";
      }

      return formattedDifference;
    }
    return "";
  };

  const formatNumber = (number: number): string => {
    const num: number = Number(number);
    const formatedNumber: string = `${num.toFixed(2)}`;
    if (formatedNumber.endsWith(".00")) return formatedNumber.slice(0, -3);
    return formatedNumber;
  };

  const emissionsDifference = getDifference();
  const emissionsPercentageText = getPercentage();
  const tableTitle = getTitle();

  const getAltText = (): JSX.Element => (
    <p data-testid="emissions-alternative-text">
      Emissions are not available for this flight
    </p>
  );
  const getTable = (): JSX.Element => {
    return (
      <div data-testid={testId}>
        <table data-testid="emissions-table">
          <caption data-testid="emissions-table-title">
            <div
              highlightColor={isHilighted}
              data-testid="emissions-table-variable-title"
            >
              {tableTitle.variable}
            </div>{" "}
            {tableTitle.fixed}
          </caption>
          <tbody>
            {validCurrentEmissions && (
              <tr
                data-testid="emissions-table-rows"
                data-row-name="currentEmissionsRow"
              >
                <td data-testid="emissions-table-row1-column1">This journey</td>
                <td data-testid="emissions-table-row1-column2">
                  <EmissionsHighlightColorComponent
                    highlightColor={isHilighted}
                    data-testid="emissions-table-variable-emissions"
                  >
                    <span className="co2-text">
                      {formatNumber(currentEmissions)} kg CO<sub>2</sub>
                    </span>
                  </EmissionsHighlightColorComponent>
                </td>
              </tr>
            )}
            {validAverageEmissions && (
              <tr
                data-testid="emissions-table-rows"
                data-row-name="averageEmissionsRow"
              >
                <td data-testid="emissions-table-row2-column1">
                  Typical for this route
                </td>
                <td data-testid="emissions-table-row2-column2">
                  <span className="co2-text">
                    {formatNumber(averageEmissions)} kg CO<sub>2</sub>
                  </span>
                </td>
              </tr>
            )}
            {validAverageEmissions && validCurrentEmissions && (
              <tr data-testid="emissions-table-rows">
                <td data-testid="emissions-table-percentage-msg">
                  {emissionsPercentageText}
                </td>
                <td data-testid="emissions-table-difference-msg">
                  <span className="co2-text">
                    {emissionsDifference} kg CO<sub>2</sub>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <p data-testid="emissions-table-caption">
          Emissions are calculated for 1 passanger in this class
        </p>
      </div>
    );
  };

  return <div>{allDataValid ? getTable() : getAltText()}</div>;
}
