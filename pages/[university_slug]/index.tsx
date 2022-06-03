import { UniversityService, UniversityRetrieve, UniversityList } from "api_clients"
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Text } from "@chakra-ui/react";
import Map from "components/Map";
import BuildingGrid from "components/BuildingList"
import { useState } from "react";


interface UniversityPageProps {
    university: UniversityRetrieve
}

const UniversityPage: NextPage<UniversityPageProps> = ({university}: UniversityPageProps) => {
    const [buildingHover, setBuildingHover] = useState()

    return (
        <Box h="100vh" display="flex" flexDir="column">
            <Box shadow="md" bg="white" flexShrink={0}>
                <Box p={3}>
                    <Text fontWeight="bold">Universidad de Cordoba</Text>
                </Box>
                <Box p="1px" bg="gray.200" />
            </Box>
            <Box display="flex" overflowY="scroll" h="100%">
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
