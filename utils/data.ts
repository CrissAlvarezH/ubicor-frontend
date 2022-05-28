import { BuildingList, BuildingRetrieve } from "api_clients"


export const getFirstImage = (building: BuildingList|BuildingRetrieve): string => {
    if (building.building_images.length > 0)
        return building.building_images[0].image.small
    return "https://picsum.photos/300/100"
}