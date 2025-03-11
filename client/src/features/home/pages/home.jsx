import React from "react";
import Hero from "../components/hero";
import CardConteinerPlus from "../components/cardConteinerPlus";
import ArtisanConteiner from "../components/artisanConteiner";

function Home () {
    return(
        <>
            <Hero />
            <CardConteinerPlus />
            <ArtisanConteiner />
        </>
    );
}
export default Home;
