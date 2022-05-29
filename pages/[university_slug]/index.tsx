import { UniversityService, UniversityRetrieve, UniversityList } from "api_clients"
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box } from "@chakra-ui/react";
import Map from "components/Map";
import BuildingList from "components/BuildingList"


interface UniversityPageProps {
    university: UniversityRetrieve
}

const UniversityPage: NextPage<UniversityPageProps> = ({university}: UniversityPageProps) => {

    return (
        <>
            {/* <BuildingList buildings={university.buildings}/> */}
            <Box h="100vh">
                <Map
                    center={university.position}
                    buildings={university.buildings}/>
            </Box>
        </>
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
