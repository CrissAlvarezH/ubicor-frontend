import { NextApiRequest, NextApiResponse } from "next";
import { BuildingsService } from "api_clients";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.secret || req.query.secret != process.env.REVALIDATE_PAGE_SECRET) 
        return res.status(401).json({error: "Invalid token"})
    
    req.headers.authorization

    if (!req.query.university)
        return res.status(400).json({error: "'university' is required"})
    if (!req.query.buildings)
        return res.status(400).json({error: "'buildings' is required"})

    const university = req.query.university.toString()

    let buildings = []
    if (req.query.buildings == "__all__") {
        // fetch all building of thi university
        const buildingResponse = await BuildingsService.buildingsList(university)
        buildings = buildingResponse.map(b => b.code)
    } else {
        buildings = (
            req.query.buildings.includes(",") 
            ? req.query.buildings.toString().split(",") 
            : [req.query.buildings.toString()]
        )
    }

    try {
        // revalidate university index page
        res.unstable_revalidate(`/${university}/map`)
        res.unstable_revalidate(`/${university}/buildings`)

        for (const building of buildings) {
            res.unstable_revalidate(`/${university}/buildings/${building}`)
        }

        return res.json({finish: true})
    } catch (error) {
        console.log("ERROR", error)
        return res.status(500).send(error)
    }
}