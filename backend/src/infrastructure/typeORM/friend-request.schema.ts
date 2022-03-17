import { FriendRequestEntity } from 'src/core/friendRequest.entity';
import { EntitySchema } from 'typeorm';

export const FriendRequestSchema = new EntitySchema<FriendRequestEntity>({
  name: 'FriendRequest',
  target: FriendRequestEntity,
  columns: {
    uuid: {
      type: 'uuid',
      generated: 'uuid',
      primary: true,
    },
    creator: {
      type: 'varchar',
    },
    receiver: {
      type: 'varchar',
    },
  },
  relations: {

  },
});
