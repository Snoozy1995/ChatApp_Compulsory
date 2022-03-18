import { Friend } from 'src/core/friend.entity';
import { EntitySchema } from 'typeorm';

export const FriendSchema = new EntitySchema<Friend>({
  name: 'Friend',
  target: Friend,
  columns: {
    uuid: {
      type: 'uuid',
      generated: 'uuid',
      primary: true,
    },
    status: {
      type: 'int'
    },
  },
  relations: {
    creator: {
      type: "many-to-one",
      target: "User",
    },
    receiver: {
      type: "many-to-one",
      target: "User",
    }
  },
});
