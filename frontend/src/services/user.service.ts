import http from '../common/http-common'

export class UserService {
  static create (data: string): Promise<string> {
    return http.post('/users', data)
  }
}
