import { useState, useEffect } from "react";
import { styled } from "../stitches.config";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";

const UsersContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  padding: "20px",
  overflow: "auto",
  height: "100vh",
});

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`
    )
      .then((res) => res.json())
      .then((users) => {
        setUsers((prevUsers) => {
          if (
            users.list.length > 0 &&
            !prevUsers.some((existingUser) =>
              users.list.some((newUser) => newUser.id === existingUser.id)
            )
          ) {
            return [...prevUsers, ...users.list];
          } else {
            return prevUsers;
          }
        });
        setLoading(false);
      });
  }, [page]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const isApproximatelyEqual = (a, b) => Math.abs(a - b) < 0.5;
    if (isApproximatelyEqual(scrollHeight - scrollTop, clientHeight)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <UsersContainer onScroll={handleScroll}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            imageUrl={`${user.imageUrl}/${user.id}`}
            name={user.name}
            lastName={user.lastName}
            prefix={user.prefix}
            title={user.title}
          />
        ))}
      </UsersContainer>
      {loading && <Loading />}
    </>
  );
}
