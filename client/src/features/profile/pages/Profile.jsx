import { useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AddProduct } from "../components/AddProduct";
import { ArtisanProfile } from "../components/ArtisanProfile";
import { CardList } from "../components/CardList";
import { useArtisanContext } from "../store/ArtisanContext";
import { useProfileProductsContext } from "../store/ProfileProductsContext";
import { getArtisanByUserId } from "../../artisans/services/artisan";

export const Profile = () => {
  const { user, userType } = useAuth();
  const { products } = useProfileProductsContext();
  const { createArtisan } = useArtisanContext();

  useEffect(() => {
    async function fetchData() {
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {userType === "artisan" && (
        <>
          <ArtisanProfile />
          <CardList title="Manualidades publicadas" cards={products} />
          <AddProduct />
        </>
      )}
    </div>
  );
};
