import { db } from '../util/admin'
import { PartnerAds } from '../dataTypes/partnerAdsTypes'
import { validateReqUrl } from '../util/validators'
const config = require('../../firebasecongif.json')

const createPartnerAds = (_req: any, _res: any) => {
    const noImg: string = 'onlineAd.svg'
    const validUrl: string = validateReqUrl(_req.body.url) 

    const newAd: PartnerAds =  {
        title: _req.body.title,
        image: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        url: validUrl,
        tags: _req.body.tags,
        category: _req.body.category
    }   

    db
    .collection('ads')
    .add(newAd)
    .then((doc) => {
        const resAd:any = newAd
        resAd.id = doc.id
        _res.json(resAd)
    })
    .catch((err) => {
        console.error(err)
        return _res.status(500).json({ general: 'Something went wrong, please try again.' })
    })
}

export {createPartnerAds}