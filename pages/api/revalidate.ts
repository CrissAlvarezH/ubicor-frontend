import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if (!req.query.secret || req.query.secret != process.env.REVALIDATE_PAGE_SECRET) 
    //     return res.status(401).json({error: "Invalid token"})

    if (!req.query.path)
        return res.status(400).json({error: "'path' is required"})
    if (!req.query.universities)
        return res.status(400).json({error: "'universities' is required"})
    if (!req.query.buildings)
        return res.status(400).json({error: "'buildings' is required"})
    if (req.query.universities.includes(",") && req.query.buildings != "__all__")
        return res.status(400).json({error: "for several universities, buildings must be '__all__'"})

    const universities = (req.query.universities.includes(",") 
                          ? req.query.universities.toString().split(",") 
                          : [req.query.universities.toString()])

    try {
        for (const university of universities) {
            let buildings: Array<string> = []
            if (req.query.buildings == "__all__") {
                // TODO fetch university buildings
                buildings = []
            } else {
                buildings = (req.query.buildings.includes(",") 
                     ? req.query.buildings.toString().split(",") 
                     : [req.query.buildings.toString()])
            }

            for (const building of buildings) {
                // TODO revalidate buildings routes
            }
        }
        await res.unstable_revalidate(req.query.path.toString())
        return res.json({finish: true})
    } catch (error) {
        console.log("ERROR", error)
        return res.status(500).send(error)
    }
}