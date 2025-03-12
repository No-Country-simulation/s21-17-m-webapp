import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useArtisanContext } from "../../profile/store/ArtisanContext";
import { useProfileProductsContext } from "../../profile/store/ProfileProductsContext";
import { getArtisanByUserId } from "../../artisans/services/artisan";
import { getProductsByArtisan } from "../../products/services/products";
import { SalesList } from "../components/SalesList";
import { SalesDetail } from "../components/SalesDetail";

export const Sales = () => {
  const { user, userType } = useAuth();
  const { products, addProducts } = useProfileProductsContext();
  const { artisan, createArtisan } = useArtisanContext();
  const [productSelected, setProductSelected] = useState(null);

  useEffect(() => {
    async function getArtisan() {
      try {
        if (!user) return;
        if (userType !== "artisan") return;
        const artisanData = await getArtisanByUserId(user.id);
        createArtisan(artisanData);
      } catch (error) {
        console.error(error);
        createArtisan(null);
      }
    }
    getArtisan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    async function getProductsProfile() {
      try {
        if (!user) return;
        if (userType !== "artisan") return;
        if (!artisan) return;
        const productsData = await getProductsByArtisan(artisan.id);
        addProducts(productsData);
      } catch (error) {
        console.error(error);
      }
    }
    getProductsProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artisan]);

  return (
    <>
      <SalesList
        title="Productos vendidos"
        cards={products}
        setProductSelected={setProductSelected}
      />
      <SalesDetail productSelected={productSelected} />
    </>
  );
};
