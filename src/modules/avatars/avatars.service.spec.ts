import { Test } from '@nestjs/testing';
import { AvatarsRepository } from './avatars.repository';
import { AvatarsService } from './avatars.service';
import {
  MongoTestModule,
  closeInMongodConnection,
} from '../mongo/mongo-test.module';
import { MongoClient } from 'mongodb';
import { MONGO_CLIENT } from '../mongo/mongo.contants';
import { avatar1 } from './avatars.mock';

describe('AvatarsService', () => {
  let mongoClient: MongoClient;
  let avatarsService: AvatarsService;
  let avatarsRepository: AvatarsRepository;

  beforeAll(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      imports: [MongoTestModule.forTest()],
      providers: [AvatarsService, AvatarsRepository],
    }).compile();

    mongoClient = moduleRef.get<MongoClient>(MONGO_CLIENT);
    avatarsRepository = moduleRef.get<AvatarsRepository>(AvatarsRepository);
    avatarsService = new AvatarsService(avatarsRepository);
  });

  afterEach(async () => {
    await mongoClient.db().collection('avatars').deleteMany({});
  });

  afterAll(async () => {
    await closeInMongodConnection(mongoClient);
  });

  it('Create an avatar of user 1', async () => {
    const res = await avatarsService.createAvatar(avatar1);
    const avatars = await mongoClient
      .db()
      .collection('avatars')
      .find()
      .toArray();

    expect(avatars).toHaveProperty('userId', res.userId);
    expect(avatars).toHaveProperty('path', res.path);
  });

  it('Get an avatar of user 1', async () => {
    const res = await avatarsService.createAvatar(avatar1);
    const avatar = await avatarsService.getAvatarByUserId(avatar1.userId);

    expect(avatar).toHaveProperty('userId', res.userId);
    expect(avatar).toHaveProperty('path', res.path);
  });
});
