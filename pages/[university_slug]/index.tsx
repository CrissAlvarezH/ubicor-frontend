import { UniversityService, UniversityRetrieve, UniversityList } from "api_clients"
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import Map from "components/Map";
import BuildingGrid from "components/BuildingList"
import { useState } from "react";


interface UniversityPageProps {
    university: UniversityRetrieve
}

const UniversityPage: NextPage<UniversityPageProps> = ({university}: UniversityPageProps) => {
    const [buildingHover, setBuildingHover] = useState()
    const {isOpen: showMap, onToggle: toggleShowMap} = useDisclosure()

    return (
        <Box h="100vh" display="flex" flexDir="column">
            {/* Header */}
            <Box shadow="md" bg="white" flexShrink={0}>
                <Box p={3}>
                    <Text fontWeight="bold">Universidad de Cordoba</Text>
                </Box>
                <Box p="1px" bg="gray.200" />
            </Box>

            {/* Body on Desktop*/}
            <Box display={{base: "none", md: "flex"}} overflowY="scroll" h="100%">
                <Box flex={1} overflowY="scroll">
                    <BuildingGrid 
                        buildings={university.buildings}
                        onBuildingHover={(b) => setBuildingHover(b)}/>
                </Box>
                <Box flex={1}>
                    <Map
                        center={university.position}
                        buildings={university.buildings}
                        buildingFocus={buildingHover}/>
                </Box>
            </Box>


            {/* Body on Mobile*/}
            <Box display={{base: "block", md: "none"}} 
                overflowY="scroll" flex={1} position="relative">

                <Box display={showMap ? "none" : "block"}
                    h="100%" overflowY="scroll">
                    <BuildingGrid 
                        buildings={university.buildings}
                        onBuildingHover={(b) => setBuildingHover(b)}/>
                </Box>

                <Box 
                    display={showMap ? "block" : "none"}
                    h="100%" position="absolute" top={0} bottom={0} left={0} right={0}>
                    <Map
                        center={university.position}
                        buildings={university.buildings}
                        buildingFocus={buildingHover}/>
                </Box>

                <Button 
                    onClick={() => toggleShowMap()}
                    bg={showMap ? "white" : "black"}
                    transition="1.3s"
                    colorScheme="black"
                    position="absolute" bottom={6} left="50%" right="50%"
                    w="50%" transform="translate(-50%, -50%)"
                    rounded="full" px={4} py={2} boxShadow="dark-lg">
                    <Text textAlign="center" color={showMap ? "black" : "white"}>
                        {showMap ? "Ocultar mapa" : "Mostrar mapa"}
                    </Text>
                </Button>
           </Box> 
        </Box>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const universities = await UniversityService.universityList()

    const paths = universities.map((u: UniversityList) => ({params: {university_slug: u.slug}}))

    return {
        paths: paths,
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const { university_slug } = params as { university_slug: string }
    const university = await UniversityService.universityRetrieve(university_slug)

    return {
        props: {
            university
        }
    }
}


export default UniversityPage
