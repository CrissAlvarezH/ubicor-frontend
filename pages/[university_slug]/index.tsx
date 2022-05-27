import { Box, Grid, GridItem } from "@chakra-ui/react";
import { BuildingRetrieve } from "api_clients";
import Building from "components/Building";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { UniversityService, UniversityRetrieve } from "./../../api_clients"


interface Props {
    university: UniversityRetrieve
}


const UniversityPage: NextPage<Props> = ({university}) => {

    return (
        <Box display="flex" justifyContent="center">
            <Grid
                w="100%"
                maxW="1094px"
                p={2}
                gap={2}
                templateColumns="repeat(auto-fill, minmax(297px, 1fr))">
                {
                    university.buildings.map((b: BuildingRetrieve) => (
                        <GridItem key={b.id}>
                            <Building building={b} />
                        </GridItem>
                    ))
                }
            </Grid> 
        </Box>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const universities = await UniversityService.universityList()

    const paths = universities.map((u: UniversityRetrieve) => ({params: {university_slug: u.slug}}))

    return {
        paths: paths,
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    const { university_slug } = ctx.params as { university_slug: string }
    const university = await UniversityService.universityRetrieve(university_slug)

    return {
        props: {
            university
        }
    }
}


export default UniversityPage
