import React, { useContext, useEffect, useState } from "react";
import FriendRequestsCard from "../Components/FriendRequestsCard";
import { SocketContext, UserContext } from "../Context";
import secureLocalStorage from "react-secure-storage";
import FriendCard from "../Components/FriendCard";
const Friends = () => {
  const user = secureLocalStorage.getItem("user");
  const { socket } = useContext(SocketContext);
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [friendsList, setFriendsList] = useState();
  const [isLoading, setLoading] = useState(true);

  const FetchFriends = () => {
    try {
      fetch(`${ApiUrl}/getfriendslist/${user}`)
        .then((responce) => responce.json())
        .then((json) => {
          if (json.error) {
            alert(`Error : ${json.error}`);
          } else {
            setFriendsList(json.data);
          }
        });
    } catch (error) {
      console.error("Error fetching friends!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchFriends();
  }, []);

  return (
    <div className="h-full w-screen bg-themeDark ">
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="loader w-20"></div>
        </div>
      ) : (
        <>
          {/* friend requests */}
          <FriendRequestsCard />
          {/* all friends */}
          <div className="px-5">
            {friendsList?.map((frnd) => (
              <FriendCard key={frnd.friend_id} user={frnd.friend_id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Friends;
