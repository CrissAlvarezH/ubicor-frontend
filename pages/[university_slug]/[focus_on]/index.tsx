import { UniversityService, UniversityRetrieve, UniversityList, BuildingList } from "api_clients"
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import Map from "components/Map";
import BuildingGrid from "components/BuildingList"
import { useEffect, useRef, useState } from "react";
import BuildingsAndRoomsSearchModal from "components/SearchModal";
import { useRouter } from "next/router";
import NavBar from "components/NavBar";
import { signIn, useSession } from "next-auth/react";


interface UniversityPageProps {
    university: UniversityRetrieve
    focus_on: "buildings" | "map"
}

const UniversityPage: NextPage<UniversityPageProps> = ({university, focus_on}: UniversityPageProps) => {
    const {data} = useSession()
    const router = useRouter()
    const mapfocus = useRef<string|undefined>()

    const [buildingHover, setBuildingHover] = useState<BuildingList>()
    const {isOpen: showMap, onToggle: toggleShowMap} = useDisclosure({defaultIsOpen: focus_on === "map"})
    const {isOpen: showSearch, onToggle: toggleSearch, onClose: onCloseSearch} = useDisclosure()

    useEffect(() => {
        if (data?.error === "RefreshAccessTokenError") {
            signIn()
        }
    }, [data])

    useEffect(() => {
        // event: user close infowindown, drop map focus
        if (!("b" in router.query) && showMap)
            mapfocus.current = undefined 
    }, [router.query])

    useEffect(() => {
        if (showMap) {
            let path = `/${router.query.university_slug}/map`
            if (mapfocus.current)
                path = path + `?b=${mapfocus.current}`
            
            router.push(path, undefined, {shallow: true})
        } else {
            // drop b query param from url if map is hidden 
            // and save value for when the user show map again
            if ("b" in router.query)  mapfocus.current = router.query.b?.toString()

            router.push(`/${router.query.university_slug}/buildings`, undefined, {shallow: true})
        }
    }, [showMap])

    return (
        <Box h="100vh" display="flex" flexDir="column">
            <BuildingsAndRoomsSearchModal 
                buildings={university.buildings} onClose={onCloseSearch} isOpen={showSearch}/>

            <NavBar title={university.name} onSearchClick={toggleSearch} />

            {/* Body on Desktop*/}
            <Box display={{base: "none", md: "flex"}}>
                <Box flex={1} pt={12} maxW="850px">
                    <BuildingGrid 
                        buildings={university.buildings}
                        onBuildingHover={(b) => setBuildingHover(b)}/>
                </Box>
                <Box flex={1} position="relative">
                    <Box 
                        position="sticky" 
                        top={0} left={0} right={0} h="100vh" 
                        zIndex={1} pt={12}>
                        <Map
                            center={university.position}
                            buildings={university.buildings}
                            buildingFocus={buildingHover}/>
                    </Box>
                </Box>
            </Box>


            {/* Body on Mobile*/}
            <Box display={{base: "block", md: "none"}} 
                flex={1} position="relative">

                <Box h="100%" overflowY="scroll" pt={12}>
                    <BuildingGrid 
                        buildings={university.buildings}
                        onBuildingHover={(b) => setBuildingHover(b)}/>
                </Box>

                <Box 
                    display={showMap ? "block" : "none"} bg="gray.100"
                    position="fixed" top={12} bottom={0} left={0} right={0}>
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
                    position="fixed" bottom={6} left="50%" right="50%"
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

    // create paths focus on buildings and focus on map
    let paths = universities.map((u: UniversityList) => ({params: {university_slug: u.slug, focus_on: "buildings"}}))
    paths = [...paths, ...universities.map((u: UniversityList) => ({params: {university_slug: u.slug, focus_on: "map"}}))]

    return {
        paths: paths,
        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const { university_slug, focus_on } = params as { university_slug: string, focus_on: string }
    const university = await UniversityService.universityRetrieve(university_slug)

    return {
        props: {
            university,
            focus_on
        }
    }
}


export default UniversityPage
