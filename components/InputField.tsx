import { FormControl, FormErrorMessage, FormLabel, Input, TagLabel } from "@chakra-ui/react"
import { useField } from "formik"
import { FC, InputHTMLAttributes } from "react"


type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    name: string
}


const InputField: FC<InputFieldProps> = ({label, size: _, ...props}) => {
    const [field, {error}] = useField(props)

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name}/>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}

export default InputField
