import React, { memo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Annotation } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';

const markers = [
	{
		name: 'United States of America',
		coordinates: [-93.26, 44.29],
		contentA: 'Contract Analysis',
		contentB: 'BA/BE',
		contentC: 'Clinic Trials',
	},
	{
		name: 'Indonesia',
		coordinates: [110.26, -7.62],
		contentA: 'Contract Analysis',
		contentB: 'BA/BE',
		contentC: 'Clinic Trials',
	},
	{
		name: 'France',
		coordinates: [6.11, 45.89],
		contentA: 'Contract Analysis',
		contentB: 'BA/BE',
		contentC: 'Clinic Trials',
	},
	{
		name: 'Russia',
		coordinates: [70.78, 60.23],
		contentA: 'Contract Analysis',
		contentB: 'BA/BE',
		contentC: 'Clinic Trials',
	},
	{
		name: 'Australia',
		coordinates: [135.3, -25.42],
		contentA: 'Contract Analysis',
		contentB: 'BA/BE',
		contentC: 'Clinic Trials',
	},
];

const MapChart = ({ setTooltipContent }) => {
	const [active, setActive] = useState(false);
	const [current, setCurrent] = useState({
		name: '',
		coordinates: [],
		contentA: '',
		contentB: '',
		contentC: '',
	});

	const toggleClass = (name, coordinates, contentA, contentB, contentC) => {
		setActive(!active);
		setCurrent({
			name: name,
			coordinates: coordinates,
			contentA: contentA,
			contentB: contentB,
			contentC: contentC,
		});
	};

	return (
		<>
			<div
				className='App'
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{/* <ReactTooltip>{content}</ReactTooltip> */}
				<div
					style={{
						width: '1400px',
						// borderStyle: 'double'
					}}
				>
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
						<ZoomableGroup zoom={1}>
							<Geographies geography='/features.json' disableOptimization>
								{({ geographies }) =>
									geographies.map((geo) => (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											fill='#D9D9D9'
											// onMouseEnter={() => {
											// 	const { name } = geo.properties;
											// 	setContent(`${name}`);
											// }}
											// onMouseLeave={() => {
											// 	setContent('');
											// }}
											// style={{
											// 	hover: {
											// 		fill: '#e4ecdc',
											// 		outline: 'none',
											// 	},
											// }}
										/>
									))
								}
							</Geographies>
							{markers.map(({ name, coordinates, contentA, contentB, contentC }) => (
								<Marker key={name} coordinates={coordinates} onClick={() => toggleClass(name, coordinates, contentA, contentB, contentC)}>
									<circle r={3} fill='#00623D' strokeWidth={1} />
								</Marker>
							))}
							{active && (
								<Annotation
									subject={current.coordinates}
									dx={0}
									dy={-50}
									connectorProps={{
										stroke: '#00623D',
										strokeWidth: 0.5,
										strokeLinecap: 'round',
									}}
								>
									<text x='3' y='0' textAnchor='start' alignmentBaseline='middle' fill='#00623D' style={{ fontSize: '5px' }}>
										{current.name}
									</text>
									<text x='3' y='10' textAnchor='start' alignmentBaseline='middle' fill='#00623D' style={{ fontSize: '5px' }}>
										{current.contentA}
									</text>
									<text x='3' y='20' textAnchor='start' alignmentBaseline='middle' fill='#00623D' style={{ fontSize: '5px' }}>
										{current.contentB}
									</text>
									<text x='3' y='30' textAnchor='start' alignmentBaseline='middle' fill='#00623D' style={{ fontSize: '5px' }}>
										{current.contentC}
									</text>
								</Annotation>
							)}
						</ZoomableGroup>
					</ComposableMap>
				</div>
			</div>
		</>
	);
};

export default memo(MapChart);
