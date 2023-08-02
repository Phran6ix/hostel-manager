import Config from "../utilities/config";

const client = require("twilio")(Config.TWILIO_SSID, Config.TWILIO_TOKEN);

class SMSService {
  private body: string;
  private to: string;
  constructor(payload: { body: string; to: string }) {
    this.body = payload.body;
    this.to = payload.to;
  }

  async sendMessage(): Promise<void> {
    try {
      let data = await client.messages.create({
        body: this.body,
        from: "2347033167594",
        to: this.to,
      });
      console.log("SMS SENT SUCCESSFULLY");
      console.log(data.sid);
      return;
    } catch (error) {
      throw error;
    }
  }
}

export default SMSService;
