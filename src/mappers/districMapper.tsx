import type { Distric, DistricResponse } from "../model/Distric"

export const getDistricMapper = (ds: DistricResponse[]): Distric[] => {
    return ds.map((d) => ({
        id: d.id,
        name: d.name,

    }))
}