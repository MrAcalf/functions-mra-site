import {db} from '../util/admin'
import {Post} from '../dataTypes/postsTypes'

const getAllPosts = (_req: string, _res: any) => {
    db
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let posts: Post[] = []
            data.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    tags: doc.data().tags,
                    category: doc.data().tags
                })
            })
            return _res.json(posts)
        })
        .catch(err => console.error(err))
}

export {getAllPosts}