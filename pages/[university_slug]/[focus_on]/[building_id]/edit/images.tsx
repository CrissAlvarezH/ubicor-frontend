import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Image, Button, HStack, Spinner, Text, useQuery, useToast, VStack, IconButton } from "@chakra-ui/react";
import { Body_Buildings_create_building_images, BuildingImageRetrieve, BuildingRetrieve, BuildingsService, OpenAPI } from "api_clients";
import BackNavBar from "components/BackNavBar";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const MAX_LENGTH_IMAGES = 3

const EditBuildingPage: NextPage = (props) => {
    const [loading, setLoading] = useState(true)
    const [building, setBuilding] = useState<BuildingRetrieve>()
    const inputFileRef = useRef<HTMLInputElement>(null)
    const session = useSession()
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        switch (session.status) {
            case "unauthenticated":
                toast({title: "Tiene que estar autenticado", status: "error"})
                break;
            case "authenticated":
                OpenAPI.TOKEN = session.data.access_token as string
        }
    }, [session.status])

    useEffect(() => {
        setLoading(true)
        if (router.query.building_id) {
            callBuilding(Number.parseInt(router.query.building_id.toString()))
        }
    }, [router.query])

    function callUploadBuildingImages(images: any) {
        if (
            !router || !router.query || !router.query.university_slug
            || !router.query.building_id
        ) return toast({title: "Ruta incorrecta"})

        const body: Body_Buildings_create_building_images = {files: []}
        for (const image of images)
            body.files.push(image)
    
        BuildingsService.buildingsCreateBuildingImages(
            router.query.university_slug.toString() || "",
            Number.parseInt(router.query.building_id.toString()),
            body,
        ).then((resp: BuildingRetrieve) => {
            console.log("upload image", resp)
            setBuilding(resp)
        })
        .catch(error => {
            console.log("upload image error", error)
            toast({title: error.body.detail, status: "error"})
        })
    }

    function callBuilding(buildingId: number) {
        BuildingsService.buildingsRetrieve(buildingId)
            .then((resp: BuildingRetrieve) => {
                setBuilding(resp)
                setLoading(false)
            })
            .catch(error => {
                console.error("ERROR: edit building page", error)
                toast({title: "Ocurrió un error, intente mas tarde", status: "error"})
                setLoading(false)
            })
    }

    function handleOnPickImage(e: any) {
        if (building && building.building_images.length >= 3) {
            toast({title: "Maximo 3 imagenes", status: "info"})
            return
        }

        inputFileRef.current?.click()
    }

    function handleOnChangeImage(e: any) {
        e.stopPropagation()
        e.preventDefault()
        console.log("pick images")

        if (!building) return toast({title: "Bloque no cargado", status: "error"})

        const newFiles = e.target.files
        const totalImages = building.building_images.length + newFiles.length
        if (totalImages > MAX_LENGTH_IMAGES)
            return toast({title: "Maximo 3 imagenes", status: "info"})

        callUploadBuildingImages(newFiles)
    }

    if (loading) {
        return (
            <Box>
                <BackNavBar title={`Editar imagenes`}/>    
                <Box pt={10} display="flex" justifyContent="center">
                    <Spinner size="xl"/>
                </Box>
            </Box>
        )
    }

    if (!building) return <Box><BackNavBar title={`Editar imagenes`}/></Box>

    return (
        <Box>
            <BackNavBar title={`Editar imagenes`}/>    

            <Box display="flex" justifyContent="center">
                <VStack flex={1} maxW="600px" pt={{"base": 5, "md": 10}} px={5}>
                    <Text fontSize="lg" pb={3} fontWeight="bold">{building.name}</Text>

                    {building.building_images.length == 0 && <Box pb={2}><Text>No hay imagenes</Text></Box>}

                    {/* Images */}
                    <HStack overflowX="scroll" position="relative" w="full">
                        {building.building_images.map((image: BuildingImageRetrieve) => (
                            <Box key={image.image.id}
                                position="relative" >
                                <Image 
                                    src={OpenAPI.BASE + image.image.original}
                                    width={48} height={40} rounded="lg"
                                    />

                                <Box pos="absolute" top={0} bottom={0} right={0} left={0}
                                    rounded="lg"
                                    bgGradient="linear(blackAlpha.500, blackAlpha.50, blackAlpha.50)">
                                    <Box pos="absolute" top={0} right={0} p={1}>
                                        <IconButton rounded="full" variant="outline" color="white" aria-label="Delete" icon={<DeleteIcon />}/>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </HStack>

                    <input type="file"
                        ref={inputFileRef}
                        style={{display: "none"}}
                        onChange={handleOnChangeImage}
                        accept="image/x-png,image/gif,image/jpeg"
                        multiple/>

                    <Button onClick={handleOnPickImage} colorScheme="teal">Subir imagen</Button>
                </VStack>
            </Box>
        </Box>
    )
}


export default EditBuildingPage
