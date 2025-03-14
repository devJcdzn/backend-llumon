import Queue from "bull";

export interface EmailQueueDTO {
  from: string;
  to: string[];
  subject: string;
  type: "validate" | "payment-success" | "payment-failed";
}

export class QueueJobs {
  constructor(private readonly redisUrl: string) {}

  private generateOTP() {
    let digits = "0123456789";
    let OTP = "";
    let len = digits.length;
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  emailQueue(rawData: EmailQueueDTO) {
    switch (rawData.type) {
      case "validate":
        const data = {
          from: rawData.from,
          subject: rawData.subject,
          to: rawData.to,
          otp: this.generateOTP(),
        };

        Queue("validate-email", this.redisUrl).add(data);
      case "payment-success":
        Queue("success-email", this.redisUrl).add(rawData);
      case "payment-failed":
        Queue("fail-email", this.redisUrl).add(rawData);
    }
  }
}
