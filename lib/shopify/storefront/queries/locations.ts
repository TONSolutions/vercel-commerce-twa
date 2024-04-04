export const getLocationsQuery = `
    query Locations($first: Int) {
        locations(first: $first) {
            edges {
                cursor
                node {
                    id
                    name
                    address {
                        address1
                        address2
                        city
                        country
                        countryCode
                        formatted
                        latitude
                        longitude
                        province
                        provinceCode
                    }
                }
            }
        }
    }`;
