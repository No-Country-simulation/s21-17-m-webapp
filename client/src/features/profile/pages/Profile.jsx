import { useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AddProduct } from "../components/AddProduct";
import { ArtisanProfile } from "../components/ArtisanProfile";
import { CardList } from "../components/CardList";
import { useArtisanContext } from "../store/ArtisanContext";
import { useProfileProductsContext } from "../store/ProfileProductsContext";
import { getArtisanByUserId } from "../../artisans/services/artisan";
import { getProductsByArtisan } from "../../products/services/products";

export const Profile = () => {
  const { user, userType } = useAuth();
  const { products, addProducts } = useProfileProductsContext();
  const { artisan, createArtisan } = useArtisanContext();

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
    <div>
      {userType === "artisan" && (
        <>
          <ArtisanProfile />
          {artisan && (
            <>
              <CardList title="Manualidades publicadas" cards={products} />
              <AddProduct />
            </>
          )}
        </>
      )}
    </div>
  );
};
