import { React, useEffect, useState } from "react";
import { Box, IconButton, Flex, Button, Link, Image } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import logo from "../../../assets/cdavinci.jpg";
import ContactForm from "../../../shared/components/forms/contact";
import LoginForm from "../../../shared/components/forms/login";
import RegisterForm from "../../../shared/components/forms/register";
import { useAuth } from "./../../../app/providers/AuthProvider";

function NavBar() {
  const { user, userType, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    if (user) {
      setShowLoginForm(false);
      setShowRegisterForm(false);
    }
  }, [user]);

  const handleToggle = () => {
    console.log("Botón clickeado");
    setIsOpen((prevState) => !prevState);
  };

  const handleShowContactForm = () => {
    setShowContactForm(true);
  };
  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };
  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };
  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <Box bg="neutral" color="accent" p="4">
      {/* tamaño PC */}
      <Flex
        direction="row"
        display={{ base: "none", md: "flex" }}
        justify="space-between"
      >
        <Flex gap="4" justify="flex-start">
          <Link href="/">
            <Image
              src={logo}
              alt="logo cDavinci"
              maxHeight={"40px"}
              marginInline={"30px"}
            />
          </Link>
        </Flex>
        <Flex direction="row" gap="6" justify="flex-end">
          <Link href="/artisans">Artesanos</Link>
          <Link href="/aboutUs">Sobre Nosotros</Link>
          <Link to="" onClick={handleShowContactForm}>
            Contáctanos
          </Link>
          {userType === "common" && (
            <>
              <Link href="/cart">Carrito</Link>
              <Link href="/favorites">Mis favoritos</Link>
              <Link href="/profile">Perfil</Link>
            </>
          )}
          {userType === "artisan" && (
            <>
              <Link href="">Mis ventas</Link>
              <Link href="/profile">Perfil</Link>
            </>
          )}
          {userType ? (
            <Button bg="secondary" onClick={logout}>
              Cerrar Sesión
            </Button>
          ) : (
            <>
              <Button bg="secondary" onClick={handleShowLoginForm}>
                Ingresar
              </Button>
              <Button bg="primary" onClick={handleShowRegisterForm}>
                Registrarse
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      <Flex
        direction="row"
        display={{ base: "flex", md: "none" }}
        justify="space-between"
        align="center"
        position="relative"
      >
        <Flex gap="4" justify="flex-start">
          <Link href="/">
            <Image
              src={logo}
              alt="logo cDavinci"
              maxHeight={"40px"}
              marginInline={"30px"}
            />
          </Link>
        </Flex>

        <IconButton
          aria-label="Abrir menú"
          onClick={handleToggle}
          bg="secondary"
          justify="flex-end"
          position="absolute"
          right="10px"
        >
          <IoMenu fontSize="5xl" />
        </IconButton>
      </Flex>

      {isOpen && (
        <Flex direction="column" gap="2" align="center">
          <Link p="2" href="/artisans">
            Artesanos
          </Link>
          <Link p="2" href="/aboutUs">
            Sobre Nosotros
          </Link>
          <Link p="2" href="#" onClick={handleShowContactForm}>
            Contáctanos
          </Link>
          {userType === "common" && (
            <>
              <Link href="/cart">Carrito</Link>
              <Link href="/favorites">Mis favoritos</Link>
              <Link href="/profile">Perfil</Link>
            </>
          )}
          {userType === "artisan" && (
            <>
              <Link href="">Mis ventas</Link>
              <Link href="/profile">Perfil</Link>
            </>
          )}
          {userType ? (
            <Button bg="secondary" onClick={logout}>
              Cerrar Sesión
            </Button>
          ) : (
            <>
              <Button bg="secondary" onClick={handleShowLoginForm}>
                Ingresar
              </Button>
              <Button bg="primary" onClick={handleShowRegisterForm}>
                Registrarse
              </Button>
            </>
          )}
        </Flex>
      )}

      {showContactForm && <ContactForm onClose={handleCloseContactForm} />}
      {showLoginForm && <LoginForm onClose={handleCloseLoginForm} />}
      {showRegisterForm && <RegisterForm onClose={handleCloseRegisterForm} />}
    </Box>
  );
}

export default NavBar;
