import { Box, Heading, Badge, Container } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ImageSlider from "components/ImageSlider"
import { UniversityList, UniversityService, BuildingsService, BuildingList, BuildingRetrieve } from "api_clients";
import { zoneColorSchemas } from "utils/styles"
import BuildingFloorList from "components/BuildingFloorList"
import BackNavBar from "components/BackNavBar";


interface BuildingPageProps {
    building: BuildingRetrieve
}

const BuildingPage: NextPage<BuildingPageProps> = ({building}: BuildingPageProps) => {
    const imageUrls = building.building_images.map((i) => i.image.original)

    return (
        <>
            <BackNavBar 
                title={`Bloque ${building.code}`}
                actions={["Option 1", "Option 2"]}
                onActionClick={(action) => console.log(action)}/>

            {/* Image slider */}
            <ImageSlider images={imageUrls}/>

            <Container maxW="7xl" p={0}>
                {/* Building data */}
                <Box p={4} bg="gray.100">
                    <Heading size="base" py={1} as="h1">{building.name}</Heading>
                    <Badge 
                        variant="solid" 
                        colorScheme={zoneColorSchemas[building.zone]}
                        rounded="full"
                        py={1} px={3}>
                        Zona {building.zone}
                    </Badge>
                </Box>
                
                {/* Building rooms */}
                <BuildingFloorList rooms={building.rooms}/>
            </Container>
        </>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const universities = await UniversityService.universityList()

    let paths = await Promise.all(
        universities.map(async (u: UniversityList) => {
            const buildings = await BuildingsService.buildingsList(u.slug)
            return buildings.map((b: BuildingList) => 
                ({params: {university_slug: u.slug, building_id: b.id.toString(), focus_on: "buildings"}}))
        })
    )

    return {
        paths: paths.flat(),
        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const { building_id } = params as { building_id: string }
    const building = await BuildingsService.buildingsRetrieve(parseInt(building_id))
    return {
        props: {
            building
        }
    }
}


export default BuildingPage
