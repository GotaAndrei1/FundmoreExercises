import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { POST_REPOSITORY } from '../../core/constants';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
    constructor(@Inject(POST_REPOSITORY) private readonly postRepository: typeof Post) {}

    async create(post: PostDto, userId: number): Promise<Post> {
        return await this.postRepository.create<Post>({ ...post, userId });
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.findAll<Post>({ include: [{ model: User }] });
    }

    async findOne(id: number): Promise<Post> {
        return await this.postRepository.findOne<Post>({ where: { id }, include: [{ model: User }] });
    }

    async delete(id: number, userId: number): Promise<void> {
        const post = await this.postRepository.findOne<Post>({ where: { id, userId } });
        if (post) {
            await post.destroy();
        } else {
            throw new Error('Post not found or user not authorized');
        }
    }

    async update(id: number, data: Partial<PostDto>, userId: number): Promise<Post> {
        const post = await this.postRepository.findOne<Post>({ where: { id, userId } });
        if (post) {
            return await post.update(data);
        } else {
            throw new Error('Post not found or user not authorized');
        }
    }
}
