Feature: Emissions Breakdown
	
	- I want to see the breakdown of the flight emissions
	- So i need to see:
		- The table title, and if its higher, lower or same (typical) compared to the average emissions
		- The selected flight emissions on the first row
		- The typical emissions for the route on the second row
		- Percentage of higher/lower emissions between the selected flight and typical emissions on the third row, left column
		- The difference of emissions between the selected flight and typical emissions on the third row, right column
		- A caption under the table indicating the number of passengers used for collecting the emissions

Scenario Outline: Not receiving valid emissions props - Displaying alternative text 
	Given the props provided are <averageEmissions> and <currentEmissions> 
	When the component is rendered
	Then the emissions component should not show the table
	And the emissions component should show the text "Emissions are not available for this flight"

	Examples:
	| averageEmissions | currentEmissions |
	|         	    0  |       	       0  |
	|    			   null  |       	       0  |
	|         	    0  |      		  null  |
	|    			   null  |      		  null  |


Scenario Outline: Receiving one valid emission prop - Displaying only valid emission row
	Given the props provided are <averageEmissions> and <currentEmissions> 
	When the component is rendered
	Then the table should only show <displayedRow>
	And the table title should show <tableTitle>

	Examples:
	| averageEmissions | currentEmissions |				 displayedRow |				 tableTitle |
	|             250  |               0  | averageEmissionsRow |	Average Emissions |
	|               0  |             423  | currentEmissionsRow | Current Emissions |
	|             250  |    		    null  | averageEmissionsRow |	Average Emissions |
	|   		     null  |             423  | currentEmissionsRow | Current Emissions |
	

Scenario: Receiving valid emissions props - Displaying default table text
		Given the props provided are both valid
		When the component is rendered
		Then the first row, left column should show "This journey"
		And the second row, left column should show "Typical for this route"
		And the table caption should show "Emissions are calculated for 1 passanger in this class"


Scenario Outline: Receiving valid emissions props - Displaying recieved props
	Given the props provided are <averageEmissions> and <currentEmissions> 
	When the component is rendered
	Then the typical route row right column should show <averageEmissionsText>
	And the journey emissions row right column should show <journeyEmissionsText>
	And if the <averageEmissions> is higher than <currentEmissions> the journeyEmissionsText should be highlighted

		Examples:
	| averageEmissions | currentEmissions | averageEmissionsText | journeyEmissionsText |
	|        	    415  |       	     423  |				  	415 kg CO2 |           423 kg CO2 |
	|      130.123343  |       160.67793  |				 130.12 kg CO2 | 				160.68 kg CO2 |
	|        	   12.3  |         		 9.1  |				 	12.30 kg CO2 |					9.10 kg CO2 |


Scenario Outline: Receiving valid emission props - Displaying table title 
	Given the props provided are <averageEmissions> and <currentEmissions> 
	When the component is rendered
	Then the table title should show <tableTitle>
	And if the <averageEmissions> are higher than the <currentEmissions> the first word of the title should be highlighted

	Examples:
	| averageEmissions | currentEmissions | tableTitle       |
	|             415  |             423  |	Higher Emissions |
	|             250  |              10  |	Lower Emissions  |
	|             415  |             415  |	Typical Emissions|


Scenario Outline: Receiving valid emission props - Calculating and displaying emissions percentage
	Given the props provided are <averageEmissions> and <currentEmissions> 
	When the component is rendered
	Then the percentage difference between the flight emissions and average emissions should be displayed as <calculatedPercentageText>

	Examples:
	| averageEmissions | currentEmissions |calculatedPercentageText|
	|             415  |             423  |					  1.93% higher |	
	|             250  |              10  |							 96% lower |	
	|             250  |             250  |						  0% typical |	


Scenario Outline: Receiving valid emission props - Calculating and displaying emissions difference
	Given the props provided are <averageEmissions> and <currentEmissions> 
	When the component is rendered
	Then the difference between the flight emissions and average emissions should be displayed as <calculatedDifferenceText>

	Examples:
	| averageEmissions | currentEmissions | calculatedDifferenceText    |
	|             415  |             423  | 									+8 kg CO2 |	
	|             250  |              10  | 								-240 kg CO2 |	
	|             250  |             250  | 									 0 kg CO2 |	

