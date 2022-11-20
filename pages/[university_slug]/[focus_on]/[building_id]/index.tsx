import { Box, Heading, Badge, Container, VStack, Divider, useDisclosure } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ImageSlider from "components/ImageSlider"
import { UniversityList, UniversityService, BuildingsService, BuildingList, BuildingRetrieve } from "api_clients";
import { zoneColorSchemas } from "utils/styles"
import BuildingFloorList from "components/BuildingFloorList"
import BackNavBar from "components/BackNavBar";
import { useRouter } from "next/router";
import { MapWrapper, SimpleMap } from "components/SimpleMap";
import CreateRoomModal from "components/CreateRoomModal";


interface BuildingPageProps {
    building: BuildingRetrieve
}

const BuildingPage: NextPage<BuildingPageProps> = ({building}: BuildingPageProps) => {
    const router = useRouter()

    const {isOpen: isOpenCreateRoomModal, onToggle: onToggleCreateRoomModal, onClose: onCloseCreateRoomModal} = useDisclosure()

    const imageUrls = building.building_images.map((i) => i.image.original)

    function handleMenuActionSelected(action: string) {
        switch (action) {
            case "Editar datos":
                router.push(`/${router.query.university_slug}/buildings/${router.query.building_id}/edit`)
                break;
            case "Editar imagenes":
                router.push(`/${router.query.university_slug}/buildings/${router.query.building_id}/edit/images`)
                break;
            case "Agregar salón":
                onToggleCreateRoomModal()
                break;
        }
    }

    return (
        <MapWrapper>
            <BackNavBar 
                title={`Bloque ${building.code}`}
                menuActions={["Editar datos", "Editar imagenes", "Agregar salón"]}
                onMenuActionClick={handleMenuActionSelected}/>

            {/* Modal to add room */}
            <CreateRoomModal onClose={onCloseCreateRoomModal} isOpen={isOpenCreateRoomModal}/>

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

                {/* Map */}
                <VStack shadow="md" h={56} spacing="none">
                    <SimpleMap 
                        zoom={18}
                        markers={[building.position]}
                        center={building.position}
                        options={{gestureHandling: "none"}}/>
                </VStack>
                
                {/* Building rooms */}
                <BuildingFloorList rooms={building.rooms}/>
            </Container>
        </MapWrapper>
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
