import { useLocationLocalStorage } from "./LocationLocalStorage";
import { useNotification } from "./useNotification";

const useReviews = () => {
  const { NotificationHandler } = useNotification();
  const { fetchPersonalDetails } = useLocationLocalStorage();
  const Reviews = async (data) => {
    try {
      const { id } = fetchPersonalDetails();
      const userid = id;
      const response = await fetch(
        `http://localhost:8080/user/reviews/${userid}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responsedata = await response.json();
      NotificationHandler(responsedata.message, responsedata.type);
      return responsedata.type;
    } catch (err) {
      console.log(err);
      NotificationHandler("Check your connection!", "Error");
      return "false";
    }
  };
  return { Reviews };
};

export default useReviews;
