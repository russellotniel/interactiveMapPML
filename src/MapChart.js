// import React, { memo } from 'react';
// import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';

// const markers = [
// 	{
// 		name: 'United States of America',
// 		coordinates: [-93.26, 44.29],
// 	},
// 	{
// 		name: 'Indonesia',
// 		coordinates: [110.26, -7.62],
// 	},
// 	{
// 		name: 'France',
// 		coordinates: [6.11, 45.89],
// 	},
// 	{
// 		name: 'Russia',
// 		coordinates: [70.78, 60.23],
// 	},
// 	{
// 		name: 'Australia',
// 		coordinates: [135.3, -25.42],
// 	},
// ];

// const MapChart = ({ setTooltipContent }) => {
// 	return (
// 		<>
// 			<ComposableMap
// 				data-tip=''
// 				projectionConfig={{
// 					scale: 70,
// 					rotation: [-11, 0, 0],
// 				}}
// 				width={400}
// 				height={200}
// 				style={{ width: '100%', height: 'auto' }}
// 			>
// 				<Geographies geography='/features.json' disableOptimization>
// 					{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill='#EAEAEC' stroke='#D6D6DA' />)}
// 				</Geographies>
// 				{markers.map(({ name, coordinates }) => (
// 					<Marker
// 						key={name}
// 						coordinates={coordinates}
// 						onMouseEnter={() => {
// 							setTooltipContent(`${name}`);
// 						}}
// 						onMouseLeave={() => {
// 							setTooltipContent('');
// 						}}
// 					>
// 						<circle r={5} fill='#F00' stroke='#fff' strokeWidth={2}></circle>
// 					</Marker>
// 				))}
// 				<Annotation
// 					subject={[2.3522, 48.8566]}
// 					dx={-90}
// 					dy={-30}
// 					connectorProps={{
// 						stroke: '#FF5533',
// 						strokeWidth: 3,
// 						strokeLinecap: 'round',
// 					}}
// 				>
// 					<text x='-8' textAnchor='end' alignmentBaseline='middle' fill='#F53'>
// 						{'Paris'}
// 					</text>
// 				</Annotation>
// 			</ComposableMap>
// 		</>
// 	);
// };

// export default memo(MapChart);

import React from 'react';
import { ComposableMap, Geographies, Geography, Annotation, ZoomableGroup, Marker } from 'react-simple-maps';

const marker = { markerOffset: -15, name: 'Paris', coordinates: [2.3522, 48.8566] };

const MapChart = () => {
	const [active, setActive] = React.useState(false);

	const toggleClass = () => {
		setActive(!active);
	}

	return (
		<ComposableMap
			projection='geoAzimuthalEqualArea'
			projectionConfig={{
				rotate: [-10.0, -52.0, 0],
				center: [-5, -3],
				scale: 1100,
			}}
		>
			<ZoomableGroup zoom={1}>
				<Geographies geography='/features.json' fill='#D6D6DA' stroke='#FFFFFF' strokeWidth={0.5}>
					{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}
				</Geographies>

				<Marker key={marker.name} coordinates={marker.coordinates} onClick={toggleClass}>
					<circle r={10} fill='F00' stroke='#fff' strokeWidth={2} />
				</Marker>
				{active && (
					<Annotation
						subject={[2.3522, 48.8566]}
						dx={0}
						dy={-90}
						connectorProps={{
							stroke: '#FF5533',
							strokeWidth: 3,
							strokeLinecap: 'round',
						}}
						className={active ? 'active' : 'hidden'}
					>
						<text x='-8' textAnchor='end' alignmentBaseline='middle' fill='#F53'>
							{'Paris'}
						</text>
					</Annotation>
				)}
			</ZoomableGroup>
		</ComposableMap>
	);
};

export default MapChart;
