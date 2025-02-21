import NavBar from "../../../shared/components/navBar";
import { AddProduct } from "../components/AddProduct";
import { BannerProfile } from "../components/BannerProfile";
import { CardList } from "../components/CardList";

export const Profile = () => {
  const user = {
    name: "Segun Adebayo",
    role: "cDavinci",
  };

  const cards = [
    {
      title: "Title",
      description:
        "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Title",
      description:
        "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Title",
      description:
        "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Nombre artesanía",
      description: "Descripción de la artesanía",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      <NavBar />
      <BannerProfile user={user} />
      <CardList title="Manualidades publicadas" cards={cards} />
      <AddProduct/>
    </div>
  );
};
