import { useToast, UseToastOptions } from "@chakra-ui/react"

export function useApiErrorHandler() {
    const toast = useToast()

    return (e: any) => {
        console.log("Api Error", e, e.status)
        const toastBody: UseToastOptions = {title: e?.body?.detail, status: "error"}

        switch (e.status) {
            case 401:
                toastBody.title = "Sesión expirada, debes iniciar sesión."
                break
            case 403:
                toastBody.title = "No tienes permisos para ejecutar esta acción."
                break
            case 404:
                toastBody.title = "Recurso no encontrado"
                break
            case 500:
                toastBody.title = "Error en el servidor, intente de nuevo mas tarde"
                break
        }

        toast(toastBody)
    }
}