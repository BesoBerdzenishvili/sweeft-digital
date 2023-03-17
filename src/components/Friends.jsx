import { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import UserCard from "./UserCard";
import Loading from "./Loading";

const FriendsContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const Title = styled("p", {
  fontWeight: "bold",
  fontSize: "26px",
  marginTop: "19px",
});

export default function Friends({ id, page }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/20`
    )
      .then((res) => res.json())
      .then((friends) => {
        setFriends((prevFriends) => [...prevFriends, ...friends.list]);
        setLoading(false);
      });
  }, [page]);

  return (
    <>
      <Title>Friends:</Title>
      <FriendsContainer>
        {friends.map((friend) => (
          <UserCard
            key={friend.id}
            id={friend.id}
            imageUrl={`${friend.imageUrl}/${friend.id}`}
            name={friend.name}
            lastName={friend.lastName}
            prefix={friend.prefix}
            title={friend.title}
          />
        ))}
      </FriendsContainer>
      {loading && <Loading />}
    </>
  );
}