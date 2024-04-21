class Intents {
  id?: string;

  intent: string;

  response: string;

  channel: string;

  constructor(args: {
    id?: string;
    intent: string;
    response: string;
    channel: string;
  }) {
    this.id = args.id;
    this.intent = args.intent;
    this.response = args.response;
    this.channel = args.channel;
  }
}

export default Intents;
