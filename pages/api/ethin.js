export default function handler(req, res) {
  res.status(200).json([
    {
      "type": "Feature",
      "properties": {
        "SUBURB":"Appin",
        "ETHINICITY": "AUSTRALIANS",
        "PERCENTAGE": "34.5%"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-34.200499198, 150.785663524]
      },
    },
    {
      "type": "Feature",
      "properties": {
        "SUBURB":"Hurstville ",
        "ETHINICITY": "Chinese",
        "PERCENTAGE": "49.4%"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-33.9666628, 151.0999996]
      },
    },
    {
      "type": "Feature",
      "properties": {
        "SUBURB":"Avalon Beach",
        "ETHINICITY": "English",
        "PERCENTAGE": "34.6%"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-33.636, 151.3312]
      },
    },
    {
      "type": "Feature",
      "properties": {
        "SUBURB":"Woodcroft",
        "ETHINICITY": "Filipino",
        "PERCENTAGE": "24.2%"},
      "geometry": {
        "type": "Point",
        "coordinates": [-33.748, 151.3283]
      },  
    },
    {
      "type": "Feature",
      "properties": {
        "SUBURB":"Harris Park",
        "ETHINICITY": "Indian",
        "PERCENTAGE": "39.4%"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-33.8223, 151.0093]
      },
    },  
    {
      "type": "Feature",
      "properties": {
        "SUBURB":"Harris Park",
        "ETHINICITY": "Italian",
        "PERCENTAGE": "24.0%"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-33.8807, 151.1391]
      },  
    },
    {
      "type": "Feature",
      "properties": {
        "SUBURB":"Silverwater",
        "ETHINICITY": "Korean",
        "PERCENTAGE": "10.1%"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-33.8292, 151.0566]
      }
    }
  ])
}
