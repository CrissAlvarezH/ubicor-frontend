import { Box, useToast } from "@chakra-ui/react"
import BackNavBar from "components/BackNavBar"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { MapWrapper } from "components/SimpleMap"
import { BuildingCreate, BuildingsService, OpenAPI } from "api_clients"
import { useSession } from "next-auth/react"
import CreateEditBuildingForm, { BuildingFormData } from "forms/CreateEditBuildingForm"


const CreateBuildingPage = () => {
    const toast = useToast()
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

    const handleCreateBuilding = async (data: BuildingFormData) => {
        if (sessionStatus === "unauthenticated")
            return toast({title: "Debe estar autenticado", status: "error"})

        const body: BuildingCreate = {
            ...data,
            position: data.position || {lat: 0.0, lng: 0.0},
            zone: data.zone || ""
        }
        try {
            const resp = await BuildingsService.buildingsCreate(router.query.university_slug!!.toString(), body)
            console.log(resp)
            router.replace(`/${router.query.university_slug}/buildings/${resp.id}/edit/images`)
        } catch (error: any) {
            console.log("ERROR", error.body)
            toast({title: error?.body.detail, status: "error"})
        }
    }
    
    return (
        <MapWrapper>
            <BackNavBar title={`Crear bloque para ${router.query.university_slug}`}/>    

            <Box display="flex" justifyContent="center">
                <CreateEditBuildingForm 
                    initialValues={{name: "", code: "", position: undefined, zone: undefined}}
                    onSubmit={handleCreateBuilding}
                    buttonText="Crear bloque"/>
            </Box>
        </MapWrapper>
    )
}




export default CreateBuildingPage
