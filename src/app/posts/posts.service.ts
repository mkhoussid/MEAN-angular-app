import { Post } from './post.model';

export class PostService {
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts]; // returns a COPY of the array; immutability
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
  }
}
