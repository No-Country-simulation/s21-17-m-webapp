import React from "react";
import{ Box, Image, Text } from "@chakra-ui/react";
import cdavinci from "../../../assets/cdavinci.jpg";

function InfoPolicy () {
    return(
        <Box color="accent"  textAlign="center" display="flex" flexDir={"column"} justifyContent={"center"} alignItems={"center"} marginInline={"100px"} >
            <Text fontSize="5xl"> Políticas de la Empresa</Text>
            <Image src={cdavinci} alt="logo cDavinci" maxWidth={"400px"}/>
            <Box maxWidth="800px">
                <Text color="secondary" fontSize="3xl" margin={"30px"}>Política de Devoluciones:</Text>
                <Text fontSize="xl">
                    <ul>
                        <li>
                            <Text color="secondary">Plazo para devoluciones: </Text>
                            <Text>Los productos pueden ser devueltos dentro de [X] días desde la fecha de compra.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Condiciones de la devolución:</Text>
                            <Text>El producto debe estar en su estado original, sin usar, con todos los empaques y etiquetas intactos.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Proceso de devolución:</Text>
                            <Text>Para realizar una devolución, por favor contacte a nuestro equipo de atención al cliente a través del correo electrónico email@example.com.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Reembolsos:</Text>
                            <Text>Los reembolsos se procesarán a través del mismo método de pago en el que se realizó la compra.</Text>
                            <Text>El tiempo para recibir el reembolso puede variar según el banco o entidad financiera.</Text>
                        </li>    
                    </ul>
                </Text>
            </Box>
            <Box maxWidth="800px">
                <Text color="secondary" fontSize="3xl" margin={"30px"}>Política de Permanencia en la Comunidad:</Text>
                <Text fontSize="xl">
                    <ul>
                        <li>
                            <Text color="secondary">Respeto y comportamiento:</Text>
                            <Text>Esperamos que todos los miembros de nuestra comunidad se comporten de manera respetuosa y cordial. Cualquier conducta que implique acoso, discriminación o violación de los derechos de otros usuarios será sancionada.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Contenido permitido:</Text>
                            <Text>Solo se permite contenido que sea adecuado para todas las edades y que cumpla con las normativas de propiedad intelectual. No se permite compartir contenido ofensivo, ilegal o de odio.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Suspensión o cancelación de cuenta:</Text>
                            <Text>La empresa se reserva el derecho de suspender o cancelar la cuenta de cualquier usuario que viole las normas de convivencia o realice actividades fraudulentas.</Text>
                        </li>
                    </ul>
                </Text>
            </Box>
            <Box maxWidth="800px">
                <Text color="secondary" fontSize="3xl" margin={"30px"}>Política de Privacidad: </Text>
                <Text fontSize="xl">
                    <ul>
                        <li>
                            <Text color="secondary">Recopilación de datos:</Text>
                            <Text>Recopilamos información personal, como nombre, dirección de correo electrónico y detalles de pago, solo para procesar compras y mejorar la experiencia del usuario en nuestra página web.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Uso de los datos:</Text>
                            <Text>No compartimos tus datos con terceros sin tu consentimiento explícito, salvo en circunstancias en las que sea necesario para cumplir con nuestras obligaciones legales o contractuales.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Seguridad de los datos:</Text>
                            <Text>Usamos medidas de seguridad avanzadas para proteger tus datos personales de accesos no autorizados.                            </Text>
                        </li>
                    </ul>
                </Text>
            </Box>
            <Box maxWidth="800px">
                <Text color="secondary" fontSize="3xl" margin={"30px"}>Términos y Condiciones de Uso:</Text>
                <Text fontSize="xl">
                    <ul>
                        <li>
                            <Text color="secondary">Acceso al sitio web:</Text>
                            <Text>Al acceder a nuestro sitio web, aceptas cumplir con los términos y condiciones de uso establecidos. Si no estás de acuerdo con estos términos, no utilices nuestros servicios.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Modificaciones:</Text>
                            <Text>Nos reservamos el derecho de modificar nuestros términos y condiciones en cualquier momento, y cualquier cambio será notificado oportunamente a nuestros usuarios.</Text>
                        </li>
                        <li>
                            <Text color="secondary">Propiedad intelectual:</Text>
                            <Text>Todos los contenidos en este sitio, incluyendo textos, imágenes, logos y videos, están protegidos por derechos de autor y no pueden ser utilizados sin el permiso correspondiente.                            </Text>
                        </li>
                    </ul>
                </Text>
            </Box>

        </Box>
    );
}
export default InfoPolicy;

