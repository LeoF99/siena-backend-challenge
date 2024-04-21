class Conversations {
  id?: string;

  message: string;

  response: string;

  senderUsername: string;

  recieverUsername: string;

  constructor(args: {
    id?: string;
    message: string;
    response: string;
    senderUsername: string;
    recieverUsername: string;
  }) {
    this.id = args.id;
    this.message = args.message;
    this.response = args.response;
    this.senderUsername = args.senderUsername;
    this.recieverUsername = args.recieverUsername;
  }
}

export default Conversations;
