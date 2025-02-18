import React from "react";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import CardArtisan from "../../../shared/components/cardArtisan";


function ArtisanConteiner (){
    const [ artisanData, setArtisanData ] = useEstate({
        name:"",
        aboutMe:"",
        imageUrl:"",
        locality:"",
        especiality:""
    })
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://"); // URL del backend
            const data = response.data;
            setArtisanData({
                name: data.name,
                aboutMe: data.aboutMe,
                imageUrl: data.imageUrl,
                locality: data.locality,
                especiality: data.especiality,
            });
          } catch (error) {
            console.error("Error al cargar los datos:", error);
          }
        };
    
        fetchData();
      }, []);
    return(
        <Box>
            <Text>Nuestros artesanos</Text>
            <CardArtisan
                name= {artisanData.name}
                aboutMe= {artisanData.aboutMe}
                imageUrl= {artisanData.imageUrl}
                locality= {artisanData.locality}
                especiality= {artisanData.especiality}
            />
            
        </Box>
    );
}
export default ArtisanConteiner;