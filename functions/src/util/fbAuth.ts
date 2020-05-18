import {db, admin} from '../util/admin'
module.exports = (_req: any, _res: any, _next: any) => {
    let idToken
    if (
        _req.headers.authorization &&
        _req.headers.authorization.startsWith('Bearer ')
    ) {
        idToken = _req.headers.authorization.split('Bearer ')[1]
    } else {
        console.error('No token found')
        return _res.status(403).json({ error: 'Unauthorized' })
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            _req.user = decodedToken
            return db
                .collection('users')
                .where('userId', '==', _req.user.uid)
                .limit(1)
                .get()
        })
        .then((data) => {
            _req.user.handle = data.docs[0].data().handle
            _req.user.imageUrl = data.docs[0].data().imageUrl
            return _next()
        })
        .catch((err) => {
            console.error('Error while verifying token ', err)
            return _res.status(403).json(err)
        })
}