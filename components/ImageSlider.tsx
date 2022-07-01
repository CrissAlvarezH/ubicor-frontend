import { Box, Text, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import SwipeableViews from "react-swipeable-views"
import { FC, useState } from 'react';
import { OpenAPI } from 'api_clients';


interface ImageSliderProps {
    images: string[]
}

const ImageSlider: FC<ImageSliderProps> = ({images}: ImageSliderProps) => {
    const [index, setIndex] = useState(0)

    if (images.length == 0) {
        return (
            <Box h={{"base": 64, "md": 96, "lg": "500px"}} backgroundColor="gray.200" display="flex" justifyContent="center" 
                alignItems="center">
                <Text color="gray.600">No images</Text>
            </Box>
        )
    }

    return (
        <Box h={{"base": 64, "md": 96, "lg": "500px"}} position="relative">
            {/* Slider controls */}
            <Box zIndex={10} display="flex" h="100%" w="100%" position="absolute">
                <Box 
                    onClick={() => index > 0 && setIndex(index - 1)}
                    h="100%" flex={1.5} bg="blackAlpha.300" display="flex"
                    justifyContent="center" alignItems="center">
                    <ChevronLeftIcon w="100%" h="100%" color="whiteAlpha.600"/>
                </Box>

                <Box flex={7}></Box>

                <Box 
                    onClick={() => index < images.length - 1 && setIndex(index + 1)}
                    h="100%" flex={1.5} bg="blackAlpha.300" display="flex"
                    justifyContent="center" alignItems="center">
                    <ChevronRightIcon w="100%" h="100%" color="whiteAlpha.600"/>
                </Box>
            </Box>

            {/* Image slider */}
            <Box position="relative">
                <SwipeableViews
                    index={index}
                    onChangeIndex={setIndex}>
                    {
                        images.map((img: string, i: number) => (
                            <Box key={i} h={64} backgroundColor="red">
                                <Image src={OpenAPI.BASE + img} objectFit="cover" w="100%" h="100%" alt="building image"/>
                            </Box>
                        ))
                    }
                </SwipeableViews>
            </Box>
        </Box>
    );
};

export default ImageSlider;
