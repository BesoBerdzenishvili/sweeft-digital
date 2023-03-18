import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { styled } from "../stitches.config";
import Friends from "../components/Friends";

const UserContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  backgroundColor: "#fff",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
  borderRadius: "8px",
  padding: "16px",
  boxSizing: "border-box",

  overflow: "auto",
  height: "100vh",
});

const UserInfo = styled("div", {
  display: "flex",
});

const UserImage = styled("img", {
  width: "100%",
  maxWidth: "270px",
});

const FieldSet = styled("fieldset", {
  padding: "10px",
  margin: "0 10px 0 20px",
  "& > legend": {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "8px",
  },
});

const InfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const InfoItem = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
});

const InfoLabel = styled("div", {
  fontWeight: "bold",
  minWidth: "120px",
});

const AddressContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const AddressItem = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
});

const AddressLabel = styled("div", {
  fontWeight: "bold",
  minWidth: "120px",
});

export default function User() {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const isApproximatelyEqual = (a, b) => Math.abs(a - b) < 0.5;
    if (isApproximatelyEqual(scrollHeight - scrollTop, clientHeight)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const { id } = useParams();
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView();
    }
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    )
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!userData) {
    return null;
  }

  const {
    imageUrl,
    name,
    lastName,
    prefix,
    title,
    jobDescriptor,
    jobArea,
    jobType,
    email,
    ip,
    company,
    address,
  } = userData;

  return (
    <UserContainer onScroll={handleScroll}>
      <UserInfo ref={topRef}>
        <UserImage src={`${imageUrl}/${id}`} alt={`${name} ${lastName}`} />
        <FieldSet>
          <legend>Info</legend>
          <InfoContainer>
            <InfoItem>
              <InfoLabel>Name:</InfoLabel>
              <div>{`${prefix} ${name} ${lastName}`}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Title:</InfoLabel>
              <div>{title}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Job:</InfoLabel>
              <div>{`${jobDescriptor} ${jobArea} ${jobType}`}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email:</InfoLabel>
              <div>{email}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>IP:</InfoLabel>
              <div>{ip}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Company:</InfoLabel>
              <div>{`${company.name} ${company.suffix}`}</div>
            </InfoItem>
          </InfoContainer>
        </FieldSet>
        <FieldSet>
          <legend>Address</legend>
          <AddressContainer>
            <AddressItem>
              <AddressLabel>Zip code:</AddressLabel>
              <div>{address.zipCode}</div>
            </AddressItem>
            <AddressItem>
              <AddressLabel>City:</AddressLabel>
              <div>{address.city}</div>
            </AddressItem>
            <AddressItem>
              <AddressLabel>Street address:</AddressLabel>
              <div>{address.streetAddress}</div>
            </AddressItem>
            <AddressItem>
              <AddressLabel>Country:</AddressLabel>
              <div>{address.country}</div>
            </AddressItem>
            <AddressItem>
              <AddressLabel>State:</AddressLabel>
              <div>{address.state}</div>
            </AddressItem>
          </AddressContainer>
        </FieldSet>
      </UserInfo>
      <Friends id={id} page={page} />
    </UserContainer>
  );
}
