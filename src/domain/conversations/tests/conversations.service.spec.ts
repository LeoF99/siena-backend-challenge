import ConversationsService from '../conversations.service';
import ConversationsRepository from '../../../infrastructure/repositories/conversations.repository';
import Conversations from '../entities/conversations';

describe('ConversationsService', () => {
  let conversationsService: ConversationsService;
  let conversationsRepository: ConversationsRepository;

  beforeEach(() => {
    conversationsRepository = {
      save: jest.fn(),
      find: jest.fn(),
      getById: jest.fn(),
    } as any;

    conversationsService = new ConversationsService(conversationsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const conversations: Conversations[] = [
    {
      message: 'how are you doing?',
      response: 'Hey @bogoman, We are here to assist you with any questions or assistance you may need.',
      senderUsername: '@bogoman',
      recieverUsername: '@helloworld',
    },
    {
      message: 'do you ship internationally?',
      response: 'Hey @ashdev, we offer international shipping in 50 countries.',
      senderUsername: '@ashdev',
      recieverUsername: '@meowcat',
    },
  ];

  describe('save', () => {
    it('should save conversations and return the saved conversations', async () => {
      const savedConversations: Conversations[] = [
        { ...conversations[0], id: 'c31792f7-ddf8-48c0-b3d0-6d23737277a3' },
        { ...conversations[1], id: '45bb8b42-1b05-49f2-aee4-fd7177d78267' },
      ];

      jest.spyOn(conversationsRepository, 'save').mockResolvedValue(savedConversations);

      const result = await conversationsService.save(conversations);

      expect(conversationsRepository.save).toHaveBeenCalledWith(conversations);
      expect(result).toEqual(savedConversations);
    });

    it('should throw an error if saving conversations fails', async () => {
      const errorMessage = 'Failed to save conversations';

      jest.spyOn(conversationsRepository, 'save').mockRejectedValue(new Error(errorMessage));

      await expect(conversationsService.save(conversations)).rejects.toThrow(errorMessage);
    });
  });

  describe('find', () => {
    it('should call conversationsRepository.find with correct arguments', async () => {
      const args = { skip: 0, limit: 10 };
      await conversationsService.find(args);
      expect(conversationsRepository.find).toHaveBeenCalledWith(args.skip, args.limit);
    });

    it('should return the result of conversationsRepository.find', async () => {
      const args = { skip: 0, limit: 10 };
      const expectedResult = [{ id: 'c31792f7-ddf8-48c0-b3d0-6d23737277a3', ...conversations[0] }];

      jest.spyOn(conversationsRepository, 'find').mockResolvedValue(expectedResult);
      const result = await conversationsService.find(args);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if conversationsRepository.find throws an error', async () => {
      const args = { skip: 0, limit: 10 };
      const errorMessage = 'Failed to find conversations';
      jest.spyOn(conversationsRepository, 'find').mockRejectedValue(new Error(errorMessage));
      await expect(conversationsService.find(args)).rejects.toThrow(errorMessage);
    });
  });
});
