import { Link } from "react-router-dom";
import { styled } from "../stitches.config";

const UserCardContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "270px",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "#fff",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
  margin: "0 20px 16px 0",
  border: "1px solid lightgrey",
  cursor: "pointer",

  "& a": {
    textDecoration: "none",
    "&:visited, &:link": {
      color: "black",
    },
  },
});

const UserImage = styled("img", {
  width: "100%",
  marginBottom: "16px",
});

const UserInfo = styled("div", {
  textAlign: "center",
});

const UserName = styled("p", {
  fontWeight: "bold",
  fontSize: "16px",
  margin: "0",
});

const UserTitle = styled("p", {
  fontSize: "14px",
  margin: "8px 0 0 0",
});

export default function UserCard({
  id,
  imageUrl,
  prefix,
  name,
  lastName,
  title,
}) {
  return (
    <UserCardContainer>
      <Link to={`/user/${id}`}>
        <UserImage src={imageUrl} alt={`${name} ${lastName}`} />
        <UserInfo>
          <UserName>{`${prefix} ${name} ${lastName}`}</UserName>
          <UserTitle>{title}</UserTitle>
        </UserInfo>
      </Link>
    </UserCardContainer>
  );
}
