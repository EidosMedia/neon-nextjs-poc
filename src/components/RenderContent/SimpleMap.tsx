import { ComposableMap, Geographies, Geography, Annotation, ZoomableGroup } from 'react-simple-maps';

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.neonData
 */
export default function SimpleMap({ jsonElement, neonData }) {
    let countries = null;

    try {
        countries = jsonElement.elements
            .find(el => el.name === 'tbody')
            .elements.map(el => ({
                code: el.elements.find(el2 => el2.attributes.class === 'nation').elements[0].text,
                data: el.elements.find(el2 => el2.attributes.class === 'data').elements[0].text
            }));
    } catch (e) {}

    countries = countries.map(c => {
        switch (c.code) {
            case 'IT':
                return {
                    ...c,
                    coordinates: [11.3522, 43.8566],
                    label: 'Italy'
                };
                break;
            case 'FR':
                return {
                    ...c,
                    coordinates: [2.3522, 48.8566],
                    label: 'France'
                };
                break;
            case 'DE':
                return {
                    ...c,
                    coordinates: [10.3522, 50.8566],
                    label: 'Germany'
                };
                break;
            default:
                return c;
        }
    });

    const render = (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [-10.0, -52.0, 0],
                center: [-5, -3],
                scale: 1100
            }}
        >
            <Geographies
                geography="/static/data/europeMapFeatures.json"
                fill="#D6D6DA"
                stroke="#FFFFFF"
                strokeWidth={0.5}
            >
                {({ geographies }) => geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)}
            </Geographies>
            {countries.map(c => (
                <Annotation
                    subject={c.coordinates}
                    dx={-90}
                    dy={-30}
                    connectorProps={{
                        stroke: '#FF5533',
                        strokeWidth: 3,
                        strokeLinecap: 'round'
                    }}
                >
                    <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
                        {c.label}: {c.data}
                    </text>
                </Annotation>
            ))}
        </ComposableMap>
    );

    return render;
}
