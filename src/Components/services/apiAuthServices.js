import axios from "axios";
import { toast } from "react-toastify";

class apiAuthServices {
  BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
  Web_Api_Key = "AIzaSyDAoF1hXU6-lwDk3iIcV1unQ8LbeDohW-c";
  static getInstance() {
    return new apiAuthServices();
  }
  signUp = async (credential) => {
    // console.log(3, credential);
    try {
      const response = await axios.post(
        this.BASE_URL + "signUp?key=" + this.Web_Api_Key,
        {
          email: credential.email,
          password: credential.password,
          returnSecureToken: true,
        }
      );
      toast.success("Sign up Success.Please Visit Log in page To Continue.");
      // console.log(4, response);
      return response.data;
    } catch (error) {
      let err = "Sign up Failed";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
  signIn = async (credential) => {
    // console.log(3, credential);
    try {
      const response = await axios.post(
        this.BASE_URL + "signInWithPassword?key=" + this.Web_Api_Key,
        {
          email: credential.email,
          password: credential.password,
          returnSecureToken: true,
        }
      );
      toast.success("Log in Success");
      // console.log(4, response);
      return response.data;
    } catch (error) {
      let err = "Log in Failed";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
  forgotPassword = async (credential) => {
    // console.log(3, credential);
    try {
      const response = await axios.post(
        this.BASE_URL + "sendOobCode?key=" + this.Web_Api_Key,
        {
          email: credential.email,
          requestType: "PASSWORD_RESET",
        }
      );
      toast.success("Password changes link send successfully");
      // console.log(4, response);
      return response.data;
    } catch (error) {
      let err = "link doesn't send";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
  getUserData = async () => {
    const idToken = localStorage.getItem("idToken");
    console.log(idToken);
    try {
      const response = await axios.post(
        this.BASE_URL + "lookup?key=" + this.Web_Api_Key,
        {
          idToken: idToken,
        }
      );
      // toast.success("Data receives successfully");
      console.log(4, response);
      return response.data.users[0];
    } catch (error) {
      let err = "Data doesn't receives";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };

  updateUserData = async (credential) => {
    // console.log(credential);
    const idToken = localStorage.getItem("idToken");

    try {
      const response = await axios.post(
        this.BASE_URL + "update?key=" + this.Web_Api_Key,
        {
          idToken: idToken,
          displayName: credential.name,
          photoUrl: credential.url,
          returnSecureToken: true,
        }
      );
      toast.success("User profile Updated successfully");
      // console.log(4, response);
      return response.data;
    } catch (error) {
      let err = "Profile doesn't change";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
}
export default apiAuthServices = apiAuthServices.getInstance();
