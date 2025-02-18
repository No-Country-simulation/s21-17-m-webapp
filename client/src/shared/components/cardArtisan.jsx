import React from "react";
import { Button, Card, HStack, Stack, Strong, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"

function CardArtisan({ name, aboutMe, imageUrl, locality, especiality}) {

    return(
        <Card.Root width="320px" bg="neutral.200">
        <Card.Body>
          <HStack mb="6" gap="3">
            <Avatar src={imageUrl} name={name}/>
            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {name}
              </Text>
              <Text color="primary" textStyle="sm">
                {locality}
              </Text>
            </Stack>
          </HStack>
          <Card.Description>
            <Strong color="fg">{especiality}</Strong>
            {aboutMe}
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button bg="neutral" flex="1"></Button>
        </Card.Footer>
      </Card.Root>
    );
}

export default CardArtisan;