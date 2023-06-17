/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../config";
import requests from "../../libs/request";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const center = { lat: 48.8584, lng: 2.2945 };

function Map() {
  const isServiceProvider = useSelector(
    (state) => state.auth.isServiceProvider
  );
  const { id } = useParams();
  const { data: userData } = useQuery({
    queryKey: ["user", id], // Include the component's specific identifier
    queryFn: () =>
      Axios.get(`${requests.users}/${id}`).then((res) => {
        return res.data.user;
      }),
    enabled: !!id,
  });
  const user = useSelector((state) => state.auth);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  // function clearRoute() {
  //   setDirectionsResponse(null);
  //   setDistance("");
  //   setDuration("");
  //   originRef.current.value = "";
  //   destiantionRef.current.value = "";
  // }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="75vh"
      w="100vw"
      marginTop={`${isServiceProvider ? 5 : 100}`}
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Origin"
                value={user?.address || ""}
                ref={originRef}
                disabled
              />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                value={userData?.address || ""}
                ref={destiantionRef}
                disabled
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Map;
