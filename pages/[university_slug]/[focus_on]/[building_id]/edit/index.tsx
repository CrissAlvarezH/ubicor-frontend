import { Box, useToast } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { MapWrapper } from "components/SimpleMap"
import { BuildingCreate, BuildingRetrieve, BuildingsService, OpenAPI } from "api_clients"
import { useSession } from "next-auth/react"
import CreateEditBuildingForm, { BuildingFormData } from "forms/CreateEditBuildingForm"
import { GetServerSideProps, NextPage } from "next"
import { useApiErrorHandler } from "utils/errors"


interface EditBuildingPageProps {
    building: BuildingRetrieve
}

const EditBuildingPage: NextPage<EditBuildingPageProps> = ({building}) => {
    const toast = useToast()
    const apiErrorHandler = useApiErrorHandler()
    const {data: userData, status: sessionStatus} = useSession()
    const router = useRouter()

    useEffect(() => {
        switch(sessionStatus) {
            case "unauthenticated":
                toast({title: "Debe estar autenticado", status: "error"})
                break
            case "authenticated":
                OpenAPI.TOKEN = userData?.access_token as string
                break
        }
    }, [sessionStatus])

    const handleEditBuilding = async (data: BuildingFormData) => {
        if (sessionStatus === "unauthenticated")
            return toast({title: "Debe estar autenticado", status: "error"})

        const body: BuildingCreate = {
            ...data,
            position: data.position || {lat: 0.0, lng: 0.0},
            zone: data.zone || ""
        }
        try {
            const resp = await BuildingsService.buildingsUpdate(
                router.query.university_slug!.toString(),
                Number.parseInt(router.query.building_id!.toString()),
                body
            )
            console.log(resp)
            router.replace(`/${router.query.university_slug}/buildings/${resp.id}`)
        } catch (error: any) {
            apiErrorHandler(error)
        }
    }
    
    return (
        <MapWrapper>
            <BackNavBar title={`Editar bloque`}/>    

            <Box display="flex" justifyContent="center">
                <CreateEditBuildingForm 
                    initialValues={{
                        name: building.name,
                        code: building.code,
                        position: {lat: building.position.lat, lng: building.position.lng},
                        zone: building.zone
                    }}
                    onSubmit={handleEditBuilding}
                    buttonText="Editar bloque"/>
            </Box>
        </MapWrapper>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const building = await BuildingsService.buildingsRetrieve(Number.parseInt(ctx.query.building_id!.toString()))
    return {
        props: {
            building
        }
    }
}


export default EditBuildingPage
