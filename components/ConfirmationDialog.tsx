import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { FC, useRef } from "react"


interface ConfirmationDialogProps {
    message: string
    confirmationText: string
    isOpen: boolean
    isLoading?: boolean
    onClose: () => void
    onYes: () => void
}


const ConfirmationDialog: FC<ConfirmationDialogProps> = (
    {message, confirmationText, isOpen, isLoading = false, onClose, onYes}
) => {
    const cancelRef = useRef<any>()

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent mx={5}>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {message}
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button 
                            isLoading={isLoading}
                            colorScheme='red' onClick={() => onYes()} ml={3}>
                            {confirmationText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}


export default ConfirmationDialog
