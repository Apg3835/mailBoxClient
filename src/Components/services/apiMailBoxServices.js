import axios from "axios";
import { toast } from "react-toastify";
class apiMailBoxServices {
  BASE_URL = "https://mailboxclient-1358a-default-rtdb.firebaseio.com/";
  static getInstance() {
    return new apiMailBoxServices();
  }
  sendEmailSender = async (composeEmailData) => {
    console.log(3, composeEmailData);
    const sentEmailId = composeEmailData.senderEmailId
      .replace(/\./g, "")
      .split("@")[0];
    console.log(sentEmailId);
    await axios.post(this.BASE_URL + sentEmailId + "/outbox.json", {
      senderEmail: composeEmailData.senderEmailId,
      recipientEmail: composeEmailData.recipientEmail,
      subject: composeEmailData.subject,
      content: composeEmailData.content,
      date: composeEmailData.date,
      //   mailReadStatus: false,
    });
  };
  sendEmailReceiver = async (composeEmailData) => {
    console.log(3, composeEmailData);
    const receiverEmailId = composeEmailData.recipientEmail
      .replace(/\./g, "")
      .split("@")[0];
    console.log(receiverEmailId);
    await axios.post(this.BASE_URL + receiverEmailId + "/inbox.json", {
      senderEmail: composeEmailData.senderEmailId,
      recipientEmail: composeEmailData.recipientEmail,
      subject: composeEmailData.subject,
      content: composeEmailData.content,
      mailReadStatus: false,
      date: composeEmailData.date,
    });
  };
  getEmailData = async (senderEmail) => {
    console.log(3, senderEmail);
    const senderEmailId = senderEmail.replace(/\./g, "").split("@")[0];
    console.log(senderEmailId);
    try {
      const response = await axios.get(
        this.BASE_URL + senderEmailId + "/.json"
      );
      // toast.success("data received");
      console.log(4, response);
      return response.data;
    } catch (error) {
      let err = "data receiving failed";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
  mailRead = async (data) => {
    const email = data.email.replace(/\./g, "").split("@")[0];
    const key = data.key;
    await axios.patch(
      `https://mailboxclient-1358a-default-rtdb.firebaseio.com/${email}/inbox/${key}.json`,
      {
        mailReadStatus: true,
      }
    );
  };
  deleteInboxEmailId = async (data) => {
    console.log(3, data);
    const recipientEmailId = data.email.replace(/\./g, "").split("@")[0];
    const key = data.key;
    console.log(recipientEmailId);
    try {
      const response = await axios.delete(
        this.BASE_URL + recipientEmailId + "/inbox/" + key + ".json"
      );
      toast.dark("email deleted successfully");
      console.log(4, response);
      return response.data;
    } catch (error) {
      let err = "email not deleted";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
  deleteOutboxEmailId = async (data) => {
    const recipientEmailId = data.email.replace(/\./g, "").split("@")[0];
    const key = data.key;
    try {
      const response = await axios.delete(
        this.BASE_URL + recipientEmailId + "/outbox/" + key + ".json"
      );
      toast.dark("email deleted successfully");
      console.log(4, response);
      return response.data;
    } catch (error) {
      let err = "email not deleted";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
}
export default apiMailBoxServices = apiMailBoxServices.getInstance();
