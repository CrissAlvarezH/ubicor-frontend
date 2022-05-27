import BuildingList from "components/BuildingList";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { UniversityService, UniversityRetrieve } from "./../../api_clients"


interface Props {
    university: UniversityRetrieve
}


const UniversityPage: NextPage<Props> = ({university}) => {

    return (
        <>
            <BuildingList buildings={university.buildings}/>
        </>
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
