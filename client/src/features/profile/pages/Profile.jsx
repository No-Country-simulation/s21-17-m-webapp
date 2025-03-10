import { useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AddProduct } from "../components/AddProduct";
import { ArtisanProfile } from "../components/ArtisanProfile";
import { CardList } from "../components/CardList";
import { useArtisanContext } from "../store/ArtisanContext";
import { useProfileProductsContext } from "../store/ProfileProductsContext";
import { getArtisanByUserId } from "../../artisans/services/artisan";
import { getProductsByArtisan } from "../../products/services/products";
import { useCustomerContext } from "../store/CustomerContext";
import { getCustomersByUserId } from "../services/customer";
import { CustomerList } from "../components/CustomerList";
import { AddCustomer } from "../components/AddCustomer";

export const Profile = () => {
  const { user, userType } = useAuth();
  const { products, addProducts } = useProfileProductsContext();
  const { artisan, createArtisan } = useArtisanContext();
  const { customers, addCustomers } = useCustomerContext();

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

  useEffect(() => {
    async function getCustomers() {
      try {
        if (!user) return;
        if (userType !== "common") return;
        const customersData = await getCustomersByUserId(user.id);
        addCustomers(customersData);
      } catch (error) {
        console.error(error);
      }
    }
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      {userType === "common" && (
        <>
          <CustomerList title="Perfiles de envió" customers={customers} />
          <AddCustomer />
        </>
      )}
    </div>
  );
};
