import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Image, Button, HStack, Spinner, Text, useToast, IconButton } from "@chakra-ui/react";
import { Body_Buildings_create_building_images, Body_Buildings_update_building_image, BuildingImageRetrieve, BuildingRetrieve, BuildingsService, ImageRetrieve, OpenAPI } from "api_clients";
import BackNavBar from "components/BackNavBar";
import ConfirmationDialog from "components/ConfirmationDialog";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useApiErrorHandler } from "utils/errors";

const MAX_LENGTH_IMAGES = 3

const EditBuildingPage: NextPage = (props) => {
    const [loading, setLoading] = useState(true)
    const [building, setBuilding] = useState<BuildingRetrieve>()
    const [imageToDelete, setImageToDelete] = useState<BuildingImageRetrieve>()
    const [imageToUpdate, setImageToUpdate] = useState<BuildingImageRetrieve>()
    const inputUploadFileRef = useRef<HTMLInputElement>(null)
    const inputUpdateFileRef = useRef<HTMLInputElement>(null)
    const session = useSession()
    const router = useRouter()
    const toast = useToast()
    const apiErrorHandler = useApiErrorHandler()

    useEffect(() => {
        switch (session.status) {
            case "unauthenticated":
                toast({title: "Tiene que estar autenticado", status: "error"})
                break;
            case "authenticated":
                // @ts-ignore
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
        const body: Body_Buildings_create_building_images = {files: []}
        for (const image of images)
            body.files.push(image)
    
        setLoading(true)

        BuildingsService.buildingsCreateBuildingImages(
            router.query!.university_slug!.toString(),
            Number.parseInt(router.query!.building_id!.toString()),
            body,
        ).then((resp: BuildingRetrieve) => {
            setBuilding(resp)
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            apiErrorHandler(error)
        })
    }

    // @ts-ignore
    function callUpdateImage(image?: BuildingImageRetrieve, file: any) {
        if (!image) return
        setLoading(true)

        BuildingsService.buildingsUpdateBuildingImage(
            image.image.id,
            router.query!.university_slug!.toString(),
            Number.parseInt(router.query!.building_id!.toString()),
            {file}
        ).then((resp: BuildingRetrieve) => {
            setBuilding(undefined)
            setBuilding(resp)
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            apiErrorHandler(error)
        })
    }

    function callBuilding(buildingId: number) {
        setLoading(true)
        BuildingsService.buildingsRetrieve(buildingId)
            .then((resp: BuildingRetrieve) => {
                setBuilding(resp)
                setLoading(false)
            })
            .catch(error => {
                apiErrorHandler(error)
                setLoading(false)
            })
    }

    function callDeleteImage(image?: BuildingImageRetrieve) {
        if (!image) return
        setLoading(true)

        BuildingsService.buildingsRemoveBuildingImage(
            image.image.id,
            router.query!.university_slug!.toString(),
            Number.parseFloat(router.query!.building_id!.toString())
        ).then((resp: BuildingRetrieve) => {
            setBuilding(resp)
            setImageToDelete(undefined)
            setLoading(false)
        }).catch(error => {
            apiErrorHandler(error)
            setLoading(false)
        })
    }

    function handleOnChangeUploadImage(e: any) {
        e.stopPropagation()
        e.preventDefault()
        console.log("pick images")

        if (!building) return toast({title: "Bloque no cargado", status: "error"})

        const newFiles = e.target.files
        const totalImages = building.building_images.length + newFiles.length
        if (totalImages > MAX_LENGTH_IMAGES)
            return toast({title: "Maximo 3 imagenes", status: "error"})

        callUploadBuildingImages(newFiles)
    }

    function handleOnChangeUpdateImage(e: any) {
        const newFiles = e.target.files
        if (newFiles.length !== 1) 
            return toast({title: "Debe escoger una imagen", status: "error"})
        
        callUpdateImage(imageToUpdate, newFiles[0])
    }

    function handlePickImage(fileAction: "upload" | "update") {
        if (fileAction == "upload") {
            if (building && building.building_images.length >= 3) {
                toast({title: "Maximo 3 imagenes", status: "info"})
                return
            }
            inputUploadFileRef.current?.click()
        } else {
            inputUpdateFileRef.current?.click()
        }
    }

    if (!building) {
        if (loading) {
            return (
                <Box>
                    <BackNavBar title={`Editar imagenes`}/>    
                    <Box pt={10} display="flex" justifyContent="center">
                        <Spinner size="xl"/>
                    </Box>
                </Box>
            )
        } else {
            return (
                <Box>
                    <BackNavBar title={`Editar imagenes`}/>
                    <Text>Ocurrió un error</Text>
                </Box>
            )
        }
    }

    return (
        <>
            <BackNavBar 
                title={"Editar imagenes"}
                buttons={["OK"]}
                onButtonClick={(b) => router.replace(`/${router.query.university_slug}/buildings/${router.query.building_id}`)}/>    

            <ConfirmationDialog 
                message="¿Seguro que quieres eliminar la imagen?"
                confirmationText="Eliminar" isLoading={loading}
                isOpen={imageToDelete !== undefined} onClose={() => setImageToDelete(undefined)}
                onYes={() => callDeleteImage(imageToDelete)}/>

            <Box display="flex" flexDir="column" alignItems="center" px={2}>

                <Text fontSize="lg" py={5} fontWeight="bold">{building.name}</Text>

                {building.building_images.length == 0 && <Box pb={2}><Text>No hay imagenes</Text></Box>}

                {/* Images */}
                <HStack overflowX="scroll" w="full" justify={{base: "start", sm: "center"}}>
                    {building.building_images.map((image: BuildingImageRetrieve) => (
                        <Box key={image.image.id}
                            position="relative" flexShrink={0} width={40}>
                            <Image 
                                src={OpenAPI.BASE + image.image.original}
                                
                                width={48} height={40} rounded="lg"/>

                            <Box pos="absolute" top={0} bottom={0} right={0} left={0} rounded="lg"
                                bgGradient="linear(blackAlpha.500, blackAlpha.50, blackAlpha.50)">
                                <HStack pos="absolute" top={0} right={0} p={1}>
                                    <IconButton 
                                        onClick={() => {
                                            setImageToUpdate(image)
                                            handlePickImage("update")
                                        }}
                                        rounded="full" variant="outline" color="white"
                                        size="sm"
                                        aria-label="Delete" icon={<EditIcon  />}/>
                                    
                                    <IconButton 
                                        onClick={() => setImageToDelete(image)}
                                        rounded="full" variant="outline" color="white"
                                        size="sm"
                                        aria-label="Delete" icon={<DeleteIcon />}/>
                                </HStack>
                            </Box>
                        </Box>
                    ))}
                </HStack>

                <input type="file"
                    ref={inputUploadFileRef}
                    style={{display: "none"}}
                    onChange={handleOnChangeUploadImage}
                    accept="image/x-png,image/gif,image/jpeg"
                    multiple/>
                
                <input type="file"
                    ref={inputUpdateFileRef}
                    style={{display: "none"}}
                    onChange={handleOnChangeUpdateImage}
                    accept="image/x-png,image/gif,image/jpeg"/>

                <Button onClick={() => handlePickImage("upload")} 
                    isLoading={loading}
                    colorScheme="teal"  mt={5}>
                    Subir imagen
                </Button>
            </Box>
        </>
    )
}


export default EditBuildingPage
