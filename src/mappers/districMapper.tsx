import type { Distric, DistricResponse } from "../model/Distric"

export const getDistricMapper = (districtResponses: DistricResponse[]): Distric[] => {
    return districtResponses.map((districtResponse) => ({
        id: districtResponse.id,
        name: districtResponse.name,

    }))
}