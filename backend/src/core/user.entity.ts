import { OneToMany } from "typeorm";
import { FriendRequestEntity } from "./friendRequest.entity";

export class User {
  uuid: string;
  name: string;
  email: string;
  password: string;
  friends:User[];

  @OneToMany(
    () => FriendRequestEntity,
    (friendRequestEntity) => friendRequestEntity.creator,
  )
  sentFriendRequests: FriendRequestEntity[];

  @OneToMany(
    () => FriendRequestEntity,
    (friendRequestEntity) => friendRequestEntity.receiver,
  )
  receivedFriendRequests: FriendRequestEntity[];
}
