import React from "react";
import NavBar from "../components/navBar";
import Hero from "../components/hero";
import CardConteinerPlus from "../components/cardConteinerPlus";
import ArtisanConteiner from "../components/artisanConteiner";

function Home () {
    return(
        <>
            <NavBar />
            <Hero />
            <CardConteinerPlus />
            <ArtisanConteiner />
        </>
    );
}
