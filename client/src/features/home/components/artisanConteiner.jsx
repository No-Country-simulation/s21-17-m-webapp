import React from "react";
import { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import CardArtisan from "../../../shared/components/cardArtisan";
import axios from 'axios';


function ArtisanConteiner (){
  const [ artisanData, setArtisanData ] = useState({
    name:"",
    aboutMe:"",
    imageUrl:"",
    locality:"",
    especiality:""
  })

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setError("Nos encontramos con problemas al encontrar nuestros artesanos"); 
    setLoading(false);
  }
  };

  fetchData();
  }, []);
  return(
  <Box p="4" gap="10" alignItems="center">
    <Text fontSize="2xl" >Nuestros artesanos</Text>
        {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt="20">
          <Spinner size="lg" />
        </Box>
        ) : error ? (
          <Text color="secondary" textAlign="center" mt="4">{error}</Text>
        ) : (
    <CardArtisan
        name= {artisanData.name}
        aboutMe= {artisanData.aboutMe}
        imageUrl= {artisanData.imageUrl}
        locality= {artisanData.locality}
        especiality= {artisanData.especiality}
    />
        )}
  </Box>
  );
}
export default ArtisanConteiner;