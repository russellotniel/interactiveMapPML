import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const markers = [
	{
		name: 'United States of America',
		coordinates: [-93.26, 44.29],
	},
	{
		name: 'Indonesia',
		coordinates: [110.26, -7.62],
	},
	{
		name: 'France',
		coordinates: [6.11, 45.89],
	},
	{
		name: 'Russia',
		coordinates: [70.78, 60.23],
	},
	{
		name: 'Australia',
		coordinates: [135.3, -25.42],
	},
];

const MapChart = ({ setTooltipContent }) => {
	return (
		<>
			<ComposableMap
				data-tip=''
				projectionConfig={{
					scale: 70,
					rotation: [-11, 0, 0],
				}}
				width={400}
				height={200}
				style={{ width: '100%', height: 'auto' }}
			>
				<Geographies geography='/features.json' disableOptimization>
					{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill='#EAEAEC' stroke='#D6D6DA' />)}
				</Geographies>
				{markers.map(({ name, coordinates }) => (
					<Marker
						key={name}
						coordinates={coordinates}
						onMouseEnter={() => {
							setTooltipContent(`${name}`);
						}}
						onMouseLeave={() => {
							setTooltipContent('');
						}}
					>
						<circle r={5} fill='#F00' stroke='#fff' strokeWidth={2}></circle>
					</Marker>
				))}
			</ComposableMap>
		</>
	);
};

export default memo(MapChart);
