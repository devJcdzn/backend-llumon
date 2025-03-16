import Queue from "bull";

export interface EmailQueueDTO {
  from: string;
  to: string[];
  subject: string;
}

interface ValidateEmailDTO extends EmailQueueDTO {
  otpCode: string;
}

export class QueueJobs {
  constructor(private readonly redisUrl: string) {}

  emailValidate(rawData: ValidateEmailDTO) {
    const data = {
      from: rawData.from,
      subject: rawData.subject,
      to: rawData.to,
      otp: rawData.otpCode,
    };

    Queue("validate-email", this.redisUrl).add(data);
  }
}
