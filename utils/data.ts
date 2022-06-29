import { BuildingList, BuildingRetrieve, OpenAPI } from "api_clients"


export const getFirstImage = (building: BuildingList|BuildingRetrieve): string => {
    if (building.building_images.length > 0)
        return OpenAPI.BASE + building.building_images[0].image.medium
    return "https://picsum.photos/300/100"
}